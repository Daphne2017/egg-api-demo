'use strict'

const baseController = require('../baseController')

class tagLibraryController extends baseController {
  /**
   * @param { Boolean } isExport 当前是否导出
   * @return {Promise} 接口返回的Promise对象
   */
  async tagList(isExport) {
    const { limit, offset, order = {}, tagName } = this.paginationDeal(this.ctx.request.query)
    const { col, sort } = this.app.utils.index.returnObject(order)
    const orderArr = [[ col || 'id', sort || 'DESC' ]]
    const pageOb = !isExport ? { limit, offset } : {}
    const { list, total } = await this.service.tagManage.tagLibrary.getTagList({ pageOb, orderArr, tagName })
    return { data: { list, total } }
  }
  /**
   * 获取标签列表
   */
  async getTagList() {
    const res = await this.tagList(false)
    this.success(res)
  }
  /**
   * 更新标签
   * @param {number} id 标签id
   */
  async updateTag(id = '') {
    const { ctx, service } = this
    ctx.validate({ // 校验参数
      tagName: { require: true, type: 'string' },
    })
    const { tagName, relatedGameCount } = ctx.request.body
    const body = { tagName, relatedGameCount }
    try {
      const res = !id ? await service.tagManage.tagLibrary.addTag(body)
        : await service.tagManage.tagLibrary.updateTag(id, body) // 更新标签关联游戏数字段值
      this.success({ data: res })
    } catch (error) {
      ctx.onerror(error)
    }
  }
  /**
   * 新增标签
   */
  async addTag() {
    await this.updateTag()
  }
  /**
   * 编辑标签
   */
  async eidtTag() {
    const { ctx } = this
    this.ctx.validate({
      id: { require: true, type: 'string' },
    }, this.ctx.params)
    const id = Number(ctx.params.id)
    await this.updateTag(id)
  }
  /**
   * 通过tagId获取关联游戏
   */
  async getRelatedGamesByTagId() {
    const tagId = Number(this.ctx.params.tagId)
    const list = await this.service.tagManage.tagLibrary.getRelatedGamesByTagId(tagId)
    const listData = list.map(node => {
      const itemList = node.toJSON()
      const { gameData, ...rest } = itemList
      const data = this.app.utils.index.returnObject(gameData)
      return { ...data, ...rest }
    })
    this.success({ data: listData })
  }
}

module.exports = tagLibraryController
