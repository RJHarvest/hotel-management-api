const reqStaffAuth = (req, res, next) => {
  const isStaffLoggedIn = req.user && req.user.staff
  if (!isStaffLoggedIn) {
    return res.status(401).send({ error: 'You must be logged in!' })
  }
  next()
}

const reqGuestAuth = (req, res, next) => {
  const isGuestLoggedIn = req.user && req.user.guest
  if (!isGuestLoggedIn) {
    return res.status(401).send({ error: 'You must be logged in!' })
  }
  next()
}

const reqAuth = (req, res, next) => {
  const isGuestLoggedIn = req.user && req.user.guest
  const isStaffLoggedIn = req.user && req.user.staff
  if (!isGuestLoggedIn || !isStaffLoggedIn) {
    return res.status(401).send({ error: 'You must be logged in!' })
  }
  next()
}

module.exports = {
  reqStaffAuth,
  reqGuestAuth,
  reqAuth,
}
