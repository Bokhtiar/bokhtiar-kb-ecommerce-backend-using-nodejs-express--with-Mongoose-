const adminAuthRoute = require('express').Router()
const authController = require('../../controller/admin/authController')

    adminAuthRoute.get('/', authController.List)
    adminAuthRoute.post('/login', authController.Login)
    adminAuthRoute.delete('/:id', authController.Destroy)
    adminAuthRoute.post('/register', authController.Register)

module.exports = adminAuthRoute