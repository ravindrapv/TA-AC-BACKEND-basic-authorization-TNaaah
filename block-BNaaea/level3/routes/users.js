var express = require('express');
var router = express.Router();
var User = require('../models/User');

// register
router.get('/register/new', (req, res, next) => {
  let user = req.user;
  res.render('register', { user });
});

router.post('/register/new', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/users/userlogin');
  });
});
// login

router.get('/userlogin', (req, res, next) => {
  let user = req.user;
  let error = req.flash('error')[0];
  res.render('userlogin', { error, user });
});

router.post('/userlogin', (req, res, next) => {
  var { email, password } = req.body;

  if (!email || !password) {
    req.flash('error', 'Email / Password is required');
    return res.redirect('/users/userlogin');
  }

  User.findOne({ email }, (err, user) => {
    if (err) return next(err);

    if (!user) {
      req.flash('error', 'Something Went Wrong ');
      return res.redirect('/users/userlogin');
    }

    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);

      if (!result) {
        req.flash('error', 'Incorrect Password');
        return res.redirect('/users/userlogin');
      } else {
        console.log(req.session);
        req.session.userId = user.id;
        req.session.isAdmin = user.isAdmin;
        return res.redirect('/dashboard');
      }
    });
  });
});

// logout

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.clearCookie('connect-sid');
  res.redirect('/home');
});

module.exports = router;
