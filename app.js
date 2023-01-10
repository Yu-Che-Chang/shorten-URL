const port = 3000
const express = require('express')

const app = express()

require('./config/mongoose')

app.get('/', (req, res) => {
  res.send('good job!')
})

app.listen(port, () => {
  console.log(`Now server is hosting on http://localhost:${port}`)
})