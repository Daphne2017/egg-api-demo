-- MySQL dump 10.13  Distrib 8.0.28, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: egg_dev
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_menus`
--

DROP TABLE IF EXISTS `admin_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_menus` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(100) NOT NULL COMMENT '菜单名称',
  `menu_url` varchar(100) NOT NULL COMMENT '菜单URL',
  `menu_code` varchar(100) NOT NULL COMMENT '唯一标识，用于权限接口返回给前端',
  `menu_parent` int DEFAULT '0' COMMENT '菜单上级的id, 没有上级则为0',
  `menu_order` int NOT NULL DEFAULT '1' COMMENT '菜单排序',
  `is_visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT '该菜单是否隐藏, 1: 显示, 0: 隐藏',
  `status` int NOT NULL DEFAULT '1' COMMENT '菜单状态，1: 正常, 0: 失效',
  `created_at` datetime NOT NULL COMMENT '数据创建时间',
  `updated_at` datetime NOT NULL COMMENT '数据更新时间',
  PRIMARY KEY (`menu_id`),
  UNIQUE KEY `menu_code` (`menu_code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='菜单列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_menus`
--

LOCK TABLES `admin_menus` WRITE;
/*!40000 ALTER TABLE `admin_menus` DISABLE KEYS */;
INSERT INTO `admin_menus` VALUES (1,'首页','/dashboard','dashboard',0,1,1,1,'2022-05-15 17:26:39','2022-05-15 23:53:00'),(2,'游戏管理','/gameManage','gameManage',0,1,1,1,'2022-05-15 17:29:11','2022-05-15 17:29:11'),(3,'管理员功能','/manage','manage',0,1,1,1,'2022-05-15 17:30:14','2022-05-15 17:30:14'),(4,'账户管理','/manage/accountManage','accountManage',3,1,1,1,'2022-05-15 17:31:33','2022-05-15 17:31:33'),(5,'菜单管理','/manage/menuManage','menuManage',3,1,1,1,'2022-05-15 17:32:06','2022-05-15 17:32:06'),(6,'标签管理','/tagManage','tagManage',0,1,1,1,'2022-05-15 17:39:03','2022-05-15 17:39:03'),(7,'抽奖管理','/lottery','lottery',0,1,1,0,'2022-05-22 15:07:12','2022-05-22 16:03:51'),(8,'抽奖','/test','test',3,1,1,0,'2022-05-22 15:56:32','2022-05-22 16:04:51');
/*!40000 ALTER TABLE `admin_menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_privileges`
--

DROP TABLE IF EXISTS `admin_privileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_privileges` (
  `privilege_id` int NOT NULL AUTO_INCREMENT,
  `privilege_master` varchar(100) NOT NULL COMMENT '用户或角色..., user/role...',
  `privilege_master_value` int NOT NULL COMMENT '用户或角色对应的ID',
  `privilege_access` varchar(100) NOT NULL COMMENT '菜单或按钮..., menu/button...',
  `privilege_access_value` int NOT NULL COMMENT '菜单或按钮对应的ID',
  `privilege_operation` enum('enabled','disabled') NOT NULL DEFAULT 'disabled' COMMENT '权限启用, enabled: 启用, disabled: 禁用',
  `created_at` datetime NOT NULL COMMENT '数据创建时间',
  `updated_at` datetime NOT NULL COMMENT '数据更新时间',
  PRIMARY KEY (`privilege_id`),
  UNIQUE KEY `one_record` (`privilege_master`,`privilege_master_value`,`privilege_access`,`privilege_access_value`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='权限对照表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_privileges`
--

LOCK TABLES `admin_privileges` WRITE;
/*!40000 ALTER TABLE `admin_privileges` DISABLE KEYS */;
INSERT INTO `admin_privileges` VALUES (1,'user',3,'menu',1,'enabled','2022-05-22 17:26:29','2022-05-22 17:26:29'),(2,'user',3,'menu',2,'enabled','2022-05-22 17:26:29','2022-05-22 17:26:29'),(3,'user',3,'menu',5,'disabled','2022-05-22 17:26:29','2022-05-22 17:26:29'),(4,'user',3,'menu',3,'disabled','2022-05-22 17:26:29','2022-05-22 17:26:29'),(5,'user',3,'menu',6,'disabled','2022-05-22 17:26:29','2022-05-22 17:26:29'),(6,'user',3,'menu',4,'disabled','2022-05-22 17:26:29','2022-05-22 17:26:29'),(7,'user',2,'menu',1,'enabled','2022-05-22 17:43:23','2022-05-22 18:03:28'),(8,'user',2,'menu',2,'disabled','2022-05-22 17:43:23','2022-05-22 18:03:28'),(9,'user',2,'menu',3,'disabled','2022-05-22 17:43:23','2022-05-22 18:03:28'),(10,'user',2,'menu',5,'disabled','2022-05-22 17:43:23','2022-05-22 18:03:28'),(11,'user',2,'menu',6,'enabled','2022-05-22 17:43:23','2022-05-22 18:03:28'),(12,'user',2,'menu',4,'disabled','2022-05-22 17:43:23','2022-05-22 18:03:28');
/*!40000 ALTER TABLE `admin_privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL COMMENT '用户登录名',
  `password` varchar(255) DEFAULT NULL COMMENT '用户登录密码',
  `is_admin` int NOT NULL DEFAULT '0' COMMENT '是否为管理员',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '账号状态。禁用：0，正常：1',
  `created_at` datetime NOT NULL COMMENT '数据创建时间',
  `updated_at` datetime NOT NULL COMMENT '数据更新时间',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱。',
  `mobile` varchar(255) DEFAULT NULL COMMENT '手机号。',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'admin','65767d40330cf7bc827560c3589e3f4a3e1b4737',1,1,'2022-05-27 10:20:38','2022-05-27 10:20:38',NULL,NULL),(2,'吴彦祖','d4dca5e226cae109b03ffe1c708408b9d3330dc5',0,1,'2022-05-27 10:21:14','2022-05-27 10:21:14',NULL,NULL);
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_game_tag`
--

DROP TABLE IF EXISTS `game_game_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_game_tag` (
  `game_id` int unsigned NOT NULL COMMENT '游戏id',
  `tag_id` int unsigned NOT NULL COMMENT '标签id',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`game_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_game_tag`
--

LOCK TABLES `game_game_tag` WRITE;
/*!40000 ALTER TABLE `game_game_tag` DISABLE KEYS */;
INSERT INTO `game_game_tag` VALUES (1,1,0),(1,2,0),(1,3,0);
/*!40000 ALTER TABLE `game_game_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_games`
--

DROP TABLE IF EXISTS `game_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_games` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `game_name` varchar(255) NOT NULL DEFAULT '' COMMENT '游戏名称',
  `simple_desc` varchar(255) NOT NULL DEFAULT '' COMMENT '一句话描述',
  `put_status` int unsigned NOT NULL DEFAULT '0' COMMENT '上架状态',
  `created_at` datetime NOT NULL COMMENT '数据创建时间',
  `updated_at` datetime NOT NULL COMMENT '数据更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='游戏列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_games`
--

LOCK TABLES `game_games` WRITE;
/*!40000 ALTER TABLE `game_games` DISABLE KEYS */;
INSERT INTO `game_games` VALUES (1,'植物大战僵尸','幽默',1,'2022-05-15 23:42:37','2022-05-15 23:42:37');
/*!40000 ALTER TABLE `game_games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_tags`
--

DROP TABLE IF EXISTS `game_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_tags` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `tag_name` varchar(255) NOT NULL DEFAULT '' COMMENT '标签名称',
  `related_game_count` int NOT NULL DEFAULT '0' COMMENT '关联游戏数',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='游戏列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_tags`
--

LOCK TABLES `game_tags` WRITE;
/*!40000 ALTER TABLE `game_tags` DISABLE KEYS */;
INSERT INTO `game_tags` VALUES (1,'幽默',1,'2022-05-15 23:40:48','2022-05-15 23:40:48'),(2,'恐怖',1,'2022-05-15 23:40:58','2022-05-15 23:40:58'),(3,'益智',1,'2022-05-15 23:42:10','2022-05-15 23:42:10');
/*!40000 ALTER TABLE `game_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20220214083537-init-admin_users.js'),('20220214100602-init-game_tags.js'),('20220426042214-init-admin_users1.js'),('20220515080800-init-admin_privileges.js'),('20220515080949-init-admin_menus.js'),('20220515092051-init-admin_privileges.js'),('20220515092205-init-admin_menus.js'),('20220515151816-init-admin_users.js'),('20220515152411-init-game_games.js'),('20220515152642-init-game_tags.js'),('20220515153106-init-game_game_tag.js'),('20220515153928-init-game_game_tag.js'),('20220515162150-init-admin_users.js'),('20220522081531-init-admin_privileges.js'),('20220522092553-init-admin_privileges.js'),('20220525024858-init-admin_users.js'),('20220525025106-updata-admin_users.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `is_deleted` int unsigned DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'系统管理员','admin',0,NULL,NULL),(2,'测试','test',0,NULL,NULL),(3,'编辑qqq','editor',0,'2022-04-19 21:35:46',NULL),(4,'fdgfdf','gfgdfg',0,'2022-04-19 21:39:55','2022-04-19 21:39:05'),(5,'fgfg','rtertrt',0,'2022-04-19 21:40:00','2022-04-19 21:40:00'),(6,'y7567567','67757',0,'2022-04-19 21:41:16','2022-04-19 21:41:16');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-27 10:26:13
