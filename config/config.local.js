'use strict'

const nowMode = 'local'

const mysqlConfigMap = {
  local: {
    username: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 3306,
  },
  gray: {
    username: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 3306,
  },
  product: {
    username: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 3306,
  },
}

const dataBaseMap = {
  local: {
    database: 'egg_dev',
  },
  gray: {
    database: 'egg_gray',
  },
  product: {
    database: 'egg_product',
  },
}

const mysqlBaseConfig = {
  dialect: 'mysql',
  ...mysqlConfigMap[nowMode],
  timezone: '+08:00', // 保存为本地时区
  define: {
    // query: { raw: true },  -------------------这里
    freezeTableName: true, // 防止修改表名为复数
    underscored: true, // underscored: true, 不使用驼峰样式自动添加属性，而是下划线样式 [ createdAt => created_at ]
  },
}
// 数据库的配置，兼容多个库
module.exports = () => {
  return {
    sequelize: {
      datasources: [{
        delegate: 'model',
        baseDir: 'model',
        ...dataBaseMap[nowMode],
        ...mysqlBaseConfig,
      }],
    },
  }
}
