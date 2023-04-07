'use strict';

const { Controller } = require('egg');

class DingWarningController extends Controller {
  async warning() {
    const {
      ctx,
    } = this;

    const success = await ctx.service.dingWarning.warning(ctx.request.body);

    ctx.body = {
      success: success.errmsg,
    };
    ctx.status = 200;
  }

}

module.exports = DingWarningController;
