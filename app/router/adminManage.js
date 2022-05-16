'use strict'

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = ({
  router,
  controller: {
    adminManage: {
      adminUser,
      adminPrivilege,
      adminMenu,
    },
  },
}) => {
  router.get('/admin_user/info', adminUser.getUserInfo) // 获取用户信息
  router.post('/admin_user/modify-role', adminUser.modifyRole) // 修改用户角色
  router.get('/admin_user/list', adminUser.getUserList) // 获取所有的用户

  // 用户权限管理
  router.get('/admin_authority/:id/menu', adminPrivilege.getAuthDetail) // 用户权限明细
  router.put('/admin_authority/update/:id', adminPrivilege.updateUserAuth) // 更新用户权限

  // 菜单管理
  router.get('/admin_menu/list', adminMenu.getMenu) // 菜单列表
  router.post('/admin_menu/add', adminMenu.addMenu) // 新增菜单
  router.post('/admin_menu/update', adminMenu.updateMenu) // 更新菜单
  router.post('/admin_menu/delete', adminMenu.deleteMenu) // 删除菜单
}
