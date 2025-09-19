const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../models/User')

router.get('/demo', function(req, res) {
  User.register(new User({ username: 'demo' }), 'demo', function() {
    res.redirect('/')
  })
})

router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  
  // Handle demo user
  if (username === 'demo' && password === 'demo') {
    // Check if demo user exists, if not create it
    User.findOne({ username: 'demo' }, function(err, user) {
      if (err) return next(err)
      if (!user) {
        User.register(new User({ username: 'demo' }), 'demo', function(err, user) {
          if (err) return next(err)
          req.login(user, function(err) {
            if (err) return next(err)
            return res.json({ success: true })
          })
        })
      } else {
        req.login(user, function(err) {
          if (err) return next(err)
          return res.json({ success: true })
        })
      }
    })
  } else {
    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err)
      if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' })
      req.login(user, function(err) {
        if (err) return next(err)
        return res.json({ success: true })
      })
    })(req, res, next)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router
