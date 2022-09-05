const { Router } = require("express");
const router = new Router();
const passport = require('passport')
const authLogin = require('../../middlewares/authLogin')

const { getLogin, getLogout} = require('../../controllers/login.controller.js')

router.get('/login', authLogin, getLogin);

router.get('/logout', getLogout)

router.post('/login', passport.authenticate('login', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router;