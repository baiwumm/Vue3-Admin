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

 Date: 31/10/2024 10:17:18
*/


-- ----------------------------
-- Table structure for Permission
-- ----------------------------
DROP TABLE IF EXISTS "public"."Permission";
CREATE TABLE "public"."Permission" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "roleId" text COLLATE "pg_catalog"."default" NOT NULL,
  "menuId" text COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of Permission
-- ----------------------------
INSERT INTO "public"."Permission" VALUES ('3920c9bc-ee77-42b8-b66a-88a1c4920366', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '8f16a2cd-b613-4419-bfa5-996f16beaa6a', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('111cc74e-f92b-4228-bce6-35cf3a4ba686', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '18cf7039-a676-4510-8364-033fa086fdfd', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('26a32aa1-80fa-452e-b872-c65cc9a419b7', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '45d1f4ea-a1e5-4e48-b6a7-141e1fa63b67', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('d89b0e72-1577-4de1-ad84-d51400a907b1', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', 'db837491-6a97-412d-8668-32de8e286390', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('4d9fe625-8ec3-44c4-9493-8408eec6f80f', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', 'ad167628-1055-470c-90ba-f401c4edc621', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('089a0922-71e4-4d30-8ff0-47618e09a630', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', 'e02f4271-4f9b-47e5-a76f-040db8404bd2', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('7afdacc6-10dd-47a1-a427-bb85630582c0', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', 'fd9ac9a5-be38-426c-b38a-8bda75420ffc', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('1366d2f6-27eb-4a5e-878f-9d994b22b7b2', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '76402592-28e6-4575-9454-b38133652fa8', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('d128e74d-13c0-4c65-85b3-0fa43c1fe1eb', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', 'c4bb98dd-e417-438b-8fe5-7b27e2921e72', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('67840934-2ec6-4e41-b45d-8941fd7a8e04', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '8be52db9-1856-4f14-8b2f-12c51ba45a3e', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('7bc31744-10c4-4993-bfc0-f952d3650d2d', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '48d6f0b5-5b11-422c-bee9-d1caa8447966', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('b2584da3-685c-400c-bc88-005888550fed', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '4918cc69-4050-4929-9113-e5cb7e67b848', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('82a35dfd-37f0-41db-a389-cb4b4688bf13', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', 'db9d9316-ad43-41f2-9060-f6f55a6d0fd2', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('155f6641-b285-4d3b-94ac-53fd6f6d5e45', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '0916a1b8-bf6f-4732-9c3c-c0b834c9e1cc', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('c8e614d5-db20-41b6-93f6-079cb1cad669', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '74ca9688-7700-4322-b36f-e1180c5b996b', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('c7de100d-9051-48b1-9380-89ae17fd6d82', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', 'dea4e038-592f-4532-ac86-c7de25a3416c', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('1a1e2658-1f1b-49d4-b0ac-dba0ca7b31a1', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '5dc9be35-dfad-493e-99c4-fdca4ddff1f5', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('872cdd99-602d-4ea5-b627-42ae343400a7', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', '03404a66-50aa-4b21-8c93-9dcddaeffdb7', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('cf6f807a-a6ac-4037-8dbd-8a4758197778', 'e02b5eec-d7b9-4ff8-862c-0151448a390c', 'd62fde7d-061a-4134-a1a5-88d084299852', '2024-09-19 03:17:50.487');
INSERT INTO "public"."Permission" VALUES ('725ce1e3-cd78-4379-904f-6e5ca56294bc', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '240ed870-775b-42d4-abb3-5d915df5c57f', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('1ede724b-8564-4513-b422-02834af960ac', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'a9a40b3f-a86a-4d47-be45-fda5e5bcfaf8', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('bb6c4843-9ae6-4e8e-ad14-732380b0256f', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '891b01b1-bd1b-4caf-93b2-f7dadd7d2b4b', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('5e8ab42b-41a9-4003-a3cb-89b2f461f5fa', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '8d3e24e9-fcac-42a8-b1b8-d26d71d06985', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('6201a214-d08a-4758-8dd8-d168e5e50153', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'c6d8811b-1f1d-46dd-9b29-da46b2278a48', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('d0f19cc4-e097-4c83-8538-b205fc7ba0b0', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'e648628c-e4f3-4abe-a3d6-452b10dd308f', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('bec1569c-2935-4a8a-bd5a-e81831f96c09', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '6b52bc0a-f2b6-4422-8ef8-dde0c5b81f96', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('d6d6a345-811c-4c07-b0fa-b8c87e4dbff1', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '7131adbe-2b2b-4233-ab50-e9ee1859b09b', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('865590e0-d93c-4517-9860-608a82c46df2', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '4bcb5d6b-f876-4e95-8e13-e847bcb18d5d', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('5bae82e3-d389-4dbf-b03e-9af9cce04247', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'e3f98b23-30a9-4b6b-b15c-fe08b13baf5f', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('dd56798b-6858-4d72-a4ef-367cc9cae999', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '52ff7472-67da-4f9b-ba90-ec5468492f32', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('6e0fde5d-6ba0-4796-9eeb-483984f343de', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'f309088f-e63d-48a1-8dce-1b9409dfe0b0', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('dc9c52ef-a21a-44de-8f43-23ba3a226d66', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '848a03e4-25db-41f8-97bf-c154fa160c64', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('609674cf-1578-48b9-ad7b-7ce1b2701f69', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '45d1f4ea-a1e5-4e48-b6a7-141e1fa63b67', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('50b1c8a1-3a71-45fc-8866-6dcd718fec2f', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'db837491-6a97-412d-8668-32de8e286390', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('41b383b9-2b2a-4240-bc3c-0fcaa9cc2ed7', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'ad167628-1055-470c-90ba-f401c4edc621', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('9b307de0-26af-4e40-aec6-cd88278e8302', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'e02f4271-4f9b-47e5-a76f-040db8404bd2', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('f5f36554-f554-444e-894c-20b41caeaf8a', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'fd9ac9a5-be38-426c-b38a-8bda75420ffc', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('434e5721-32a9-4eb7-adfb-a6fcc3a8ee6b', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '76402592-28e6-4575-9454-b38133652fa8', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('1047605c-866e-412e-bd5b-fc3f857be0f5', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'c4bb98dd-e417-438b-8fe5-7b27e2921e72', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('891d9884-e700-4ea4-85b5-7dfb4ed3f3ab', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '8be52db9-1856-4f14-8b2f-12c51ba45a3e', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('534c4674-eb41-496e-abfc-b4acfbf64c54', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '48d6f0b5-5b11-422c-bee9-d1caa8447966', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('b5bb1ee0-9d91-4680-a8d9-89804259e051', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '4918cc69-4050-4929-9113-e5cb7e67b848', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('b7aae08a-da90-4a29-8fd9-9f0ddfa25491', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'db9d9316-ad43-41f2-9060-f6f55a6d0fd2', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('c854c6cf-5059-46b3-94e4-efa6ba5ad6d7', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '0916a1b8-bf6f-4732-9c3c-c0b834c9e1cc', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('d42f3497-7c57-4da4-865c-ba1d068a55c9', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', 'a8304bfd-0b75-4203-aa30-24c0ee98d4f5', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('fb257b39-a4de-4ecb-b58a-b6131f454626', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '7abbee43-cd32-4633-9702-2511eda28357', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('3edeea52-ff9e-4a10-8f37-4c2622bb9e95', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '7131adbe-2b2b-4233-ab50-e9ee1859b09b', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('e3f441e7-53de-4fe7-acee-f3188fddf671', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '4bcb5d6b-f876-4e95-8e13-e847bcb18d5d', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('62b1c717-6cb0-41f9-a988-0be879416f8f', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', 'e3f98b23-30a9-4b6b-b15c-fe08b13baf5f', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('3b9a7166-d49e-4a5b-bf9d-2c71de786077', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', 'f309088f-e63d-48a1-8dce-1b9409dfe0b0', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('488c0309-60fe-4189-afcb-9fbfd6af4eb7', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '848a03e4-25db-41f8-97bf-c154fa160c64', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('ac01c651-ac94-48e2-a7ee-f74fc3bc73e7', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '572c5097-d28f-48b4-899d-3aaf46b8d668', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('0d7477dc-b550-48a1-9c5f-38bd92679880', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '1ee566d9-d5ef-456a-8009-d67bb026b4b0', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('7b2dadb6-9f8b-4770-accf-381855f8962f', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '28a745e9-ff3a-49c2-bebc-e269146652e6', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('45030111-6cd6-49ab-828b-1097a22e7bab', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '2e7aa93e-978c-42e3-aef3-49ec2c7fa183', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('a8ebb9f6-f476-420b-80ec-943d418e34ab', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', 'aaf9caab-e4cc-491c-bf9c-d5fe81b9d867', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('010f0c2c-8b09-4e88-82df-30d4933c0d16', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '18cf7039-a676-4510-8364-033fa086fdfd', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('42cc8832-d061-46f2-a670-5d4b11846877', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '63183e8c-0c27-4642-b783-53290cc7e957', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('6773d139-8927-4e82-8574-4cd9f4652026', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'df07b7c5-a08e-4404-809f-0e4315859c9e', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('d9d986b4-2ac6-4321-9ebe-68ca238668e9', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '6df447b0-d2c2-47a2-afd0-db418db85e76', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('171d8598-5d2c-4079-8768-275c3aa49140', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '86714c51-fce0-498d-9b4f-32fd00ea26a0', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('776c3d2f-c0f3-479d-ac1e-34de379a5c71', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'e38ca869-3931-427b-9f19-724416354d24', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('bffaa2df-3b6a-4f04-8daa-55fa1f3f4297', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '3bceaa2a-4444-4593-8cf1-acf55ee208bf', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('81bea8e4-619a-4c2f-a8e6-848ba4fd5b69', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '4fc642f4-18bb-4b18-980b-7e41e804720c', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('d4bd64d5-90f8-47c0-984b-bfd2ab59b0a8', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '8f16a2cd-b613-4419-bfa5-996f16beaa6a', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('b74cdea8-27d5-4444-b37a-b635a1062f2e', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '4d238c00-d8c0-4ed2-a803-41caf772820e', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('eeff5504-cfb0-44ec-967a-abd571b34b6c', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'e1b37b30-e000-4c24-8976-8c9fa78042b0', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('53a1eb01-06f3-4e87-8d9b-57dc27213a70', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'a66a0e69-cd75-4460-b766-1ad52a82ac10', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('e8c5bccb-a5a4-4dee-b9f4-bfec15c705a2', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'acfd4d4c-4b12-46b9-9a11-e85c2fc8e667', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('c3969c68-c53b-4a74-8878-c519c7622124', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'ea793941-1ca1-4e23-ac0e-784d3a95743a', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('71a1e87a-df80-48e9-9daf-d9615b89296a', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '0c437ad9-c18e-46df-b2c1-c1330601ac3c', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('9c8fa6fa-af45-4d55-be2c-3f580e8f07d6', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '596eba6b-6b80-495a-bf9d-f90fdfb9e49d', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('6c17b698-a3d9-432d-95cb-913e3ee66055', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', 'e1b37b30-e000-4c24-8976-8c9fa78042b0', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('03f5b324-caec-43b0-8815-22492a8d041a', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '0c437ad9-c18e-46df-b2c1-c1330601ac3c', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('59cf91bb-da4d-4bd3-b521-72ead88f6a36', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '9ff718db-c9f9-4fd4-8cc2-d6212b74c336', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('fcbd0d15-f657-48b5-a821-560c2823fb00', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '6b52bc0a-f2b6-4422-8ef8-dde0c5b81f96', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('bfd44238-a8a7-4524-8abe-54cbeb982105', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '52ff7472-67da-4f9b-ba90-ec5468492f32', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('48a9ad44-3d3e-49bd-8a83-63db8cc2fdb9', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '9e378453-357b-4395-a342-d53f98d6db46', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('142ef629-5eec-407f-82a4-d4f5d2a812db', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '37191c9a-19b7-43aa-9ad5-369100f1407c', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('f5381250-1dab-45bc-8c31-3ce4afb328ee', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '61da313d-4b5f-40b4-9bc3-55b57ebf18d1', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('baf9dda3-b933-4860-9836-91e4881fb35e', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '9ff718db-c9f9-4fd4-8cc2-d6212b74c336', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('bcc610e3-9aa9-49e1-a084-7901373b261b', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '3064dd2b-38d6-46ba-965e-21a101da688c', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('aa7ad9d7-6d97-4e5b-b757-9e26567d3c33', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'a8304bfd-0b75-4203-aa30-24c0ee98d4f5', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('c19b3bad-7a54-4382-84af-f54ed3fafcd3', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '7abbee43-cd32-4633-9702-2511eda28357', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('1f884e32-15dc-44b4-a1e1-db176363b7c7', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'd62fde7d-061a-4134-a1a5-88d084299852', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('6f968807-01e8-46e1-8f85-28f246a9b091', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'ca0a8df9-7daa-4abf-b9dc-9e3f15bed7c4', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('1171edfe-c3b1-4998-b9a7-7fbd4bcdb6d6', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'f7650658-054e-4dca-8fba-92ffa2421f9d', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('63071bb1-4d14-42c9-846c-a71c44387ece', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'fa772008-e045-479b-9d7e-09c04b584277', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('3703f554-2c08-455c-97bf-ee3dbea93786', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '0f6fcc34-8913-47a7-8b28-0c526a22b947', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('4fe903ec-8a89-40fe-bb92-92d16a89d40a', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '2a784982-3f4e-4fea-a44e-ab9f7aa302f3', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('cbc845ec-9cc9-403a-8c56-a35d670584cf', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '74ca9688-7700-4322-b36f-e1180c5b996b', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('450c1357-22fa-4ecc-9b07-2ad18270921b', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'dea4e038-592f-4532-ac86-c7de25a3416c', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('9a9439af-cd78-4f62-8c74-41a41b32a991', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '5dc9be35-dfad-493e-99c4-fdca4ddff1f5', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('f57aa064-2e96-4ad5-8a63-389a021fae2b', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '1ee566d9-d5ef-456a-8009-d67bb026b4b0', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('50a9f91b-e171-4ccd-8112-3391340d2498', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '28a745e9-ff3a-49c2-bebc-e269146652e6', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('e0aae778-3317-4352-96e9-0247dc0902ca', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '2e7aa93e-978c-42e3-aef3-49ec2c7fa183', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('0a115db5-0957-4b0c-97e6-f2d58a29253e', '6db049fe-c944-4680-b6dc-f9f40d6ad018', 'aaf9caab-e4cc-491c-bf9c-d5fe81b9d867', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('17070d4b-b014-4eaa-b738-ce7437df5b0b', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '596eba6b-6b80-495a-bf9d-f90fdfb9e49d', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('c98cf00a-ac86-41f8-893e-cfd64bb9b267', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '03404a66-50aa-4b21-8c93-9dcddaeffdb7', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('03f9b09e-868f-4caf-a5a7-c0d2f2b584b6', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '3024936c-5e4f-4b0a-a5a8-6360d8294987', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('b3e0cb02-f9a9-436c-9535-b9ea7a55b162', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '572c5097-d28f-48b4-899d-3aaf46b8d668', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('eef6a2f8-e1da-4dfa-bb23-91b837743b02', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '881a0e88-22e8-49ea-813c-4eaa4e3d6aaa', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('f0ef0840-9a97-4600-ad6d-f20585e3a4bd', '6db049fe-c944-4680-b6dc-f9f40d6ad018', '7e88d5a1-0517-49ac-b476-f8da0dfa1ef7', '2024-09-26 12:10:48.002');
INSERT INTO "public"."Permission" VALUES ('0e69a571-a73f-4d5a-b4cf-28506bbcd0d7', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '8f16a2cd-b613-4419-bfa5-996f16beaa6a', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('247ca198-63af-473f-beec-d74a147194cf', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', 'a66a0e69-cd75-4460-b766-1ad52a82ac10', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('1cd75428-3747-40fa-85ce-d04864ddc32b', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', 'acfd4d4c-4b12-46b9-9a11-e85c2fc8e667', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('d0fae29c-1839-40dc-83e1-9b4f12d268b7', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', 'ea793941-1ca1-4e23-ac0e-784d3a95743a', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('2851a0c1-33ba-42f4-943b-6cba28f2e801', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '9e378453-357b-4395-a342-d53f98d6db46', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('be0e1d5d-6aaf-42f6-b79e-977a0462fd8a', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '37191c9a-19b7-43aa-9ad5-369100f1407c', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('20003675-980e-47d0-9029-0b554e1d7f2e', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '61da313d-4b5f-40b4-9bc3-55b57ebf18d1', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('6c71b945-0dee-47c3-b891-6b0320d423b2', '2564f9b6-9288-49d4-b1b2-2d6f4f7946f3', '3064dd2b-38d6-46ba-965e-21a101da688c', '2024-09-02 09:47:35.549');
INSERT INTO "public"."Permission" VALUES ('1c636280-a2b5-428d-9c61-528d3cc5e39b', '697da404-a1e6-4e8d-996d-7f488cedc250', '8f16a2cd-b613-4419-bfa5-996f16beaa6a', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('f6ac7053-8b27-429d-9935-8b79e69e3447', '697da404-a1e6-4e8d-996d-7f488cedc250', '4fc642f4-18bb-4b18-980b-7e41e804720c', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('6ce1f77d-6358-4aa0-b432-5c6eb757cb8c', '697da404-a1e6-4e8d-996d-7f488cedc250', '4d238c00-d8c0-4ed2-a803-41caf772820e', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('21fdd8d9-9e5d-4df2-811e-8c8283dbfb94', '697da404-a1e6-4e8d-996d-7f488cedc250', 'fd9ac9a5-be38-426c-b38a-8bda75420ffc', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('47ff4ce1-e525-4d04-aadf-4e4ff285e424', '697da404-a1e6-4e8d-996d-7f488cedc250', '48d6f0b5-5b11-422c-bee9-d1caa8447966', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('2f60796e-8fbb-4488-b383-24740a5a681d', '697da404-a1e6-4e8d-996d-7f488cedc250', 'e1b37b30-e000-4c24-8976-8c9fa78042b0', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('60f5ab0f-f5f4-422a-ac71-5863f518d4d4', '697da404-a1e6-4e8d-996d-7f488cedc250', '0c437ad9-c18e-46df-b2c1-c1330601ac3c', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('770bb614-dfbc-4406-9c46-ad3f0e1923d8', '697da404-a1e6-4e8d-996d-7f488cedc250', '9ff718db-c9f9-4fd4-8cc2-d6212b74c336', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('4b86bf4a-16cc-419f-8e52-d2e4250b36af', '697da404-a1e6-4e8d-996d-7f488cedc250', '6b52bc0a-f2b6-4422-8ef8-dde0c5b81f96', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('e3637c24-48bc-408c-9ed0-d5885e208d9b', '697da404-a1e6-4e8d-996d-7f488cedc250', '52ff7472-67da-4f9b-ba90-ec5468492f32', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('1074ec66-87f2-4210-bc1f-7baadebf724b', '697da404-a1e6-4e8d-996d-7f488cedc250', '45d1f4ea-a1e5-4e48-b6a7-141e1fa63b67', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('c87ca149-470a-42cd-9ba5-677a31d42378', '697da404-a1e6-4e8d-996d-7f488cedc250', 'e38ca869-3931-427b-9f19-724416354d24', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('f7c4e12f-b8f1-4ad1-9c8e-316037332b41', '697da404-a1e6-4e8d-996d-7f488cedc250', '63183e8c-0c27-4642-b783-53290cc7e957', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('2d636fe1-db7c-40db-a4a9-37e664094a7d', '697da404-a1e6-4e8d-996d-7f488cedc250', 'df07b7c5-a08e-4404-809f-0e4315859c9e', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('6fe43fa9-857e-4c35-a7b1-c403b22b7c19', '697da404-a1e6-4e8d-996d-7f488cedc250', '6df447b0-d2c2-47a2-afd0-db418db85e76', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('31203c86-90cb-48ed-98d4-398264d5013b', '697da404-a1e6-4e8d-996d-7f488cedc250', '86714c51-fce0-498d-9b4f-32fd00ea26a0', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('dfabe316-8aa3-4ff7-8b5b-58a26fc23a00', '697da404-a1e6-4e8d-996d-7f488cedc250', '18cf7039-a676-4510-8364-033fa086fdfd', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('a1f2daea-93b1-41ca-be06-3c5adab0f992', '697da404-a1e6-4e8d-996d-7f488cedc250', 'd62fde7d-061a-4134-a1a5-88d084299852', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('930d6388-6d5a-48aa-a2eb-8083c759b56b', '697da404-a1e6-4e8d-996d-7f488cedc250', '3bceaa2a-4444-4593-8cf1-acf55ee208bf', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('7950c9b2-4a34-4b0e-b010-fe7d6fa40c9c', '697da404-a1e6-4e8d-996d-7f488cedc250', 'ca0a8df9-7daa-4abf-b9dc-9e3f15bed7c4', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('c168fb2a-5b2e-4c82-b292-0f0f3d512ee2', '697da404-a1e6-4e8d-996d-7f488cedc250', 'e648628c-e4f3-4abe-a3d6-452b10dd308f', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('72481323-59a9-4bfa-a146-a3fa97d996a9', '697da404-a1e6-4e8d-996d-7f488cedc250', '3024936c-5e4f-4b0a-a5a8-6360d8294987', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('daa25b82-f3c5-4e60-91c4-be6c87905b73', '697da404-a1e6-4e8d-996d-7f488cedc250', '881a0e88-22e8-49ea-813c-4eaa4e3d6aaa', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('eb3b4545-faab-4320-b74a-0c10b66eefbf', '697da404-a1e6-4e8d-996d-7f488cedc250', 'f7650658-054e-4dca-8fba-92ffa2421f9d', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('2edfe45d-7105-435f-8f76-13cbbf078cf2', '697da404-a1e6-4e8d-996d-7f488cedc250', 'fa772008-e045-479b-9d7e-09c04b584277', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('0edbb5ac-5b92-4647-9b3a-ede4a101d441', '697da404-a1e6-4e8d-996d-7f488cedc250', 'c6d8811b-1f1d-46dd-9b29-da46b2278a48', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('70be9632-bb9e-4270-92bb-f5b73adf1c72', '697da404-a1e6-4e8d-996d-7f488cedc250', '0f6fcc34-8913-47a7-8b28-0c526a22b947', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('fde57691-4763-4e30-b547-a987f3591db8', '697da404-a1e6-4e8d-996d-7f488cedc250', 'a9a40b3f-a86a-4d47-be45-fda5e5bcfaf8', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('3eb4282d-a029-45b8-a9cf-dfb12c25a1e3', '697da404-a1e6-4e8d-996d-7f488cedc250', '891b01b1-bd1b-4caf-93b2-f7dadd7d2b4b', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('39f25fbf-71b7-4355-a91b-a217fc7c7fbf', '697da404-a1e6-4e8d-996d-7f488cedc250', '8d3e24e9-fcac-42a8-b1b8-d26d71d06985', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('4881dd80-0831-4e90-877b-44db3563b058', '697da404-a1e6-4e8d-996d-7f488cedc250', '2a784982-3f4e-4fea-a44e-ab9f7aa302f3', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('63f5f5ac-35c8-4231-bec6-48b7b458b0e4', '697da404-a1e6-4e8d-996d-7f488cedc250', '240ed870-775b-42d4-abb3-5d915df5c57f', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('efd9e7b7-57bd-44cb-977f-5be98af32f59', '697da404-a1e6-4e8d-996d-7f488cedc250', '7e88d5a1-0517-49ac-b476-f8da0dfa1ef7', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('6bc41f5b-b18e-44ee-b3e2-28521e3de101', '697da404-a1e6-4e8d-996d-7f488cedc250', '74ca9688-7700-4322-b36f-e1180c5b996b', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('9410a00c-2149-403c-944a-9cafc465083b', '697da404-a1e6-4e8d-996d-7f488cedc250', 'dea4e038-592f-4532-ac86-c7de25a3416c', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('7eb48a24-7b79-4f3d-8bf6-42aa8028967b', '697da404-a1e6-4e8d-996d-7f488cedc250', '5dc9be35-dfad-493e-99c4-fdca4ddff1f5', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('032d673c-e4ff-4b59-8d2a-130fc55f8afa', '697da404-a1e6-4e8d-996d-7f488cedc250', '1ee566d9-d5ef-456a-8009-d67bb026b4b0', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('9991d8f8-9125-470b-a7f1-316aea27e298', '697da404-a1e6-4e8d-996d-7f488cedc250', '28a745e9-ff3a-49c2-bebc-e269146652e6', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('74051cb8-4cf5-42a5-9370-f3ef758451d4', '697da404-a1e6-4e8d-996d-7f488cedc250', '2e7aa93e-978c-42e3-aef3-49ec2c7fa183', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('3881f6ca-7851-49c1-a968-8fec04bc7e8a', '697da404-a1e6-4e8d-996d-7f488cedc250', 'aaf9caab-e4cc-491c-bf9c-d5fe81b9d867', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('b96005cd-8c49-4a40-9190-a929c97a4aaa', '697da404-a1e6-4e8d-996d-7f488cedc250', '596eba6b-6b80-495a-bf9d-f90fdfb9e49d', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('625f4064-dc25-4fc4-aea3-c134ba20c949', '697da404-a1e6-4e8d-996d-7f488cedc250', '03404a66-50aa-4b21-8c93-9dcddaeffdb7', '2024-09-26 12:11:17.733');
INSERT INTO "public"."Permission" VALUES ('7939f8bc-9b6a-4783-a260-82e5b0725a10', '697da404-a1e6-4e8d-996d-7f488cedc250', '572c5097-d28f-48b4-899d-3aaf46b8d668', '2024-09-26 12:11:17.733');
