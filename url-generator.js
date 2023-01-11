function sample(collection) {
  let randomIndex = Math.floor(Math.random() * 64)
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

  let urlShorted = 'https://shortURL/'
  for (i = 0; i <= 4; i++) {
    urlShorted += sample(collection)
  }
  return { shortenUrl: urlShorted }
}

module.exports = urlGenerator