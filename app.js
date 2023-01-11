'use strict';
const port = 3000
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const urlGenerator = require('./url-generator')
const URL = require('./models/URLData');
const e = require('express');

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
// app.use('/images', express.static('images'))

require('./config/mongoose')

app.use(express.urlencoded({ extended: true })) //取得 url-encoded

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const input = req.body
  const inputValue = req.body.url
  const ShortenInput = urlGenerator()
  const survey = { ...input, ...ShortenInput }
  // 如果有相同網址
  URL.findOne({ url: inputValue })
    .then((Data) => {
      if (Data) {
        console.log('There was already existed')
        res.render('index', { Data })
      } else {
        // 如果沒有則創建一組
        console.log('Create new one')
        console.log(survey)
        URL.create(survey)
          .then(() => res.render('index', { Data }))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Now server is hosting on http://localhost:${port}`)
})