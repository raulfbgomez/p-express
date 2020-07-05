const express = require('express')
const path = require('path')

const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')

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

// Server init
const server = app.listen(8000, function() {
  console.log(`Listening on http://localhost:${server.address().port}`)
})