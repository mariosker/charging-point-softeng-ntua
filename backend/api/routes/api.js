const express = require('express')
const router = express.Router()
const userAuth = require('../services/verifyUser')

const userLogin = require('../services/userLogin')
router.post('/login', userLogin)

const userLogout = require('../services/userLogout')
router.post('/logout', userAuth, userLogout)

const admin = require('./admin/admin')
router.use('/admin', admin)

module.exports = router
