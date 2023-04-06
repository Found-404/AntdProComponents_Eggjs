'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    
    ctx.set('Cache-Control', 'no-cache');
    await ctx.render('index');
  }
}

module.exports = HomeController;
