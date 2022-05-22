'use strict'

const Service = require('egg').Service

class adminPrivilegeService extends Service {
  /**
   * 获取用户的菜单权限code
   * @param { Number } userId 用户id
   * @return { Array } 用户权限数组
   */
  async getAuthCode(userId) {
    const data = await this.ctx.model.AdminPrivilege.findAll({
      attributes: [],
      include: [{
        model: this.app.model.AdminMenu,
        attributes: [ 'menu_code' ],
        where: { is_visible: true },
      }],
      where: {
        privilege_master_value: userId, // 用户ID
        privilege_operation: 'enabled',
      },
    })
    return data.map(item => item.admin_menu.menu_code)
  }

  /**
   * 查询用户拥有的权限记录
   * @param { Number } privilege_master_value 用户id
   * @return { Promise<Array> } 返回用户权限记录的Model对象
   */
  async getUserPrivilege(privilege_master_value) {
    return await this.ctx.model.AdminPrivilege.findAll({
      attributes: [ 'privilege_access_value', 'privilege_operation' ],
      where: {
        privilege_master_value,
      },
    })
  }

  /**
   * 更新用户指定菜单的权限
   * @param { Object } Object 更新的数据
   * @param { String } Object.privilege_operation 是否启用权限
   * @param { Number } Object.privilege_access_value 菜单id
   * @param { Number } Object.privilege_master_value 用户id
   * @return { Promise } 更新结果
   */
  async updeteUserAuth({ privilege_operation, privilege_access_value, privilege_master_value }) {
    return await this.ctx.model.AdminPrivilege.upsert(
      {
        privilege_access: 'menu',
        privilege_master: 'user',
        privilege_access_value,
        privilege_master_value,
        privilege_operation,
      }, {
        where: { privilege_access_value, privilege_master_value },
      }
    )
  }

}

module.exports = adminPrivilegeService
