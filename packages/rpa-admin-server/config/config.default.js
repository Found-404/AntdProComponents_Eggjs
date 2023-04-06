/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1677210272144_8189';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    security: {
      csrf: {
        enable: false,
      },
    },
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'vevor_rpa',
      },
      app: true,
      agent: false,
    },
    view: {
      root: path.join(appInfo.baseDir, 'app/public'),
      defaultExtension: '.html',
      defaultViewEngine: 'nunjucks',
    },
  };

  // 公钥私钥
  const pubkeyPrikey = {
    pubKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANlOP0pL7VdcwRv2rlm+EAnsnkblBsEkB+86UKY0PL83GwYdmEYFm6KNXz6DuNv2TPN1q1lvvGnFx2X9p7/g6E0CAwEAAQ==',
    priKey: 'MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEA2U4/SkvtV1zBG/auWb4QCeyeRuUGwSQH7zpQpjQ8vzcbBh2YRgWboo1fPoO42/ZM83WrWW+8acXHZf2nv+DoTQIDAQABAkEA2Iy2W3awjTe8pP49nubdmtY2oFWJVp1uXsLRLd+ujakpIdW8mZPHm6CTlpYH+/MFNeL6VAkaeDGA9D3xsixUwQIhAPQmO52lVbyC0+3GklQLELxqpdINqC66XbkzUCyctYl9AiEA49p1TNNCVc+PLMXd3u8zbmunzpNCgTQKsUOGhadgkxECICdX9elsmEldh8tcYX47nkHOqdQUsVJ+Y9YRZ80Yn8R9AiEA0StkEYHC3MmtExoV4ylN2qlDpFT1cWzYAAEQRjPwaTECIEfiBdHDErbTUcBCh3ffS8k1Pqt64PnJtaS46xzf3OPv',
  };

  return {
    ...config,
    ...userConfig,
    pubkeyPrikey,
  };
};
