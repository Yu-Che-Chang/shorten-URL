const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const input = req.body
  const inputValue = req.body.url
  const shortenInput = urlGenerator()
  const survey = { ...input, ...shortenInput }
  // 如果有相同網址
  URL.findOne({ url: inputValue })
    .lean()
    .then((Data) => {
      if (Data) {
        console.log('There was already existed')
        res.render('index', { Data })
      } else {
        // 如果沒有則創建一組
        console.log('Create new one')
        console.log(survey)
        URL.create(survey)
          .then(() => res.render('index', { Data: survey }))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
})

module.exports = router