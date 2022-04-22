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
        tagLibrary,
      },
    },
  } = app
  // const responseTime = middleware.responseTime({ headerKey: 'X-Time' }, app)
  /** 标签库*/
  router.get('/tagManagement/tagLibraryList', tagLibrary.getTagList) // 获取标签库
  router.post('/tagManagement/tagLibraryList/add', tagLibrary.addTag) // 新增标签库
  router.put('/tagManagement/tagLibraryList/edit/:id', tagLibrary.eidtTag) // 编辑
  router.get('/tagManagement/tagLibraryList/getRelatedGameByTagId/:tagId', tagLibrary.getRelatedGamesByTagId) // 通过tagId获取关联游戏


}