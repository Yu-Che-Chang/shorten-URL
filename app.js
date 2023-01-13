'use strict';
const port = 3000
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const routes = require('./routes')

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.static('./public/javascripts'))

require('./config/mongoose')

app.use(express.urlencoded({ extended: true })) //取得 url-encoded

app.use(routes)

app.use((req, res, next) => {
  res.status(404).redirect('/error')
})

app.listen(port, () => {
  console.log(`Now server is hosting on http://localhost:${port}`)
})

