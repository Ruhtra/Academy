const controllerAuth = require('../controllers/auth.js')
const controllerUser = require('../controllers/user.js')
const controllerGym = require('../controllers/gym.js')
const router = require('express').Router()

const use = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}


router.post('/gym/post', use(controllerGym.post))

router.get('/user/get', use(controllerUser.get))

router.post('/auth/login', use(controllerAuth.login))
router.post('/auth/hash', use(controllerAuth.getHash))

module.exports = router