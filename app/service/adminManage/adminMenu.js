'use strict'

const Service = require('egg').Service

class adminMenuService extends Service {

  /**
   * 新增一个菜单
   * @param { Object } body 菜单数据对象
   * @return { Promise } 数据插入结果
   */
  async createMenu(body) {
    return this.ctx.model.AdminMenu.create(body)
  }

  /**
   * 获取全部菜单（状态为1，menu_order降序）
   * @param { Object } param 查询条件
   * @return { Promise<Array> } 菜单数据
   */
  async getMenu(param = {}) {
    return await this.ctx.model.AdminMenu.findAll({
      attributes: { exclude: [ 'status', 'createdAt', 'updatedAt' ] },
      where: { status: 1, ...param },
      order: [[ 'menu_order', 'DESC' ], [ 'menu_order', 'DESC' ], [ 'createdAt', 'ASC' ]],
    })
  }

  /**
   * 更新一个菜单数据
   * @param { Object } Object 菜单数据
   * @param { Number } Object.menu_id 菜单id
   * @return { Promise } 数据更新结果
   */
  async updateMenu({ menu_id, ...data }) {
    return await this.ctx.model.AdminMenu.update({ ...data }, {
      where: {
        menu_id,
      },
    })
  }

  /**
   * 更新一个菜单的状态 为 失效
   * @param { Number } menu_id 菜单id
   * @return { Promise } 数据更新结果
   */
  async deleteMenu(menu_id) {
    return await this.ctx.model.AdminMenu.update({ status: 0 }, {
      where: {
        menu_id,
      },
    })
  }

  /**
   * 菜单关联用户的权限
   * @param { Number } privilege_master_value 用户id
   * @return { Promise<Array> } 返回菜单匹配用户id的Model对象
   */
  async getAuthMenu(privilege_master_value) {
    return await this.ctx.model.AdminMenu.findAll({
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      where: { status: 1, is_visible: true },
      order: [[ 'menu_parent', 'ASC' ], [ 'menu_order', 'DESC' ], [ 'createdAt', 'ASC' ]],
      include: [{
        model: this.app.model.AdminPrivilege,
        attributes: [ 'privilege_id', 'privilege_operation' ],
        where: { privilege_master_value },
      }],
    })
  }

}

module.exports = adminMenuService
