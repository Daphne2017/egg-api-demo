'use strict'

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const {
    middleware,
    router,
    controller: {
      gameManage: {
        games,
      },
    },
  } = app
  /** 游戏*/
  // const subRouter = router.namespace('/gameManage')
  const responseTime = middleware.responseTime({ headerKey: 'X-Router-Time' }, app)
  router.post('/gameManage/add', games.addGameSubmit) // 新增游戏
  router.put('/gameManage/edit/:id', games.editGameSubmit) // 编辑游戏
  router.get('/gameManage/list', responseTime, games.getGamesList) // 游戏库页面
  router.get('/gameManage/all', responseTime, games.getAllGames)
  router.patch('/gameManage/updatePutStatus/:id', games.updatePutStatus) // 游戏上下架
  router.get('/gameManage/getRelatedTagsBygameId/:gameId', games.getRelatedTagsBygameId) // 通过gameId获取关联的标签
}
