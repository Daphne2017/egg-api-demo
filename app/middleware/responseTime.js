/**
 * 官网地址：https://eggjs.github.io/zh/guide/middleware.html
 * 应用全局挂在 config/config.default.js
    config.middleware = [ 'responseTime' ]
 * 指定挂在
    responseTime: { // config/config.default.js
    	match: '/api',
  	},
    app.router.get('/test', responseTime, app.controller.test);
*/

'use strict'
module.exports = (options, app) => {
  console.log(444444444, this)
  const that = this
  return async function responseTime(ctx, next) {
    app.logger.info('[egg-static] mount as static root applogger')
    console.log(555555, this)
    const start = Date.now()
    await next()
    const cost = Date.now() - start
    // `options.headerKey` 等价于 `app.config.responseTime.headerKey`
    // reportTime(cost);
    ctx.set(options.headerKey, `${cost}ms`)
    // reqLogger.info(`ip: ${ctx.request.ip}; ${user ? `userId: ${user.id}; userName: ${user.name};` : ''} query: ${JSON.stringify(ctx.request.query)}; data: ${JSON.stringify(ctx.request.body)};`)
  }
}
