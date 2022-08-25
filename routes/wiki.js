const express = require('express')
const router = express.Router()

// home
router.get('/', function (req, res) {
  res.send('Wiki home')
})

// about
router.get('/about', function (req, res) {
  res.send('About')
})

module.exports = router