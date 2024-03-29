'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, BOOLEAN } = Sequelize
    await queryInterface.createTable(
      'admin_users',
      {
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
          type: STRING,
          comment: '用户登录密码',
        },
        isAdmin: {
          type: INTEGER,
          allowNull: false,
          defaultValue: 0,
          field: 'is_admin',
          comment: '是否为管理员',
        },
        status: {
          type: BOOLEAN,
          allowNull: false,
          defaultValue: true,
          comment: '账号状态。禁用：0，正常：1',
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
      },
      {
        comment: '用户列表',
      },
    )
  },

  down: async queryInterface => {
    await queryInterface.dropTable('admin_users')
  },
}
