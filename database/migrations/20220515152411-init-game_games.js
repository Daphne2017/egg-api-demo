'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize
    await queryInterface.createTable(
      'game_games',
      {
        id: {
          type: INTEGER(11).UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          comment: '主键',
        },
        gameName: {
          type: STRING(255),
          allowNull: false,
          field: 'game_name',
          defaultValue: '',
          comment: '游戏名称',
        },
        simpleDesc: {
          type: STRING(255),
          allowNull: false,
          defaultValue: '',
          comment: '一句话描述',
          field: 'simple_desc',
        },
        putStatus: {
          type: INTEGER(3).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '上架状态',
          field: 'put_status',
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
        comment: '游戏列表',
      },
    )
  },

  down: async queryInterface => {
    await queryInterface.dropTable('game_games')
  },
}
