/*
 Navicat Premium Dump SQL

 Source Server         : postgreSQL
 Source Server Type    : PostgreSQL
 Source Server Version : 160003 (160003)
 Source Host           : localhost:5432
 Source Catalog        : vue3-admin
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160003 (160003)
 File Encoding         : 65001

 Date: 31/10/2024 10:17:22
*/


-- ----------------------------
-- Table structure for Post
-- ----------------------------
DROP TABLE IF EXISTS "public"."Post";
CREATE TABLE "public"."Post" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "orgId" text COLLATE "pg_catalog"."default" NOT NULL,
  "parentId" text COLLATE "pg_catalog"."default",
  "sort" int4 NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of Post
-- ----------------------------
INSERT INTO "public"."Post" VALUES ('1d83e15c-3dba-4cbf-bd23-e1f37b3ab834', '程序员', 'f45cd48b-e703-49db-91be-ae7f594e73e0', NULL, 1, '程序员（英文Programmer）是从事程序开发、程序维护的基层工作人员。一般将程序员分为程序设计人员和程序编码人员，但两者的界限并不非常清楚。随着互联网的不断普及，网络上把男程序员称作“程序猿”。或将男女程序员统称为“工程师（攻城狮）”。', '2024-07-17 00:39:54.384', '2024-07-17 01:36:06.188');
INSERT INTO "public"."Post" VALUES ('9af54e7f-b31d-4306-8fb3-ada93326f63b', 'UI 设计师', '0da77343-0747-42fe-beff-25ee98bc7a88', NULL, 1, '', '2024-07-17 07:27:22.185', '2024-07-17 07:27:22.185');
INSERT INTO "public"."Post" VALUES ('e632b172-3138-44ef-b246-912ff18d6a29', '初级设计师', 'b924df00-77ed-49b7-a8b4-181f0b259c18', '9af54e7f-b31d-4306-8fb3-ada93326f63b', 1, '', '2024-07-17 07:27:50.533', '2024-07-17 07:27:50.533');
INSERT INTO "public"."Post" VALUES ('f401a468-5a9f-4430-85a2-d31177df034a', '中级设计师', 'b924df00-77ed-49b7-a8b4-181f0b259c18', '9af54e7f-b31d-4306-8fb3-ada93326f63b', 1, '', '2024-07-17 07:28:13.934', '2024-07-17 07:28:13.934');
INSERT INTO "public"."Post" VALUES ('86d77183-6574-4e0b-91ae-1619c856d31a', '高级设计师', 'b924df00-77ed-49b7-a8b4-181f0b259c18', '9af54e7f-b31d-4306-8fb3-ada93326f63b', 1, '', '2024-07-17 07:28:33.81', '2024-07-17 07:28:33.81');
INSERT INTO "public"."Post" VALUES ('34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb', '前端工程师', '9382c3d0-42ef-496b-961f-f0bcee6edfbf', '1d83e15c-3dba-4cbf-bd23-e1f37b3ab834', 1, '前端工程师是互联网时代软件产品研发中不可缺少的一种专业研发角色。从狭义上讲，前端工程师使用 HTML、CSS、JavaScript 等专业技能和工具将产品UI设计稿实现成网站产品，涵盖用户PC端、移动端网页，处理视觉和交互问题。从广义上来讲，所有用户终端产品与视觉和交互有关的部分，都是前端工程师的专业领域。', '2024-07-17 01:02:27.831', '2024-07-17 01:02:27.831');
INSERT INTO "public"."Post" VALUES ('f6c90653-8110-4585-aead-20d526dc33f7', 'Java工程师', '9382c3d0-42ef-496b-961f-f0bcee6edfbf', '1d83e15c-3dba-4cbf-bd23-e1f37b3ab834', 1, '负责项目相关开发工作,包括参与系统需求分析、研发设计', '2024-07-17 01:55:04.562', '2024-07-17 01:55:04.562');
INSERT INTO "public"."Post" VALUES ('155b3d9d-40d3-4db3-9c40-1ef2aac15547', '市场运营', '2eaab2c3-4872-49af-b647-78ba9c120df8', NULL, 1, '写文案;活动策划或活动执行;用户分析;市场合作;数据分析;地推;充当客服;部门对接', '2024-09-02 09:51:15.557', '2024-09-02 09:51:15.557');
INSERT INTO "public"."Post" VALUES ('edbe1b2b-dc29-4ca1-a6ad-4f6707f2d2be', '高级运营', '8233a4de-02f8-49d8-85e8-5a92fd8552e0', '155b3d9d-40d3-4db3-9c40-1ef2aac15547', 1, '', '2024-09-02 09:51:28.671', '2024-09-02 09:51:28.671');
INSERT INTO "public"."Post" VALUES ('49ad32a8-e431-4967-8a44-82413f892f5e', '中级运营', '038d606e-304d-4cff-bb09-70f5be4a8f19', '155b3d9d-40d3-4db3-9c40-1ef2aac15547', 1, '', '2024-09-02 09:51:52.612', '2024-09-02 09:51:52.612');
INSERT INTO "public"."Post" VALUES ('1ea27ba8-aac7-43ea-9934-a5a53429c204', '实习生', 'f45cd48b-e703-49db-91be-ae7f594e73e0', '155b3d9d-40d3-4db3-9c40-1ef2aac15547', 1, '', '2024-09-02 09:52:03.333', '2024-09-02 09:52:03.333');
INSERT INTO "public"."Post" VALUES ('e9441c59-336b-43db-9465-9c0ecaec1d76', 'C++ 开发', '7657fca9-acb5-42a9-ab6a-782d34ab9b62', '1d83e15c-3dba-4cbf-bd23-e1f37b3ab834', 1, '', '2024-09-02 09:52:21.722', '2024-09-02 09:52:21.722');
INSERT INTO "public"."Post" VALUES ('f5cc1862-30f2-4ae7-9e9a-f158c6a89275', '董事会', 'f45cd48b-e703-49db-91be-ae7f594e73e0', NULL, 1, '', '2024-09-04 03:02:13.986', '2024-09-04 03:02:13.986');
INSERT INTO "public"."Post" VALUES ('825e7fd6-74db-495d-9ab9-9fa18c4c0bf3', '主席', 'f45cd48b-e703-49db-91be-ae7f594e73e0', 'f5cc1862-30f2-4ae7-9e9a-f158c6a89275', 1, '', '2024-09-04 03:02:31.948', '2024-09-04 03:02:31.948');
INSERT INTO "public"."Post" VALUES ('42fa3681-de70-4d5f-95b8-db5a66101ecc', 'CEO', '460e32b7-6c69-47b2-ab01-30268952f52e', 'f5cc1862-30f2-4ae7-9e9a-f158c6a89275', 1, '', '2024-09-04 03:02:53.456', '2024-09-04 03:02:53.456');
INSERT INTO "public"."Post" VALUES ('868c4fcf-42b0-4c59-bb98-e97d6de6f521', 'CFO', '38c80d63-c18e-4dc4-9b36-f962146af156', 'f5cc1862-30f2-4ae7-9e9a-f158c6a89275', 1, '', '2024-09-04 03:03:18.153', '2024-09-04 03:03:18.153');

-- ----------------------------
-- Indexes structure for table Post
-- ----------------------------
CREATE UNIQUE INDEX "Post_name_key" ON "public"."Post" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Post
-- ----------------------------
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table Post
-- ----------------------------
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "public"."Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
