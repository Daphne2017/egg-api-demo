'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, BOOLEAN } = Sequelize

    await queryInterface.createTable('admin_users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: STRING(30),
        comment: '用户登录名',
      },
      password: {
        type: STRING(255),
        comment: '用户登录密码',
      },
      is_admin: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否为管理员',
      },
      role: {
        type: STRING(50),
        allowNull: false,
        defaultValue: true,
        comment: '账号角色',
      },
      status: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '账号状态',
      },
      created_at: {
        type: DATE,
        allowNull: false,
        comment: '数据创建时间',
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        comment: '数据更新时间',
      },
    })
  },
  down: async queryInterface => {
    await queryInterface.dropTable('admin_users')
  },
}
