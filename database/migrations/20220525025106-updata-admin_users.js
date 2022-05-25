'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('admin_users', 'email', {
      type: Sequelize.STRING,
      comment: '邮箱。',
    }, {
      after: 'password',
    })
    await queryInterface.addColumn('admin_users', 'mobile', {
      type: Sequelize.STRING,
      comment: '手机号。',
    }, {
      after: 'password',
    })
  },

  down: async queryInterface => {
    // 不需要回滚
    await queryInterface.removeColumn('admin_users', 'email')
    await queryInterface.removeColumn('admin_users', 'emmobileail')
  },
}
