const passport = require('passport')
const bcrypt = require('bcrypt')
const squel = require('squel')
const sequelize = require('./sequelize')
const LocalStrategy = require('passport-local').Strategy
const { ModelManager } = require('../models')
const models = new ModelManager()

class GetStaffInfo {
  constructor(staff) {
    this.id = staff.id
    this.first_name = staff.first_name
    this.last_name = staff.last_name
    this.role = staff.role
  }
}

class GetGuestInfo {
  constructor(guest) {
    this.id = guest.id
    this.room_id = guest.room_id
    this.first_name = guest.first_name
    this.last_name = guest.last_name
    this.room_number = guest.room_number
  }
}

const comparePassword = async (inputPassword, userPassword) => {
  const result = await bcrypt.compare(inputPassword, userPassword)
  return result
}

passport.serializeUser((user, done) => {
  if (user.staff) {
    // serialize staff user staff is authenticated
    return done(null, { staff: user.staff })
  }
  // serialize guest user guest is authenticated
  done(null, { guest: user.guest })
})

passport.deserializeUser(async (user, done) => {
  // deserialize staff user staff is authenticated
  if (user.staff) {
    const staff = await models.Staff.findByPk(user.staff.id)
    if (!staff) {
      return Promise.reject('Staff does not exist')
    }
    return done(null, { staff: staff }) 
  }

  // deserialize guest user guest is authenticated
  const query = squel
    .select()
    .field('g.id')
    .field('ro.id', 'room_id')
    .field('g.first_name')
    .field('g.last_name')
    .field('ro.room_number')
    .from('guests', 'g')
    .join('reservations', 're', 're.guest_id = g.id')
    .join('rooms', 'ro', 'ro.id = re.room_id')
    .where('g.id = ?', user.guest.id)
    .toString()

  const instances = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
  const guest = instances[0]
  if (!guest) {
    return Promise.reject('Guest does not exist')
  }
  done(null, { guest: guest })
})

// passport strategy for staff members
passport.use(
  'staff-local',
  new LocalStrategy(
    async (username, password, done) => {
      const query = squel
        .select()
        .from('staff')
        .where(`username = '${username}'`)
        .toString()

      const instances = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
      let staff = instances[0]
      if (!staff) return done(null, false)
      const isMatchedPassword = await comparePassword(password, staff.password)
      if (isMatchedPassword) {
        staff = new GetStaffInfo(staff)
        return done(null, { staff })
      }
      return done(null, false)
    }
))

// passport strategy for guests
passport.use(
  'guest-local',
  new LocalStrategy(
    {
      usernameField: 'room_number',
      passwordField: 'passport_number'
    },
    async (room_number, passport_number, done) => {
      const query = squel
        .select()
        .field('g.id')
        .field('ro.id', 'room_id')
        .field('g.first_name')
        .field('g.last_name')
        .field('g.passport_number')
        .field('ro.room_number')
        .from('guests', 'g')
        .join('reservations', 're', 're.guest_id = g.id')
        .join('rooms', 'ro', 'ro.id = re.room_id')
        .where(`ro.room_number = '${room_number}'`)
        .where('re.status = "checked_in"')
        .where('CURDATE() BETWEEN re.check_in AND re.check_out')
        .toString()

      const instances = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
      let guest = instances[0]
      if (!guest) return done(null, false)
      const isMatchedPassport = (passport_number === guest.passport_number)
      if (isMatchedPassport) {
        guest = new GetGuestInfo(guest)
        return done(null, { guest })
      }
      return done(null, false)
    }
))
