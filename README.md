# 初始化
```bash
npm run init
```
`初始化基础配置操作`

# 清理 node_modules
```bash
npx lerna clean
```

# 安装 node_modules
```bash
npx lerna bootstrap
```

# 启动管理后台前端
```bash
lerna run dev --scope=rpa-admin
```

# 启动管理后台
```bash
npx lerna run dev --scope=rpa-admin-server
or
npx run admin
```
请配置好config.local.js文件,见[后端开发环境准备](#后端开发环境准备)

# 更新迭代
```bash
npm run changelog
```

# 工程目录
- 前端工程目录：`packages/rpa-admin`
- 后端工程目录：`packages/rpa-admin-server`

# 后端开发环境准备
+ 本地安装`mysql``5.7.12`版本
+ 在`packages/rpa-admin-server/config/`目录下新建`config.local.js`文件
+ 将本地`mysql`账号密码配置到`packages/rpa-admin-server/config/config.local.js`文件中

## Eg:
```js
exports.mysql = {
    client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '*****',
    },
    app: true,
    agent: false,
}
```
