const express = require('express')
const router = express.Router()
const {registerController} = require('./controllers/registerController')
const {verifyController} = require('./controllers/verifyController')
const {validateController} = require('./controllers/validateController')

router.post('/api/register', registerController)
router.post('/api/verify', verifyController)
router.post('/api/validate', validateController)

module.exports = router;