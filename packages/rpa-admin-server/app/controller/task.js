'use strict';

const { Controller } = require('egg');

class TaskController extends Controller {
  async add() {
    const {
      ctx,
    } = this;

    const success = await ctx.service.task.add(ctx.request.body);

    ctx.body = {
      success,
    };
    ctx.status = 200;
  }

  async search() {
    const {
      ctx,
    } = this;

    const data = await ctx.service.task.search(ctx.query);

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

    const success = await ctx.service.task.update(ctx.params.id, ctx.request.body);

    ctx.body = {
      success,
    };
    ctx.status = 200;
  }

  async delete() {
    const {
      ctx,
    } = this;

    const success = await ctx.service.task.delete(ctx.params.id);

    ctx.body = {
      success,
    };
    ctx.status = 200;
  }

}

module.exports = TaskController;
