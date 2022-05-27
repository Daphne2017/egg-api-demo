'use strict'

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const {
    middleware,
    router,
    controller: {
      tagManage: {
        tags,
      },
    },
  } = app
  // const subRouter = router.namespace('/tagManagement')
  // const responseTime = middleware.responseTime({ headerKey: 'X-Time' }, app)
  /** 标签库*/
  router.get('/tagManagement/list', tags.getTagList) // 获取标签库
  router.post('/tagManagement/add', tags.addTag) // 新增标签库
  router.put('/tagManagement/edit/:id', tags.eidtTag) // 编辑
  router.get('/tagManagement/getRelatedGameByTagId/:tagId', tags.getRelatedGamesByTagId) // 通过tagId获取关联游戏


}
