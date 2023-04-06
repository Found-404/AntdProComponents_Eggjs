// /* eslint-disable node/prefer-promises/fs */
const NodeRSA = require('node-rsa');

module.exports = {
  encryption(text) {
    const pubkey = new NodeRSA(this.app.config.pubkeyPrikey.pubKey, 'pkcs8-public');
    return pubkey.encrypt(text, 'base64');
  },
  decrypt(text) {
    const prikey = new NodeRSA(this.app.config.pubkeyPrikey.priKey, 'pkcs8-private');
    return prikey.decrypt(text, 'utf8');
  },
};
