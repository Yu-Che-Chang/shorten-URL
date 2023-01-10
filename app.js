'use strict';
const port = 3000
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
// app.use('/images',express.static('images'))

require('./config/mongoose')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Now server is hosting on http://localhost:${port}`)
})