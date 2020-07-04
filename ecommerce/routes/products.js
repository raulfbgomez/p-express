const express = require('express')
const router = express.Router()

const products = [
  {name: 'Red Shoes', proce: 75, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'},
  {name: 'Black Bike', proce: 250, image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1008&q=80'}
]

router.get('/products', function(req, res) {
  res.render('products', { products })
})


module.exports = router