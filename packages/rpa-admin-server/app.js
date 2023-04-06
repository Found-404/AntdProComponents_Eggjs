class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    const {
      app,
    } = this;

    await app.mysql.query('CREATE DATABASE IF NOT EXISTS rpa DEFAULT CHARSET utf8 COLLATE utf8_general_ci');
    app.database = app.mysql.createInstance(Object.assign(app.config.mysql.client, {
      database: 'rpa',
    }));

    // RPA任务表
    await app.database.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,		        
        name VARCHAR(255) NOT NULL,
        browser VARCHAR(255) NOT NULL,
        platform VARCHAR(255) NOT NULL,
        account VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        get_method VARCHAR(255) NOT NULL,
        get_url VARCHAR(255) NOT NULL,
        update_method VARCHAR(255) NOT NULL,
        update_url VARCHAR(255) NOT NULL,
        status INT NOT NULL COMMENT '0 关闭 1 开启',
        deleted INT NOT NULL DEFAULT 0 COMMENT '逻辑删除 0存在 1已删除',
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )  ENGINE=INNODB DEFAULT CHARSET utf8;
    `);

    const tasks_columns_2023_04_03 = await app.database.query(`
     SHOW COLUMNS FROM tasks LIKE 'account_id';
  `);

    const tasks_columns_account_2023_04_03 = await app.database.query(`
     SHOW COLUMNS FROM tasks LIKE 'account';
  `);
    const tasks_columns_password_2023_04_03 = await app.database.query(`
     SHOW COLUMNS FROM tasks LIKE 'password';
  `);

    // 增加账号关联id
    if (!tasks_columns_2023_04_03?.length) {
      await app.database.query(`
      ALTER TABLE tasks
        ADD account_id VARCHAR(255) NOT NULL;
    `);
    }
    // 删除account
    if (tasks_columns_account_2023_04_03?.length) {
      await app.database.query(`
      ALTER TABLE tasks
       drop account;
    `);
    }
    // 删除password
    if (tasks_columns_password_2023_04_03?.length) {
      await app.database.query(`
      ALTER TABLE tasks
       drop password;
    `);
    }

    // 账号表
    await app.database.query(`
      CREATE TABLE IF NOT EXISTS kjvs_accounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        account VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )  ENGINE=INNODB DEFAULT CHARSET utf8;
    `);
  }
}

module.exports = AppBootHook;
