'use strict'
const Service = require('egg').Service
class tagLibraryService extends Service {
  /**
   * 获取标签列表
   * @param { Object } body 查询条件数据对象
   * @param { Object } body.pageOb 分页对象
   * @param { Array } body.orderArr 列表排序数组
   * @param { String } body.tagName 标签
   * @return { Object } 标签数据
   */
  async getTagList({ pageOb, orderArr, tagName }) {
    const { Op } = this.app.Sequelize
    const { rows, count } = await this.ctx.model.GameTags.findAndCountAll({
      where: {
        tagName: {
          [Op.like]: `%${tagName || ''}%`,
        },
      },
      ...pageOb,
      order: orderArr,
    })

    return { list: rows, total: count }
  }
  /**
   * 编辑标签
   * @param { number } id 标签id
   * @param { Object } body 数据对象
   * @param { string } body.tagName 名称
   * @param { number } body.relatedGameCount 标签关联游戏数
   * @return { Promise } 返回更新的标签
   */
  async updateTag(id, body) {
    return await this.ctx.model.GameTags.update(
      {
        ...body,
      },
      { where: { id },
      },
    )
  }
  /**
   * 新增标签
   * @param { Object } body 名称
   * @param { String } body.tagName 名称
   * @param { number } body.relatedGameCount 名称
   * @return { Promise } 返回插入的标签
   */
  async addTag(body) {
    return await this.ctx.model.GameTags.create(body)
  }
  /**
   * 获取标签关联的游戏
   * @param { number } tagId 标签id
   *
   */
  async getRelatedGamesByTagId(tagId) {
    return await this.ctx.model.GameGameTag.findAll({
      where: { tagId },
      distinct: true,
      include: [
        {
          model: this.app.model.GameGames,
          as: 'gameInfo',
          attributes: [ 'gameName' ],
        },
      ],
      order: [[ 'sort', 'ASC' ], [ 'gameId', 'DESC' ]],
    })
  }
}

module.exports = tagLibraryService
