'use strict';

const { Controller } = require('egg');

class ShopsController extends Controller {
  async search() {
    const {
      ctx,
    } = this;

    const data = await ctx.service.shops.search(ctx.query);

    ctx.body = {
      success: true,
      data,
    };
    ctx.status = 200;
  }


  async delete() {
    const {
      ctx,
    } = this;

    const success = await ctx.service.shops.delete(ctx.request.body);

    ctx.body = {
      success,
    };
    ctx.status = 200;
  }

}

module.exports = ShopsController;
