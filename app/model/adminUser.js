
'use strict'

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE } = app.Sequelize

  const AdminUser = app.model.define('admin_users', {
    // 其他诸如：姓名、头像、手机之类的信息，直接从企业微信API获取
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
      // 密码加密，用户名做盐
      set(value) {
        this.setDataValue('password', app.utils.index.sha1(this.username + value))
      },
      comment: '用户登录密码',
    },
    role: {
      type: STRING(50),
      defaultValue: 'test',
      allowNull: false,
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
    createdAt: {
      type: DATE,
      comment: '数据创建时间',
    },
    updatedAt: {
      type: DATE,
      comment: '数据更新时间',
    },
  }, {
    alter: true,
    timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
    // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    freezeTableName: true,
  })
  AdminUser.associate = function() {
    this.hasMany(app.model.UserRole, { foreignKey: 'code', sourceKey: 'role', as: 'roles' })
  }
  return AdminUser
}
