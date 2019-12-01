var generateKeyPair = require('crypto');

exports.generateKeyPair = generateKeyPair('rsa', {
  modulusLength: 4096,

  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },

  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret'
  }
}, function (err, publicKey, privateKey) {
  if (err) return (err);
  
  return (publicKey, privateKey)
});