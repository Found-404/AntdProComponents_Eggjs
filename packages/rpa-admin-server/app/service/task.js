const Service = require('egg').Service;
const moment = require('moment');

class TaskService extends Service {
  async add(params) {
    const {
      app,
    } = this;

    const result = await app.database.insert('tasks', params)

    return result.affectedRows === 1;
  }

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

    const list = await app.database.select('tasks', {
      where: {
        ...wheres,
        deleted: 0,
      },
      orders: [['created_at', 'desc']],
      limit: pageSize,
      offset: pageSize * (current - 1),
    });
    const total = await app.database.count('tasks', {
      ...wheres,
      deleted: 0,
    });

    return {
      current,
      pageSize,
      total,
      list: list.map(({ deleted, ...v }) => ({
        ...v,
        created_at: moment(v.created_at).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(v.updated_at).format('YYYY-MM-DD HH:mm:ss')
      })),
    };
  }

  async update(id, data) {
    const {
      app,
    } = this;

    const result = await app.database.update('tasks', data, {
      where: {
        id
      }
    })

    return result.affectedRows === 1;
  }

  async delete(id) {
    const {
      app,
    } = this;

    const result = await app.database.update('tasks', {
      deleted: 1
    }, {
      where: {
        id
      }
    })

    return result.affectedRows === 1;
  }

  async edit(id, data) {
    const {
      app,
    } = this;

    const result = await app.database.update('tasks', data, {
      where: {
        id
      }
    })

    return result.affectedRows === 1;
  }
}

module.exports = TaskService;