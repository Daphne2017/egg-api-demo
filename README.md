# 简介
## Node后台服务端
- 技术栈：Nodejs+Eggjs+Mysql+Redis
- 数据库导入[egg_dev.sql](./egg_dev.sql)文件
- 接口文档都在[egg-api.postman_collection.json](./egg-api.postman_collection.json)文件，导入到postman即可
- 管理员用户账号密码：admin/123456
- 其他配置参考eggjs文档[https://www.eggjs.org/zh-CN/core](https://www.eggjs.org/zh-CN/core)
## 关于启动项目

本机安装好 MySQL，并启动本地MySQL，数据库可视化工具推荐使用 dataGrip
数据库名：egg_dev，端口号3306，账号密码：root/123456
```bash
install mysql
services start mysql
// 或者
mysqld

```
安装redis，因为项目使用了redis，所以需要安装
```bash
brew install redis
redis-server
```
安装依赖
```bash
git pull origin xxx
npm install
npx sequelize db:migrate // 执行数据库Migrate，此步骤会在数据库中自动创建表
npm run dev
open http://localhost:7001/
```

## 关于数据库
- 数据库 ORM 框架，使用 [Sequelize](https://eggjs.org/zh-cn/tutorials/sequelize.html)；
- 数据库表的维护，使用 [Migration](https://eggjs.org/zh-cn/tutorials/sequelize.html) 管理；
- 新增数据表、数据表结构变更，官网建议使用 Migration 的方式进行，方便进行数据表结构的版本控制；（[sequelize 数据库迁移命令 migrations](https://link.zhihu.com/?target=https%3A//blog.tcs-y.com/2020/05/14/sequelize-migrations/)）
## 关于分层架构
### 请求流向
Router -> Controller -> Service -> Model

### Router
[路由](https://eggjs.org/zh-cn/basics/router.html)。可以简单理解为，面向用户的入口，系统提供的接口路由，都在这里定义。

### Controller
[控制器](https://eggjs.org/zh-cn/basics/controller.html)。和路由层直接交互，负责接受路由信息，解析用户的输入，调用相关的 Service，并把结果返回给用户。

### Service
[服务](https://eggjs.org/zh-cn/basics/service.html)。直接和 Model 层，或者第三方服务交互，或处理复杂的业务逻辑。

### Model
[持久层](https://eggjs.org/zh-cn/tutorials/sequelize.html)。定义数据库表的映射，提供数据库操作框架，为 Service 服务。

## 如何开发一个接口？

### 1. 数据表设计
- 根据业务需要，设计相关字段；

### 2. 建表 / 生成 Migration 种子文件
-   表设计好之后，需要生成 Migration 种子文件，定义数据表的升级&降级操作逻辑。生成种子文件的命令：
```bash
npx sequelize migration:generate --name=xxx-xxx
```
### 3. 执行 Migration 种子文件
生成好种子文件后，需要执行种子文件，进行建表。命令：
```bash
npx sequelize db:migrate
```
### 4. 定义 Model
根据已经确定的表结构，在 Model 目录下，新建 Model 文件，用表名的驼峰写法进行命名。

### 5. 编写 Service
分析业务需求，编写相关 Model 的增删改查服务逻辑，或其他需要的服务，供 Controller 调用。

### 6. 编写 Controller
编写相关 Controller ，接收请求参数，处理请求逻辑，并返回结果给用户。

### 7. 添加 Router
定义接口路由，调用相关 Controller。

# 参考资料

- Egg.js [官方指南](https://eggjs.org/zh-cn/intro/)；
- [sequelize英文文档](https://sequelize.org/)
- [sequelize中文文档](https://www.sequelize.com.cn/)
- **[Sequelize ORM v6 中文文档](https://www.bookstack.cn/read/sequelize-orm-v6-zh/e6d4ca7634926bb3.md)**
- https://github.com/demopark/sequelize-docs-Zh-CN
- ****[基于Egg框架应用Sequelize操作MySQL总结](https://zhuanlan.zhihu.com/p/361698483)****