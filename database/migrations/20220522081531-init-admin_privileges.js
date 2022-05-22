'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM } = Sequelize

    await queryInterface.createTable(
      'admin_privileges',
      {
        privilege_id: {
          type: INTEGER(11),
          primaryKey: true,
          autoIncrement: true,
        },
        privilege_master: {
          type: STRING(100),
          allowNull: false,
          comment: '用户或角色..., user/role...',
        },
        privilege_master_value: {
          type: INTEGER(11),
          allowNull: false,
          comment: '用户或角色对应的ID',
        },
        privilege_access: {
          type: STRING(100),
          allowNull: false,
          comment: '菜单或按钮..., menu/button...',
        },
        privilege_access_value: {
          type: INTEGER(11),
          allowNull: false,
          comment: '菜单或按钮对应的ID',
        },
        privilege_operation: {
          type: ENUM('enabled', 'disabled'),
          defaultValue: 'disabled',
          allowNull: false,
          comment: '权限启用, enabled: 启用, disabled: 禁用',
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
      { // 多个字段作为联合主键，作为一条唯一记录
        comment: '权限对照表',
        uniqueKeys: {
          one_record: {
            customIndex: true,
            fields: [ 'privilege_master', 'privilege_master_value', 'privilege_access', 'privilege_access_value' ],
          },
        },
      },
    )
  },

  down: async queryInterface => {
    await queryInterface.dropTable('admin_privileges')
  },
}
