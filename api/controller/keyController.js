var crypto= require('crypto');
var settings = require('../config/setting')

exports.generateKey = function generateKey(id) {
  rand = Math.random().toString()
  return new Promise (resolve => {
    crypto.generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase : settings.passphrase
        }
      }, (err, publicKey, privateKey) => {
        console.log("hihi");
        resolve([publicKey, privateKey]);
      })
  })   
}

exports.hashText = function(text) {
  return new Promise(resolve => {
    var hash = crypto.createHash('md5').update(text).digest('hex');
    resolve(hash)
  })
}

exports.privateEncrypt = function(privateKey, buffer) {
  return new Promise(resolve => {
    var encrypted = crypto.privateEncrypt(
      {
        key : privateKey,
        passphrase : settings.passphrase
      }, 
      buffer);
    resolve (encrypted)
  })
}

exports.publicDecrypt = function(publicKey, buffer) {
  return new Promise(resolve => {
    var decrypted = crypto.publicDecrypt(
      {
        key : publicKey,
        // passphrase : settings.passphrase
      },
      buffer)
    resolve (decrypted)
  })
}