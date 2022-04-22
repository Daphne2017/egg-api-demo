'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TINYINT } = Sequelize

    await queryInterface.createTable('game_tags', {
      id: {
        type: INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键',
      },
      tagName: {
        type: STRING(255),
        allowNull: false,
        comment: '标签名称',
        field: 'tag_name',
        defaultValue: '',
      },
      relatedGameCount: {
        type: INTEGER(11),
        allowNull: false,
        comment: '关联游戏数',
        field: 'related_game_count',
        defaultValue: 0,
      },
    })
  },
  down: async queryInterface => {
    await queryInterface.dropTable('game_tags')
  },
}
