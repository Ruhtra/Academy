const controllerAuth = require('../controllers/auth.js')
const router = require('express').Router()

const use = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/auth/login', use(controllerAuth.login))
router.post('/auth/hash', use(controllerAuth.getHash))
// router.post('/auth/verifyJWT', use(controllerAuth.verifyJWT))

module.exports = router