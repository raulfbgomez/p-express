const express = require('express')
const passport = require('passport')
// const router = express.Router()

// Mandamos a llamar a nuestro servicio de productos
const ProductsService = require('../../services/product')
const productService = new ProductsService()

const validation = require('../../utils/middleware/validationHandler')
// Traemos los schemas creados con @Hapi/Joi
const { 
  productIdSchema, 
  productTagSchema, 
  createProductSchema, 
  updateProductSchema 
} = require('../../utils/schemas/products')

// JWT Strategy
require('../../utils/auth/strategies/jwt')

// Test Inversion de control
function productsApi(app) {
  const router = express.Router()
  app.use('/api/products', router)
  router.get('/', async function(req, res, next) {
    const { tags } = req.query
    try {
      // throw new Error('This is an error from the API')
      const products = await productService.getProducts({ tags })
    
      res.status(200).json({
        data: products,
        message: 'products listed'
      })
    } catch(err) {
      next(err)
    }
  })

  router.get('/:productId', async function(req, res, next) {
    const { productId } = req.params
    try {
      const product = await productService.getProduct({ productId })
    
      res.status(200).json({
        data: product,
        message: 'product retrieved'
      })
    } catch(err) {
      next(err)
    }
  })

  router.post('/', validation(createProductSchema), async function(req, res, next) {
    const { body: product } = req
    try {
      const newProduct = await productService.createProduct({ product })
    
      res.status(201).json({
        data: newProduct,
        message: 'product created'
      })
    } catch (err) {
      next(err)
    }
  })

  router.put('/:productId',
    passport.authenticate('jwt', { session: false }), // Middleware para que solo se pueda acceder a esta ruta con un access token
    validation(productIdSchema, "params"),
    validation(updateProductSchema), 
    async function(req, res, next) {
      const { productId } = req.params
      const { body: product } = req
      try{
        const newProduct = await productService.updateProduct({ productId, product })
      
        res.status(200).json({
          data: newProduct,
          message: 'product updated'
        })
      } catch(err) {
        next(err)
      }
  })

  router.delete('/:productId', 
    passport.authenticate('jwt', { session: false }), // Middleware para que solo se pueda acceder a esta ruta con un access token
    async function(req, res, next) {
      const { productId } = req.params
      try {
        const product = await productService.deleteProduct({ productId })
      
        res.status(200).json({
          data: product,
          message: 'product deleted'
        })
      } catch (err) {
        next(err)
      }
  })
}

module.exports = productsApi
