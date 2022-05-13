'use strict'

const nowMode = 'local'
// const nowMode = 'alpha'
// const nowMode = 'tmp'

const mysqlConfigMap = {
  local: {
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
}

const dataBaseLogMap = {
  local: {
    database: 'huoxing_log',
  },

}

const mysqlBaseConfig = {
  dialect: 'mysql',
  ...mysqlConfigMap[nowMode],
  timezone: '+08:00',
  define: {
    underscored: false, //  防止驼峰式字段被默认转为下划线,注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
    // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    freezeTableName: true, // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数,但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
  },
}
// 数据库的配置
module.exports = () => {
  return {
    sequelize: {
      datasources: [{
        delegate: 'model',
        baseDir: 'model',
        ...dataBaseMap[nowMode],
        ...mysqlBaseConfig,
      }, {
        delegate: 'modelLog',
        baseDir: 'model_log',
        ...dataBaseLogMap[nowMode],
        ...mysqlBaseConfig,
      }],
    },
  }
}
