const Service = require('egg').Service;

class ShopsService extends Service {
  async search(params) {
    const {
      app,
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

    const list = await app.database.select('shops', {
      where: {
        ...wheres,
      },
      limit: pageSize,
      offset: pageSize * (current - 1),
    });
    const total = await app.database.count('shops', {
      ...wheres,
    });

    return {
      current,
      pageSize,
      total,
      list,
    };
  }

  async delete(body) {
    const {
      app,
    } = this;

    const { id } = body

    const result = await app.database.delete('shops', {
      id
    })

    return result.affectedRows === id.length;
  }

}

module.exports = ShopsService;