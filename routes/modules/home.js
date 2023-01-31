const express = require('express')
const router = express.Router()
const urlGenerator = require('../../public/javascripts/url-generator')
const URL = require('../../models/URLData');
const { default: axios } = require('axios');
let errorFeedback = ''
let UrlStatusCode = ''

async function returnStatus(inputValue) {
  await axios.get(inputValue)
    //  如果網址可以連接
    .then(res => {
      errorFeedback = ''
      UrlStatusCode = res.status
      console.log(res.status)
      console.log('網址有效!')
    })
    //  如果網址無法連接
    .catch(err => {
      errorFeedback = '請輸入有效網址'
      console.log('網址無效!')
    })
    .finally(() => {
      console.log('error:', errorFeedback)
    }
    )
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
        console.log('資料庫已存在')
        res.render('index', { Data })
      } else {
        // 待補充
        // 驗證網址是否正確連接
        try {
          returnStatus(inputValue)
        }
        catch (err) {
          console.log(err)
        } finally {
          if (UrlStatusCode === 200) {
            // 如果沒有則創建一組
            console.log('Create new one')
            URL.create(survey)
              .then(() => res.render('index', { Data: survey }))
              .catch(error => res.redirect('/error'))
          } else {
            errorFeedback = '請輸入有效網址'
            console.log(errorFeedback)
            res.render('index', { errorFeedback })
          }
        }
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
})

module.exports = router