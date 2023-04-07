
const CryptoJS = require('crypto-js');
const Service = require('egg').Service;


class DingWarning extends Service {
  async warning(params) {
    const {
      config,
    } = this;
    const { text } = params;
    const { dingSecret, dingToken } = config;
    const time = new Date().getTime();
    const sign = time + '\n' + dingSecret;
    const q = CryptoJS.HmacSHA256(sign, dingSecret); // HmacSHA256计算签名
    const hashInBase64 = CryptoJS.enc.Base64.stringify(q); // base64加密
    const encodesign = encodeURI(hashInBase64); // 解密

    const data = {
      at: {
        isAtAll: false,
      },
      text: {
        content: text,
      },
      msgtype: 'text',
    };
    const result = await this.ctx.curl(`https://oapi.dingtalk.com/robot/send?access_token=${dingToken}&timestamp=${time}&sign=${encodesign}`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json;charset=utf-8',
      },
      data,
      dataType: 'json',
    });
    return result.data;
  }

}

module.exports = DingWarning;
