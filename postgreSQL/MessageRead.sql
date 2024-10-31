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

 Date: 31/10/2024 10:17:09
*/


-- ----------------------------
-- Table structure for MessageRead
-- ----------------------------
DROP TABLE IF EXISTS "public"."MessageRead";
CREATE TABLE "public"."MessageRead" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "messageId" text COLLATE "pg_catalog"."default" NOT NULL,
  "userId" text COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of MessageRead
-- ----------------------------
INSERT INTO "public"."MessageRead" VALUES ('e894e6bf-3dd2-45bf-b736-e66169d83add', 'b64c3c94-5312-45f2-aa8f-fca11a04263a', 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', '2024-09-04 02:15:57.743');
INSERT INTO "public"."MessageRead" VALUES ('c218f953-87f2-4cc9-a552-e80a64b2ebfa', '2215f10b-ca4f-4a73-b78b-a14a6ae4d52f', 'ea35984a-34f6-4da3-9f50-314f4b719ea6', '2024-09-04 05:53:47.778');
INSERT INTO "public"."MessageRead" VALUES ('472116d6-5059-4201-9d09-420d17b3f49f', 'e9016a44-3ef8-4cac-8dcd-881a74559fba', 'ea35984a-34f6-4da3-9f50-314f4b719ea6', '2024-09-04 05:54:33.608');
INSERT INTO "public"."MessageRead" VALUES ('705a6c64-eee9-4e3c-b867-b4fbfb87d854', 'e9016a44-3ef8-4cac-8dcd-881a74559fba', 'b485e3c1-0790-4007-adef-849537c291f5', '2024-09-04 05:56:20.796');
INSERT INTO "public"."MessageRead" VALUES ('e762f6f0-8f3c-4769-8505-21b9772e0989', 'e9016a44-3ef8-4cac-8dcd-881a74559fba', 'bf9c32dc-2363-4a31-9e7f-74544f7d04a4', '2024-09-04 06:05:15.354');
INSERT INTO "public"."MessageRead" VALUES ('dafa0711-0e2f-480c-957a-ad2bebc03a80', 'e9016a44-3ef8-4cac-8dcd-881a74559fba', 'c698c8e8-3aa0-4dec-b1cd-7d37660d1519', '2024-09-04 06:13:22.907');
INSERT INTO "public"."MessageRead" VALUES ('b60e0224-750c-442e-9a2d-5b6184b74b28', '3ee060d0-7975-4cd5-bb7d-4f884d7824ba', 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', '2024-09-04 06:15:40.04');
INSERT INTO "public"."MessageRead" VALUES ('4f3d2cd5-0b90-4871-bc29-b634494fdb2e', '3ee060d0-7975-4cd5-bb7d-4f884d7824ba', 'c698c8e8-3aa0-4dec-b1cd-7d37660d1519', '2024-09-04 06:16:08.858');
INSERT INTO "public"."MessageRead" VALUES ('3e5ca7b4-f6bc-4fc1-a33d-96a9ba76fb4c', '2215f10b-ca4f-4a73-b78b-a14a6ae4d52f', 'ba54e74c-86cb-4bfa-a0bc-71813175de9e', '2024-09-04 06:27:34.042');
INSERT INTO "public"."MessageRead" VALUES ('68e203e5-4902-4aaa-a56e-2434619df84e', 'e9016a44-3ef8-4cac-8dcd-881a74559fba', 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', '2024-09-04 06:29:25.511');
INSERT INTO "public"."MessageRead" VALUES ('34b59c85-bc50-4e36-8e77-50505bf720d8', '2215f10b-ca4f-4a73-b78b-a14a6ae4d52f', 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', '2024-09-04 06:32:27.602');
INSERT INTO "public"."MessageRead" VALUES ('239e152f-eb37-4e8b-a1e1-fb216b57c6af', '2215f10b-ca4f-4a73-b78b-a14a6ae4d52f', 'b485e3c1-0790-4007-adef-849537c291f5', '2024-09-04 06:49:39.364');
INSERT INTO "public"."MessageRead" VALUES ('e9927102-4ead-4994-88e6-9627f06fe894', '2215f10b-ca4f-4a73-b78b-a14a6ae4d52f', 'b62c0c5a-ac9f-4d7d-863c-fbfa148bbc4c', '2024-09-04 06:49:59.016');
INSERT INTO "public"."MessageRead" VALUES ('1494516c-5193-4e4f-9f0e-c60493054581', '2215f10b-ca4f-4a73-b78b-a14a6ae4d52f', 'bf9c32dc-2363-4a31-9e7f-74544f7d04a4', '2024-09-04 06:50:13.943');
INSERT INTO "public"."MessageRead" VALUES ('9a1c750a-2a15-498e-b4c4-a486f7258ae0', '49c29eb9-887d-4aad-a77b-4a72b81fcfd5', 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', '2024-09-06 10:15:28.634');
INSERT INTO "public"."MessageRead" VALUES ('290f44b4-c702-4ac0-9f90-a3865cfba9a3', '805818b4-683b-41b7-a301-7843a1455776', 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', '2024-09-06 10:16:00.541');
INSERT INTO "public"."MessageRead" VALUES ('c605621b-dc23-4471-926b-e016f29e33b1', '1ed975b1-3b92-4496-955c-883c6f8521bf', 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f', '2024-09-06 10:17:00.587');
INSERT INTO "public"."MessageRead" VALUES ('c88b2664-e589-46bb-a3d5-0bf40561210a', '70412167-ef80-49a3-b764-8b08841fcbeb', 'bf9c32dc-2363-4a31-9e7f-74544f7d04a4', '2024-09-06 10:25:48.045');

-- ----------------------------
-- Primary Key structure for table MessageRead
-- ----------------------------
ALTER TABLE "public"."MessageRead" ADD CONSTRAINT "MessageRead_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table MessageRead
-- ----------------------------
ALTER TABLE "public"."MessageRead" ADD CONSTRAINT "MessageRead_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."MessageRead" ADD CONSTRAINT "MessageRead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
