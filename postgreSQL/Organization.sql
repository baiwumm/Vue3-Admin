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

 Date: 31/10/2024 10:17:13
*/


-- ----------------------------
-- Table structure for Organization
-- ----------------------------
DROP TABLE IF EXISTS "public"."Organization";
CREATE TABLE "public"."Organization" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "code" text COLLATE "pg_catalog"."default" NOT NULL,
  "parentId" text COLLATE "pg_catalog"."default",
  "sort" int4 NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "icon" text COLLATE "pg_catalog"."default",
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of Organization
-- ----------------------------
INSERT INTO "public"."Organization" VALUES ('0da77343-0747-42fe-beff-25ee98bc7a88', '公司总部', 'HB_001', NULL, 1, '', NULL, '2024-07-15 07:50:29.916', '2024-07-15 07:50:29.916');
INSERT INTO "public"."Organization" VALUES ('b924df00-77ed-49b7-a8b4-181f0b259c18', '深圳分公司', 'SZ_001', '0da77343-0747-42fe-beff-25ee98bc7a88', 1, '', NULL, '2024-07-15 07:51:09.095', '2024-07-15 07:51:09.095');
INSERT INTO "public"."Organization" VALUES ('a12e5511-06f9-42e4-b8fb-816b8d5e346f', '广州分公司', 'GZ_001', '0da77343-0747-42fe-beff-25ee98bc7a88', 1, '', NULL, '2024-07-15 07:51:42.349', '2024-07-15 07:51:42.349');
INSERT INTO "public"."Organization" VALUES ('68c4ac85-3f4a-4ca0-9112-562e91a1d6a2', '北京分公司', 'BJ_001', '0da77343-0747-42fe-beff-25ee98bc7a88', 1, '', NULL, '2024-07-15 07:52:09.127', '2024-07-15 07:52:09.127');
INSERT INTO "public"."Organization" VALUES ('a8c5d1e8-72a2-4815-9842-7a31bcd82917', '上海分公司', 'SH_001', '0da77343-0747-42fe-beff-25ee98bc7a88', 1, '', NULL, '2024-07-15 07:52:23.694', '2024-07-15 07:52:23.694');
INSERT INTO "public"."Organization" VALUES ('3bc8ec43-8441-4a4a-9935-5e5baf09d62b', '福田分部', 'SZ_002', 'b924df00-77ed-49b7-a8b4-181f0b259c18', 1, '', NULL, '2024-07-15 07:52:43.722', '2024-07-15 07:52:43.722');
INSERT INTO "public"."Organization" VALUES ('3348943f-c85a-43ce-ba68-71516df3a28d', '南山分部', 'SZ_003', 'b924df00-77ed-49b7-a8b4-181f0b259c18', 1, '', NULL, '2024-07-15 07:53:06.458', '2024-07-15 07:53:06.458');
INSERT INTO "public"."Organization" VALUES ('60563a3f-b2b0-4a3a-9525-8676ba3ac9eb', '罗湖分部', 'SZ_004', 'b924df00-77ed-49b7-a8b4-181f0b259c18', 1, '', NULL, '2024-07-15 07:53:32.309', '2024-07-15 07:53:32.309');
INSERT INTO "public"."Organization" VALUES ('61a688b2-789c-4d2f-a149-46542bae0547', '天河分部', 'GZ_002', 'a12e5511-06f9-42e4-b8fb-816b8d5e346f', 1, '', NULL, '2024-07-15 07:53:51.31', '2024-07-15 07:53:51.31');
INSERT INTO "public"."Organization" VALUES ('7657fca9-acb5-42a9-ab6a-782d34ab9b62', '白云分部', 'GZ_003', 'a12e5511-06f9-42e4-b8fb-816b8d5e346f', 1, '', NULL, '2024-07-15 07:54:06.75', '2024-07-15 07:54:06.75');
INSERT INTO "public"."Organization" VALUES ('6cabf39a-6b5a-4ef1-b8ba-59d2ac7b6a1a', '黄埔分部', 'GZ_004', 'a12e5511-06f9-42e4-b8fb-816b8d5e346f', 1, '', NULL, '2024-07-15 07:54:25.426', '2024-07-15 07:54:25.426');
INSERT INTO "public"."Organization" VALUES ('6dee4d4f-d9f0-41fe-bae3-febd45aa9b3e', '浦东新区分部', 'SH_002', 'a8c5d1e8-72a2-4815-9842-7a31bcd82917', 1, '', NULL, '2024-07-15 07:55:10.858', '2024-07-15 07:55:10.858');
INSERT INTO "public"."Organization" VALUES ('40129577-049f-4f40-9e2e-2c1188e4695f', '徐汇区', 'SH_003', 'a8c5d1e8-72a2-4815-9842-7a31bcd82917', 1, '', NULL, '2024-07-15 07:55:31.164', '2024-07-15 07:55:31.164');
INSERT INTO "public"."Organization" VALUES ('4a89a957-9c4f-45da-a3c9-20334a2b3d14', '长宁区', 'SH_004', 'a8c5d1e8-72a2-4815-9842-7a31bcd82917', 1, '', NULL, '2024-07-15 07:55:52.348', '2024-07-15 07:55:52.348');
INSERT INTO "public"."Organization" VALUES ('896c6abe-3007-4fc6-a29d-abffcbbd38fb', '朝阳区分部', 'BJ_002', '68c4ac85-3f4a-4ca0-9112-562e91a1d6a2', 1, '', NULL, '2024-07-15 07:57:23.174', '2024-07-15 07:57:23.174');
INSERT INTO "public"."Organization" VALUES ('6bd10709-d784-42fa-ba93-447707e567c2', '海淀区分部', 'BJ_003', '68c4ac85-3f4a-4ca0-9112-562e91a1d6a2', 1, '', NULL, '2024-07-15 07:57:48.801', '2024-07-15 07:57:48.801');
INSERT INTO "public"."Organization" VALUES ('f45cd48b-e703-49db-91be-ae7f594e73e0', '阿里巴巴', 'ALI_000', NULL, 1, '阿里巴巴集团由曾担任英语教师的马云为首的18人，于1999年在中国杭州创立。从一开始，所有创始人就深信互联网能够创造公平的竞争环境，让小企业通过创新与科技扩展业务，并在参与国内或全球市场竞争时处于更有利的位置。自推出让中国的小型出口商、制造商及创业者接触全球买家的首个网站以来，阿里巴巴集团不断成长，成为了网上及移动商务的全球领导者。', 'simple-icons:alibabadotcom', '2024-07-15 07:59:08.613', '2024-07-15 07:59:08.613');
INSERT INTO "public"."Organization" VALUES ('9382c3d0-42ef-496b-961f-f0bcee6edfbf', '支付宝', 'ALI_002', 'f45cd48b-e703-49db-91be-ae7f594e73e0', 1, '支付宝（Alipay）是蚂蚁科技集团股份有限公司旗下业务，成立于2004年，是中国第三方支付开放平台，是当下世界上流行的网络银行和网络支付形式之一。', 'ri:alipay-fill', '2024-07-15 07:59:53.677', '2024-07-15 07:59:53.677');
INSERT INTO "public"."Organization" VALUES ('ed09ac6d-d9d8-456a-ab93-e4e047a9048d', '钉钉', 'ALI_003', 'f45cd48b-e703-49db-91be-ae7f594e73e0', 1, '钉钉（Ding Talk）是阿里巴巴集团打造的企业级智能移动办公平台，是数字经济时代的企业组织协同办公和应用开发平台。', 'ri:dingding-fill', '2024-07-15 08:00:44.777', '2024-07-15 08:00:44.777');
INSERT INTO "public"."Organization" VALUES ('460e32b7-6c69-47b2-ab01-30268952f52e', '淘宝', 'ALI_005', 'f45cd48b-e703-49db-91be-ae7f594e73e0', 1, '淘宝网是亚太地区较大的网络零售、商圈，由阿里巴巴集团在2003年5月创立。淘宝网是中国深受欢迎的网购零售平台，拥有近5亿的注册用户数，每天有超过6000万的固定访客，同时每天的在线商品数已经超过了8亿件，平均每分钟售出4.8万件商品。', 'ri:taobao-fill', '2024-07-15 08:01:53.37', '2024-07-15 08:01:53.37');
INSERT INTO "public"."Organization" VALUES ('e5f4ae69-633b-48ff-8ef1-b92597f2a26c', '字节跳动', 'BYTE_001', NULL, 1, '北京抖音信息服务有限公司，成立于2012年3月9日，2023年收入8635亿元。 地址位于北京市海淀区北三环西路甲23号院1号楼2层222。公司以建设“全球创作与交流平台”为愿景。字节跳动的全球化布局始于2015年，“技术出海”是字节跳动全球化发展的核心战略，其旗下产品有今日头条、西瓜视频、抖音、头条百科、皮皮虾、懂车帝、悟空问答等。', 'simple-icons:bytedance', '2024-07-15 08:03:11.493', '2024-07-15 08:03:11.493');
INSERT INTO "public"."Organization" VALUES ('2eaab2c3-4872-49af-b647-78ba9c120df8', '抖音', 'BYTE_002', 'e5f4ae69-633b-48ff-8ef1-b92597f2a26c', 1, '抖音让每一个人看见并连接更大的世界，鼓励表达、沟通和记录，激发创造，丰富人们的精神世界，让现实生活更美好。', 'ri:tiktok-fill', '2024-07-15 08:04:44.402', '2024-07-15 08:04:44.402');
INSERT INTO "public"."Organization" VALUES ('30b5bef3-1c1b-4c86-afb1-353d0c7a696f', '今日头条', 'BYTE_003', 'e5f4ae69-633b-48ff-8ef1-b92597f2a26c', 1, '今日头条是一个通用信息平台，致力于连接人与信息，让优质丰富的信息得到高效精准的分发，促使信息创造价值。 今日头条目前拥有推荐引擎、搜索引擎、关注订阅和内容运营等多种分发方式，囊括图文、视频、问答、微头条、专栏、小说、直播、音频和小程序等多种内容体裁，并涵盖科技、体育、健康、美食、教育、三农、国风等超过100个内容领域。', 'icon-park-solid:jinritoutiao', '2024-07-15 08:05:42.858', '2024-07-15 08:05:42.858');
INSERT INTO "public"."Organization" VALUES ('8233a4de-02f8-49d8-85e8-5a92fd8552e0', '西瓜视频', 'BYTE_004', 'e5f4ae69-633b-48ff-8ef1-b92597f2a26c', 1, '西瓜视频是国内领先的 PUGC 视频平台，它通过个性化推荐，为不同人群提供优质内容，同时鼓励多样化创作，帮助人们轻松地向全世界分享视频作品。', 'icon-park-solid:xigua', '2024-07-15 08:06:23.101', '2024-07-15 08:06:23.101');
INSERT INTO "public"."Organization" VALUES ('32cab8f0-13df-4876-83c5-86089390dbb7', '腾讯控股', 'TC_001', NULL, 1, '腾讯于1998年11月成立,是一家互联网公司,通过技术丰富互联网用户的生活,助力企业数字化升级。我们的使命是“用户为本 科技向善”。', '', '2024-07-15 08:10:03.173', '2024-07-15 08:13:33.775');
INSERT INTO "public"."Organization" VALUES ('d21a1820-d650-4eaa-8b83-ba0fed7febe7', '微信', 'TC_002', '32cab8f0-13df-4876-83c5-86089390dbb7', 1, '微信（WeChat）是腾讯公司于2011年1月21日推出的一个为智能终端提供即时通讯服务的免费应用程序，由张小龙所带领的腾讯广州研发中心产品团队打造。', 'ri:wechat-fill', '2024-07-15 08:14:30.153', '2024-07-15 08:14:30.153');
INSERT INTO "public"."Organization" VALUES ('038d606e-304d-4cff-bb09-70f5be4a8f19', 'QQ', 'TC_003', '32cab8f0-13df-4876-83c5-86089390dbb7', 1, 'QQ（腾讯QQ），是腾讯公司推出的一款基于互联网即时通信软件。腾讯QQ支持在线聊天、视频通话、点对点断点续传文件、共享文件、网络硬盘、自定义面板、QQ邮箱等多种功能，并可与多种通讯终端相连。', 'ri:qq-fill', '2024-07-15 08:15:21.584', '2024-07-15 08:15:21.584');
INSERT INTO "public"."Organization" VALUES ('38c80d63-c18e-4dc4-9b36-f962146af156', '阿里云', 'ALI_004', 'f45cd48b-e703-49db-91be-ae7f594e73e0', 1, '阿里云创立于2009年，是全球领先的云计算及人工智能科技公司，致力于以在线公共服务的方式，提供安全、可靠的计算和数据处理能力，让计算和人工智能成为普惠科技。', 'ri:alibaba-cloud-fill', '2024-07-15 08:01:17.818', '2024-07-17 02:38:12.852');

-- ----------------------------
-- Indexes structure for table Organization
-- ----------------------------
CREATE UNIQUE INDEX "Organization_code_key" ON "public"."Organization" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "Organization_name_key" ON "public"."Organization" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Organization
-- ----------------------------
ALTER TABLE "public"."Organization" ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table Organization
-- ----------------------------
ALTER TABLE "public"."Organization" ADD CONSTRAINT "Organization_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
