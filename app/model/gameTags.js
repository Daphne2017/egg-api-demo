'use strict'
/*  标签库列表  */
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize

  const GameTags = app.model.define('game_tags', {
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
  },
  {
    timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
  })
  return GameTags
}
