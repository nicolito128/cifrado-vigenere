const { encrypt, decrypt } = require('./vigenere.js')

const message = 'SABOR'
const key = 'LIMON'
const encryptedMessage = encrypt(message, key)
const decryptedMessage = decrypt(encryptedMessage, key)

console.log('Mensaje encriptado: ' + encryptedMessage)
console.log('Mensaje descifrado: ' + decryptedMessage)