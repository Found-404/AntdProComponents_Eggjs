### 工程目录
- 前端工程目录：`packages/rpa-admin`
- 后端工程目录：`packages/rpa-admin-server`
### 环境准备
+ 本地安装`mysql``5.7.12`版本
+ 在`packages/rpa-admin-server/config/`目录下新建`config.local.js`文件
+ 将本地`mysql`账号密码配置到`packages/rpa-admin-server/config/config.local.js`文件中

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
### 前端工程本地开发
```bash
npx lerna run dev --scope=rpa-admin
```
### 前端工程打包
```bash
npx lerna run build --scope=rpa-admin
```
`打包输出目录在rpa-admin-server/public文件内`

### 后端工程本地开发
```bash
npx lerna run dev --scope=rpa-admin-server
```
