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

 Date: 31/10/2024 10:17:26
*/


-- ----------------------------
-- Table structure for Role
-- ----------------------------
DROP TABLE IF EXISTS "public"."Role";
CREATE TABLE "public"."Role" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "code" text COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "sort" int4 NOT NULL,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of Role
-- ----------------------------
INSERT INTO "public"."Role" VALUES ('2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '系统管理员', 'System Admin', '只拥有系统管理权限', 1, '2024-08-23 02:17:36.278', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Role" VALUES ('e02b5eec-d7b9-4ff8-862c-0151448a390c', '行政管理员', 'Administrative Admin', '只拥有智能行政模块权限', 1, '2024-09-02 09:49:18.444', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Role" VALUES ('6db049fe-c944-4680-b6dc-f9f40d6ad018', '超级管理员', 'Super Admin', '拥有系统全部权限', 88, '2024-08-22 07:03:04.323', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Role" VALUES ('697da404-a1e6-4e8d-996d-7f488cedc250', '查看管理员', 'View Admin', '仅支持菜单查看，不支持新增、编辑、删除等操作！', 1, '2024-08-23 05:55:44.978', '2024-09-26 12:11:17.733');

-- ----------------------------
-- Indexes structure for table Role
-- ----------------------------
CREATE UNIQUE INDEX "Role_code_key" ON "public"."Role" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "Role_name_key" ON "public"."Role" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Role
-- ----------------------------
ALTER TABLE "public"."Role" ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");
