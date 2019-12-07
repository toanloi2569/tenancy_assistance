var { generateKeyPair } = require('crypto');

exports.generateKey = function generateKey(id) {
  rand = Math.random().toString()
  passphrase = id+rand
  return new Promise (resolve => {
    generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: passphrase
        }
      }, (err, publicKey, privateKey) => {
        console.log("hihi");
        resolve([publicKey, privateKey]);
      })
  })   
}