const reqFrontDeskPermission = (req, res, next) => {
  const isStaffUser = req.user && req.user.staff
  const isFrontDeskRole = isStaffUser && req.user.staff.role === 'front_desk'
  if (!isFrontDeskRole) {
    return res.status(403).send({ error: 'You do not have permission!' })
  }
  next()
}

const reqRoomServicePermission = (req, res, next) => {
  const isStaffUser = req.user && req.user.staff
  const isRoomServiceRole = isStaffUser && req.user.staff.role === 'room_service'
  if (!isRoomServiceRole) {
    return res.status(403).send({ error: 'You do not have permission!' })
  }
  next()
}

const reqKitchenPermission = (req, res, next) => {
  const isStaffUser = req.user && req.user.staff
  const isKitchenRole = isStaffUser && req.user.staff.role === 'kitchen'
  if (!isKitchenRole) {
    return res.status(403).send({ error: 'You do not have permission!' })
  }
  next()
}

const reqManagerPermission = (req, res, next) => {
  const isStaffUser = req.user && req.user.staff
  const isManagerRole = isStaffUser && req.user.staff.role === 'manager'
  if (!isManagerRole) {
    return res.status(403).send({ error: 'You do not have permission!' })
  }
  next()
}

module.exports = {
  reqFrontDeskPermission,
  reqRoomServicePermission,
  reqKitchenPermission,
  reqManagerPermission,
}
