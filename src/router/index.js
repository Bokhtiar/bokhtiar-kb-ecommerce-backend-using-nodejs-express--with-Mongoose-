const adminAuthRoute = require('./admin/auth.route')

const appRoute = require('express').Router()

    appRoute.use('/admin', adminAuthRoute)

module.exports = appRoute