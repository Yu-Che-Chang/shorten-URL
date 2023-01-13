function sample(collection) {
  let randomIndex = Math.floor(Math.random() * 62)
  return collection[randomIndex]
}

function urlGenerator(url) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  let collection = []
  collection = collection.concat(...lowerCaseLetters)
  collection = collection.concat(...upperCaseLetters)
  collection = collection.concat(...numbers)

  let urlShorted = '/shorturl/'
  for (i = 0; i < 5; i++) {
    urlShorted += String(sample(collection))
  }
  return { shortenUrl: urlShorted }
}

module.exports = urlGenerator