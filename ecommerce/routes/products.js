const express = require('express')
const router = express.Router()

const products = [
  {name: 'Red Shoes', proce: 75},
  {name: 'Black Bike', proce: 250}
]

router.get('/products', function(req, res) {
  res.render('products', { products })
})


module.exports = router