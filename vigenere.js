/* Cifrado Vigenère */
/* 
	El cifrado Vigenère es un cifrado basado en diferentesseries de caracteres o letras del cifrado 
	César formando estos caracteres una tabla, llamada tabla de Vigenère, que se usa como clave. 
	El cifrado de Vigenère es un cifrado por sustitución simple polialfabético.

	Bibliografía:
		* https://es.wikipedia.org/wiki/Cifrado_de_Vigen%C3%A8re
		* https://www.dcode.fr/cifrado-vigenere
*/

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T',
'U', 'V', 'W', 'X', 'Y', 'Z'];
const alphabetSize = alphabet.length - 1;

function encrypt(message, key) {
	const messageIndexes = getIndexesOf(message)
	const keyIndexes = matchLengthWith(getIndexesOf(key), message)
	let encryptedMessage = ''

    // Para encriptar el mensaje se suma cada letra con su correspondiente en la clave.
	messageIndexes.forEach((cur, i) => {
		let letter = cur + keyIndexes[i]
		// En caso de dar un resultado mayor a la longitud del alfabeto se resta la Longitud - 1 para obtener el resultado real.
		if (letter >= alphabet.length) letter -= alphabetSize
		encryptedMessage += alphabet[letter]
	})

	return encryptedMessage
}

function decrypt(message, key) {
	const messageIndexes =  getIndexesOf(message)
	const keyIndexes = matchLengthWith(getIndexesOf(key), message)
	let decryptedMessage = ''

    // Para descifrar hay que restar cada letra del mensaje cifrado con su correspondiente en la clave.
	messageIndexes.forEach((cur, i) => {
		let letter = cur - keyIndexes[i]
		// En caso de dar un número negativo hay que sumar la Longitud del Alfabeto - 1.
		if (letter < 0) letter += alphabetSize
		decryptedMessage += alphabet[letter]
	})

	return decryptedMessage
}

// Retorna un array con el valor de cada letra en el alfabeto.
function getIndexesOf(message) {
	return [...(message.replace(/ /g, ''))].map(letter => {
		const index = alphabet.indexOf(letter.toUpperCase())
		if (index == -1) return 0

		return index
	})
}

// Hacer coincidir la cantidad de letras de la clave con el mensaje (permitiendo operar más facilmente).
function matchLengthWith(key, message) {
	if (!Array.isArray(key)) return []
	if (key.length == message.length) return key

	let result = key
	for (let i = 0; result.length < message.length; i++) {
		result.push(result[i])
		if (i >= result.length) i = 0
		if (result.length == message.length) break;
	}

	return result
}

module.exports = { encrypt, decrypt }