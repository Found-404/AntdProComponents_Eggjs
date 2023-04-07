'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get(/^(?!\/api\/).*/, controller.home.index);

  router.get('/api/task/search', controller.task.search);
  router.put('/api/task/:id', controller.task.update);
  router.post('/api/task/add', controller.task.add);
  router.delete('/api/task/:id', controller.task.delete);

  router.get('/api/account/search', controller.account.search);
  router.put('/api/account/:id', controller.account.update);
  router.post('/api/account/add', controller.account.add);
  router.delete('/api/account/:id', controller.account.delete);

  router.get('/api/shops/search', controller.shops.search);
  router.delete('/api/shops', controller.shops.delete);

  router.post('/api/dingwarning', controller.dingWarning.warning);
};
