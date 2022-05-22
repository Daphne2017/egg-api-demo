'use strict'

const baseController = require('../baseController')

class adminPrivilegeController extends baseController {

  /**
   * 获取用户权限详细数据
   */
  async getAuthDetail() {
    const { ctx, app } = this
    const menuList = await this.service.adminManage.adminMenu.getMenu()
    const userPrivilegeList = await this.service.adminManage.adminPrivilege.getUserPrivilege(parseInt(ctx.params.id))
    console.log(22222222222, userPrivilegeList.map(i => i.toJSON()))
    const data = menuList.map(node => {
      const item = node.toJSON()
      const isEnabled = userPrivilegeList.find(i => item.menu_id === i.privilege_access_value)
      item.privilege_operation = isEnabled ? isEnabled.privilege_operation : item.menu_code === 'dashboard' ? 'enabled' : 'disabled' // dashboard的首页默认用户都拥有权限
      return item
    })
    this.success({ old: data, data: app.utils.index.toTreeJson({ data, prop: 'menu_id', parentProp: 'menu_parent' }) })
  }

  /**
   * 更新用户权限数据
   */
  async updateUserAuth() {
    const { ctx } = this
    if (!ctx.request.body.data.length) {
      this.success()
      return
    }
    if (!ctx.params.id) {
      ctx.throw(400, '缺少用户id', { code: 400001 })
    }
    const data = await Promise.all(
      ctx.request.body.data.map(item => {
        const searchData = {
          privilege_access: 'menu',
          privilege_access_value: item.menu_id,
          privilege_master: 'user',
          privilege_master_value: ctx.params.id, // 用户的id号
          privilege_operation: item.privilege_operation, // 用户是否可可见
        }
        return this.service.adminManage.adminPrivilege.updeteUserAuth(searchData)
      })
    )
    this.success({ data })
  }
}

module.exports = adminPrivilegeController
