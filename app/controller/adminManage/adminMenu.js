'use strict'

const baseController = require('../baseController')

class adminMenuController extends baseController {

  /**
   * 新增一个菜单权限
   */
  async addMenu() {
    const { ctx } = this
    ctx.validate({
      menu_parent: { type: 'number' },
      menu_name: { require: true, type: 'string' },
      menu_url: { require: true, type: 'string' },
      menu_code: { require: true, type: 'string' },
      is_visible: { require: true, type: 'boolean' },
    })
    const data = await this.service.adminManage.adminMenu.createMenu(ctx.request.body)
    this.success({ data })
  }

  /**
   * 查询所有菜单权限
   */
  async getMenu() {
    const { app } = this
    const res = await this.service.adminManage.adminMenu.getMenu()
    const data = res.map(node => node.toJSON())
    const list = app.utils.index.toTreeJson({ data, prop: 'menu_id', parentProp: 'menu_parent' })
    this.success({ data: { list } })
  }

  /**
   * 更新菜单信息(批量)
   */
  async updateMenu() {
    const { ctx } = this
    ctx.validate({
      data: { require: true, type: 'array' },
    })
    const data = await Promise.all(
      ctx.request.body.data.map(item => {
        return this.service.adminManage.adminMenu.updateMenu(item)
      })
    )
    this.success({ data })
  }

  /**
   * 删除菜单(批量)
   */
  async deleteMenu() {
    const { ctx } = this
    ctx.validate({
      data: { require: true, type: 'array' },
    })
    const data = await Promise.all(
      ctx.request.body.data.map(item => {
        return this.service.adminManage.adminMenu.deleteMenu(item)
      })
    )
    this.success({ data })
  }

}

module.exports = adminMenuController
