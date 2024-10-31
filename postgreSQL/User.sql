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

 Date: 31/10/2024 10:17:30
*/


-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS "public"."User";
CREATE TABLE "public"."User" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "userName" text COLLATE "pg_catalog"."default" NOT NULL,
  "password" text COLLATE "pg_catalog"."default" NOT NULL,
  "cnName" text COLLATE "pg_catalog"."default" NOT NULL,
  "email" text COLLATE "pg_catalog"."default" NOT NULL,
  "phone" text COLLATE "pg_catalog"."default" NOT NULL,
  "avatar" text COLLATE "pg_catalog"."default" NOT NULL,
  "sex" "public"."Sex" NOT NULL DEFAULT 'FEMALE'::"Sex",
  "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE'::"Status",
  "sort" int4 NOT NULL,
  "token" text COLLATE "pg_catalog"."default",
  "tags" text[] COLLATE "pg_catalog"."default" DEFAULT ARRAY[]::text[],
  "city" text[] COLLATE "pg_catalog"."default" DEFAULT ARRAY[]::text[],
  "address" text COLLATE "pg_catalog"."default",
  "roleId" text COLLATE "pg_catalog"."default" NOT NULL,
  "orgId" text COLLATE "pg_catalog"."default" NOT NULL,
  "postId" text COLLATE "pg_catalog"."default" NOT NULL,
  "loginCount" int4 NOT NULL DEFAULT 0,
  "lastIp" text COLLATE "pg_catalog"."default",
  "lastLoginAt" timestamp(3),
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of User
-- ----------------------------
INSERT INTO "public"."User" VALUES ('b62c0c5a-ac9f-4d7d-863c-fbfa148bbc4c', 'liuyifei', '$2b$10$o1dlWm4dU8O9QxkYZ0ExfOckX9Ba9.plwRRIgkxIg.Lr3gQXwHeGa', '刘亦菲', 'me@liuyifei.com', '13888888888', 'http://localhost:3000/static/image/2024-08/f92269b2-77b7-48ef-83b9-e8bd4970c304.jpeg', 'FEMALE', 'ACTIVE', 1, NULL, '{女神,灵儿}', '{11,1101,110105}', '高档别墅', '697da404-a1e6-4e8d-996d-7f488cedc250', 'e5f4ae69-633b-48ff-8ef1-b92597f2a26c', '86d77183-6574-4e0b-91ae-1619c856d31a', 3, '::1', '2024-09-04 06:49:56.131', '2024-08-27 05:42:41.646', '2024-09-04 06:50:04.222');
INSERT INTO "public"."User" VALUES ('c698c8e8-3aa0-4dec-b1cd-7d37660d1519', 'wangsicong', '$2b$10$z2MAN9zPt5c6MrcCBh1GDuhKnRdBKjPFUtJOShxdNHBOXJmZBL3ca', '王思聪', 'wcs@wangda.com', '18888888881', 'http://localhost:3000/static/image/2024-09/2126ab07-c104-4fe3-a6c2-1c1d72223614.jpeg', 'MALE', 'ACTIVE', 1, NULL, '{富二代}', '{21,2102,210202}', '啊实打实的', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '40129577-049f-4f40-9e2e-2c1188e4695f', '1ea27ba8-aac7-43ea-9934-a5a53429c204', 3, '::1', '2024-09-04 06:24:05.714', '2024-09-04 03:31:05.622', '2024-09-04 06:25:45.499');
INSERT INTO "public"."User" VALUES ('ba54e74c-86cb-4bfa-a0bc-71813175de9e', 'mahuateng', '$2b$10$OyO/XuTr4mZt6KIHLPvnS.A62G7Swphk7l2o//H0rnPjqbvgKHbqq', '马化腾', 'pony@tencent.com', '18888888880', 'http://localhost:3000/static/image/2024-09/a370df3c-4d3d-4e2d-81ac-25790e2a1789.jpeg', 'MALE', 'ACTIVE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1haHVhdGVuZyIsInN1YiI6ImJhNTRlNzRjLTg2Y2ItNGJmYS1hMGJjLTcxODEzMTc1ZGU5ZSIsImlhdCI6MTcyNTQzMTIyOCwiZXhwIjoxNzI1NjkwNDI4fQ._okWes1SjxnUZJCsLxRwc9HjURyxqDRYCn-yJqhZaOE', '{腾讯掌门人}', '{44,4403,440305}', '粤海街道', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '32cab8f0-13df-4876-83c5-86089390dbb7', '42fa3681-de70-4d5f-95b8-db5a66101ecc', 1, '::1', '2024-09-04 06:27:08.208', '2024-09-04 03:28:58.81', '2024-09-04 06:27:08.21');
INSERT INTO "public"."User" VALUES ('ea35984a-34f6-4da3-9f50-314f4b719ea6', 'mayun', '$2b$10$uhBo0HEIikMH9dFSfuCGj.fHYCDz/e55tgR/7ALLCEL2w/uJTh7Py', '马云', 'mayun@alibaba.com', '18888888888', 'http://localhost:3000/static/image/2024-09/ac7b73c5-3c4e-41c4-94a8-21393e5682e4.jpeg', 'MALE', 'ACTIVE', 1, NULL, '{首富,男神}', '{33,3301,330110}', '阿里巴巴大厦', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'f45cd48b-e703-49db-91be-ae7f594e73e0', '825e7fd6-74db-495d-9ab9-9fa18c4c0bf3', 2, '::1', '2024-09-04 06:16:30.121', '2024-09-04 03:01:21.011', '2024-09-04 06:16:38.93');
INSERT INTO "public"."User" VALUES ('b485e3c1-0790-4007-adef-849537c291f5', 'leijun', '$2b$10$7Ywy/tKMzLmiWUEuXD4wG.Otq9VycEJcPtcGOEcKlt28jbo2k4.pO', '雷军', 'leijun@xiaomi.com', '18888888883', 'http://localhost:3000/static/image/2024-09/fcdab14e-29d4-43e3-8630-9cf064646f35.jpeg', 'MALE', 'ACTIVE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImxlaWp1biIsInN1YiI6ImI0ODVlM2MxLTA3OTAtNDAwNy1hZGVmLTg0OTUzN2MyOTFmNSIsImlhdCI6MTcyNTk1OTE0MiwiZXhwIjoxNzI2MjE4MzQyfQ.r8wqW1bGycJ2FrNdu8rdbOmsw6PWPkBkdexvpzPkH7w', '{"Are You OK",小米SU7}', '{11,1101,110105}', '小米总部', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '68c4ac85-3f4a-4ca0-9112-562e91a1d6a2', '42fa3681-de70-4d5f-95b8-db5a66101ecc', 5, '::1', '2024-09-10 09:05:42.137', '2024-09-04 05:44:44.16', '2024-09-10 09:05:42.138');
INSERT INTO "public"."User" VALUES ('1785737b-8daf-4bc1-ae49-8769c256c209', 'lizhien', '$2b$10$HZUnnFSlz5E3N.DkLBQWu.AeyAOTvAayS6C.6osxcCTjYSm6zPt.6', '李知恩', 'lizhien@me.com', '13800138000', 'http://localhost:3000/static/image/2024-07/6f6e22a3-1e6a-4aa3-bbe9-6b2b0e6ea5aa.jpeg', 'FEMALE', 'INACTIVE', 1, NULL, '{美女}', '{11,1101,110101}', '首尔区', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '2eaab2c3-4872-49af-b647-78ba9c120df8', 'f401a468-5a9f-4430-85a2-d31177df034a', 2, '::1', '2024-08-23 03:36:37.955', '2024-07-30 06:38:44.512', '2024-08-23 03:36:54.871');
INSERT INTO "public"."User" VALUES ('bf9c32dc-2363-4a31-9e7f-74544f7d04a4', 'zhangruonan', '$2b$10$LH1qhhLPxCIXMETxYqHDtek05qUAtMP9fQvZf6xJ23dPtG5JHx50G', '章若楠', 'zyn@yule.com', '18888888884', 'http://localhost:3000/static/image/2024-09/72840555-ee20-4679-a54d-4b39c622567d.jpeg', 'FEMALE', 'ACTIVE', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InpoYW5ncnVvbmFuIiwic3ViIjoiYmY5YzMyZGMtMjM2My00YTMxLTllN2YtNzQ1NDRmN2QwNGE0IiwiaWF0IjoxNzI1OTU4MTQwLCJleHAiOjE3MjYyMTczNDB9.v2COO1RKNHMkNAyJ-nH5OyoooIN8JCcvXXmBeSN5kbI', '{女神}', '{13,1303,130303}', '别墅967号', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', 'b924df00-77ed-49b7-a8b4-181f0b259c18', 'f401a468-5a9f-4430-85a2-d31177df034a', 9, '::1', '2024-09-10 08:49:00.671', '2024-09-04 05:46:47.509', '2024-09-10 08:49:00.674');
INSERT INTO "public"."User" VALUES ('dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', 'Admin', '$2b$10$lfMvyYSrWNjVF55UhxeC0uoVYgf7GwWBhXu1BZAlvHXoGf./E7Lk2', '谢明伟', 'baiwumm@foxmail.com', '15920157932', 'http://localhost:3000/static/image/2024-07/cc9e77ee-cf84-48e8-a9d0-dc3e9d21224c.jpeg', 'MALE', 'ACTIVE', 88, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwic3ViIjoiZGRkZDdiYTktYzFkNC00YTZiLWI5NDYtZjA1ZTJmNzk4ODBmIiwiaWF0IjoxNzMwMzQwNzQ0LCJleHAiOjE3MzA1OTk5NDR9.T9cdDxVEBGYKs25z68DQZ5cUGTWoKuqkII9Dpau0-k8', '{热血青年,佛系,追求自由,做自己喜欢做的事}', '{44,4403,440305}', '粤海街道', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '32cab8f0-13df-4876-83c5-86089390dbb7', '34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb', 216, '::1', '2024-10-31 02:12:24.833', '2024-07-30 02:35:25.835', '2024-10-31 02:12:24.835');

-- ----------------------------
-- Indexes structure for table User
-- ----------------------------
CREATE UNIQUE INDEX "User_email_key" ON "public"."User" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User" USING btree (
  "phone" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "User_userName_key" ON "public"."User" USING btree (
  "userName" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table User
-- ----------------------------
ALTER TABLE "public"."User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table User
-- ----------------------------
ALTER TABLE "public"."User" ADD CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "public"."Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."User" ADD CONSTRAINT "User_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
