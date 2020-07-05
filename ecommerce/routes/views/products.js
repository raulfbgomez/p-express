const express = require('express')
const router = express.Router()

// Mandamos a llamar a nuestro servicio de productos
const ProductsService = require('../../services/product')
const productService = new ProductsService()

router.get('/', async function(req, res, next) {
  const { tags } = req.query
  try {
    const products = await productService.getProducts({ tags })
    res.render('products', { products })
  } catch(err) {
    next(err)
  }
})


module.exports = router