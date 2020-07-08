const express = require('express')
const path = require('path')
const boom = require('@hapi/boom')

const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const authApiRouter = require('./routes/api/auth')

const { logErrors, wrapErrors, clientErrorHandler, errorHandler } = require('./utils/middleware/errorsHanlders')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')

// App init
const app = express()

// Middlewares. Anteriormente se instalaba body-parser para recibir peticiones JSON
app.use(express.json()) 

// static files
app.use('/static', express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// routes
app.get('/', function(req, res) { // route handler tambien llamado middleware
  res.redirect('/products') // redirect to products url
})
app.use('/products', productsRouter)
app.use('/api/products', productsApiRouter)
app.use('/api/auth', authApiRouter)

// El ultimo middleware es interpretado por express porque no encontro ninguna ruta
app.use(function(req, res, next) {
  if(isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound()
    res.status(statusCode).json(payload)
  }
  res.status(404).render('404')
})

// Los middlewares de error siempre deben ir al final de las rutas
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// Server init
const server = app.listen(8000, function() {
  console.log(`Listening on http://localhost:${server.address().port}`)
})