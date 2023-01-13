const express = require('express')
const router = express.Router()
const urlGenerator = require('../../public/javascripts/url-generator')
const httpExisted = require('../../public/javascripts/httpExisted')
const URL = require('../../models/URLData')
const https = require('https')

function returnStatus(inputValue) {
  https.get(inputValue, (res) => {
    console.log('status code:', res.statusCode)
  })
}

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const input = req.body
  const inputValue = req.body.url
  const shortenInput = urlGenerator()
  const survey = { ...input, ...shortenInput }

  // 如果有相同網址匯入資料
  URL.findOne({ url: inputValue })
    .lean()
    .then((Data) => {
      if (Data) {
        console.log('There was already existed')
        returnStatus(inputValue)
        res.render('index', { Data })
      } else {
        // 待補充
        // 驗證網址是否能連上
        // returnStatus(inputValue)

        // 如果沒有則創建一組
        console.log('Create new one')
        URL.create(survey)
          .then(() => res.render('index', { Data: survey }))
          .catch(error => res.redirect('/error'))
      }
    })
    .catch(error => res.redirect('/error'))
})

module.exports = router