const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const api = express.Router()

const { config } = require('../../config')

// Basic strategy
require('../../utils/auth/strategies/basic')

api.post('/token', async function(req, res, next) {
  // Implementar basic strategy con un custom callback
  // Esto para intervenir el proceso que hay adentro
  passport.authenticate('basic', function(error, user) {
    try {
      if(error || !user) {
        next(boom.unauthorized())
      }
      req.login(user, { session: false }, async function(error) {
        if(error) {
          next(error)
        }
        const payload = { sub: user.username, email: user.email }
        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: '15m'
        })
        return res.status(200).json({ access_token: token })
      })
    } catch(err) {
      next(error)
    }
  })(req, res, next)
})

module.exports = api