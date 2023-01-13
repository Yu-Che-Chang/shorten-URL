const https = require('https')

function httpExisted(url) {
  https.get(url, res => {

    console.log(res.statusCode)

  })
}


module.exports = httpExisted