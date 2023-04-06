import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: '任务管理',
      path: '/table',
      component: './Table',
    },
    {
      name: '店铺管理',
      path: '/shops',
      component: './Shops',
    },
    {
      name: '账号管理',
      path: '/Account',
      component: './Account',
    },
  ],
  npmClient: 'npm',
  outputPath: '../rpa-admin-server/app/public',
  publicPath: '/public/',
  base: '/',
  hash: true,
});
