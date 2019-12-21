var crypto= require('crypto');

exports.generateKey = function generateKey(id) {
  rand = Math.random().toString()
  passphrase = id+rand
  return new Promise (resolve => {
    crypto.generateKeyPair('rsa', {
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

exports.hashText = function(text) {
  return new Promise(resolve => {
    var hash = crypto.createHash('md5').update(text).digest('hex');
    resolve(hash)
  })
}

exports.privateEncrypt = function(privateKey, buffer) {
  return new Promise(resolve => {
    var encrypted = crypto.privateEncrypt(privateKey, buffer);
    resolve (encrypted)
  })
}

exports.publicDecrypt = function(publicKey, buffer) {
  return new Promise(resolve => {
    var decrypted = crypto.publicDecrypt(publicKey, buffer)
    resolve (decrypted)
  })
}