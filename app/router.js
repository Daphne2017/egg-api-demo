'use strict'

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {

  app.router.get('/', app.controller.home.index)

  // 用户鉴权
  require('./router/auth')(app)
  // 用户信息
  require('./router/adminManage')(app)
  // 标签管理
  require('./router/tagManage/index')(app)
  // 游戏管理
  require('./router/gameManage/index')(app)
  require('./router/roleManage/index')(app)
}
