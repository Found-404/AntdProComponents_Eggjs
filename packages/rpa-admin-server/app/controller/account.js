'use strict';

const { Controller } = require('egg');

class AccountController extends Controller {
  async add() {
    const {
      ctx,
    } = this;

    const success = await ctx.service.account.add(ctx.request.body);

    ctx.body = {
      success,
    };
    ctx.status = 200;
  }

  async search() {
    const {
      ctx,
    } = this;

    const data = await ctx.service.account.search(ctx.query);

    ctx.body = {
      success: true,
      data,
    };
    ctx.status = 200;
  }

  async update() {
    const {
      ctx,
    } = this;

    const success = await ctx.service.account.edit(ctx.params.id, ctx.request.body);

    ctx.body = {
      success,
    };
    ctx.status = 200;
  }

  async delete() {
    const {
      ctx,
    } = this;

    const success = await ctx.service.account.delete(ctx.params.id);

    ctx.body = {
      success,
    };
    ctx.status = 200;
  }

}

module.exports = AccountController;
