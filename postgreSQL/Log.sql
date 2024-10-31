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

 Date: 31/10/2024 10:16:54
*/


-- ----------------------------
-- Table structure for Log
-- ----------------------------
DROP TABLE IF EXISTS "public"."Log";
CREATE TABLE "public"."Log" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "userId" text COLLATE "pg_catalog"."default" NOT NULL,
  "ip" text COLLATE "pg_catalog"."default" NOT NULL,
  "action" text COLLATE "pg_catalog"."default" NOT NULL,
  "method" "public"."Method" NOT NULL,
  "params" jsonb NOT NULL,
  "os" text COLLATE "pg_catalog"."default" NOT NULL,
  "browser" text COLLATE "pg_catalog"."default" NOT NULL,
  "province" text COLLATE "pg_catalog"."default",
  "city" text COLLATE "pg_catalog"."default",
  "adcode" text COLLATE "pg_catalog"."default",
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of Log
-- ----------------------------
INSERT INTO "public"."Log" VALUES ('6725fc4f-bfb1-4323-8a16-133ed81d127f', 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', '::1', '/auth/login', 'POST', '{"password": "abc123456", "userName": "Admin", "captchaCode": "9"}', 'Windows 10', 'Chrome', NULL, NULL, NULL, '2024-10-31 02:12:24.756');
INSERT INTO "public"."Log" VALUES ('fd6d4070-a1a8-4fd9-bd37-e0d5ddd5f55f', 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', '::1', '/auth/juejin', 'POST', '{"cursor": "0", "user_id": "1917147257534279", "sort_type": 2}', 'Windows 10', 'Chrome', NULL, NULL, NULL, '2024-10-31 02:12:26.049');
INSERT INTO "public"."Log" VALUES ('c957011b-4984-4448-8a71-9ba2f440a512', 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', '::1', '/system/internalization', 'POST', '{"enUS": "Home city", "jaJP": "所在する都市です", "name": "city", "zhCN": "所在城市", "zhTW": "所在城市", "parentId": "3f05721e-70cd-4f93-bc94-f6f2951d935f"}', 'Windows 10', 'Chrome', NULL, NULL, NULL, '2024-10-31 02:13:37.335');

-- ----------------------------
-- Primary Key structure for table Log
-- ----------------------------
ALTER TABLE "public"."Log" ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table Log
-- ----------------------------
ALTER TABLE "public"."Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
