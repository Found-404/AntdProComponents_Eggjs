# EggJs 连接钉钉机器人

## 创建机器人
## 获取 token 和密钥
## 配置 token 和密钥
我选择将 token 和密钥配置在 config 当中方便获取

```js
...

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
        password: 'xxx',
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

  // 钉钉机器人 token && 密钥
  const dingToken = '393xxx'; // token
  const dingSecret = 'SECxxx'; // 密钥

  return {
    ...config,
    ...userConfig,
    dingSecret,
    dingToken,
    pubkeyPrikey,
  };

...

```

## 请求接口

```js
  async warning(params) {
    const {
      config,
    } = this;
    const { text } = params;
    // config中存放着你的默认配置属性
    const { dingSecret, dingToken } = config;
    const time = new Date().getTime();
    const sign = time + '\n' + dingSecret;
    const q = CryptoJS.HmacSHA256(sign, dingSecret); // HmacSHA256计算签名
    const hashInBase64 = CryptoJS.enc.Base64.stringify(q); // base64加密
    const encodesign = encodeURI(hashInBase64); // 解密

    const data = {
      at: {
        isAtAll: false, // 是否@所有人
      },
      text: {
        content: text, 
      },
      msgtype: 'text', // 也可选择其他格式，详情可见顶顶机器人官方文档
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

```
