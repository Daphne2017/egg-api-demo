'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize
    await queryInterface.createTable(
      'game_game_tag',
      {
        gameId: {
          type: INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          comment: '游戏id',
          field: 'game_id',
        },
        tagId: {
          type: INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          comment: '标签id',
          field: 'tag_id',
        },
        sort: {
          type: INTEGER(11),
          allowNull: false,
          defaultValue: 0,
          comment: '排序',
        },
      },
      {
        comment: '关联表',
        indexes: [
          {
            name: 'tag_sort',
            using: 'BTREE',
            fields: [ 'tagId', 'sort' ],
          },
        ],
      }
    )
  },

  down: async queryInterface => {
    await queryInterface.dropTable('game_game_tag')
  },
}
