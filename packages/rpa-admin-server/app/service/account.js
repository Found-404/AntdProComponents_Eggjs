const Service = require('egg').Service;
class AccountService extends Service {
  async add(params) {
    const {
      app,
      ctx,
    } = this;

    const result = await app.database.insert('kjvs_accounts', { ...params, password: ctx.helper.encryption(params.password) });

    return result.affectedRows === 1;
  }

  async search(params) {
    const {
      app,
      ctx,
    } = this;
    const {
      pageSize,
      current,
      ...where
    } = params;

    const wheres = JSON.parse(JSON.stringify(where, (key, value) => {
      if (value === '') return undefined
      return value
    }))

    const list = await app.database.select('kjvs_accounts', {
      where: {
        ...wheres,
      },
      limit: pageSize,
      offset: pageSize * (current - 1),
    });
    const total = await app.database.count('kjvs_accounts', {
      ...wheres,
    });

    return {
      current,
      pageSize,
      total,
      list: list.map(ele => {
        return { ...ele, password: ctx.helper.decrypt(ele.password) };
      }),
    };
  }

  async delete(id) {
    const {
      app,
    } = this;

    const result = await app.database.delete('kjvs_accounts', { id });

    return result.affectedRows === 1;
  }

  async edit(id, data) {
    const {
      app,
      ctx,
    } = this;

    const result = await app.database.update('kjvs_accounts', { ...data, password: ctx.helper.encryption(data.password) }, {
      where: {
        id
      }
    })

    return result.affectedRows === 1;
  }
}

module.exports = AccountService;