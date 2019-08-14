const express = require('express')
const router = express.Router()
const passport = require('../../passport')

const userControllers = require('../controllers/userControllers');

router.post('/google',passport.authenticate('google-token'),userControllers.googleLogin);
//router.post('/facebook',passport.authenticate('google-token'),userControllers.googleLogin);

// this route is just used to get the user basic info
router.get('/user', userControllers.user)

router.post(
	'/login',
	passport.authenticate('local'),
	userControllers.login
)

router.get('/logout', userControllers.logout);

router.post('/signup',userControllers.signup);

module.exports = router





































/*
router.get('/google', function(req,res,next){
	console.log(1);
	next()
},passport.authenticate('google', { scope: ['profile','email'] }))

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/',
		session: false
	}),
	function(req,res){
		//var token = req.user.token;
		console.log(req.user);
		
		res.redirect("http://localhost:5000?token=" + 'abc')
	}
)
*/
