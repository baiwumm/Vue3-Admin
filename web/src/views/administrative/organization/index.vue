<template>
  <div
    class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto"
  >
    <!-- 顶部搜索 -->
    <HeaderSearch
      v-model:model="searchParams"
      @reset="resetSearchParams"
      @search="getDataByPage"
    />
    <ACard
      :title="$t('route.administrative_organization')"
      :bordered="false"
      :body-style="{ flex: 1, overflow: 'hidden' }"
      class="flex-col-stretch sm:flex-1-hidden card-wrapper"
    >
      <template #extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @refresh="getData"
        />
      </template>
      <!-- 表格 -->
      <ATable
        ref="tableWrapperRef"
        :columns="columns"
        :data-source="data"
        size="small"
        :scroll="scrollConfig"
        :loading="loading"
        row-key="id"
        :pagination="false"
        class="h-full"
      />
      <!-- 操作抽屉 -->
      <OperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
        :dataSource="data"
      />
    </ACard>
  </div>
</template>

<script setup lang="tsx">
import { $t } from "@/locales";
import { Button, Popconfirm, Tag } from "ant-design-vue";
import {
  useTable,
  useTableOperate,
  useTableScroll,
} from "@/hooks/common/table";
import { getOrganazationList, delOrganazation } from "@/service/api";
import OperateDrawer from "./modules/operate-drawer.vue";
import HeaderSearch from "./modules/header-search.vue";
import dayjs from "dayjs";

const { tableWrapperRef, scrollConfig } = useTableScroll();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  searchParams,
  resetSearchParams,
} = useTable({
  apiFn: getOrganazationList,
  apiParams: {
    name: undefined,
    code: undefined,
  },
  columns: () => [
    {
      key: "index",
      title: $t("common.index"),
      dataIndex: "index",
      align: "center",
      width: 64,
    },
    {
      key: "name",
      dataIndex: "name",
      title: $t("page.administrative.organization.name"),
      align: "center",
    },
    {
      key: "code",
      dataIndex: "code",
      title: $t("page.administrative.organization.code"),
      align: "center",
      customRender: ({ text }) => (
        <Tag bordered={false} color="processing">
          {text}
        </Tag>
      ),
    },
    {
      key: "description",
      dataIndex: "description",
      title: $t("page.administrative.organization.description"),
      align: "center",
    },
    {
      key: "sort",
      dataIndex: "sort",
      title: $t("form.sort"),
      align: "center",
      customRender: ({ text }) => (
        <Tag bordered={false} color="success">
          {text}
        </Tag>
      ),
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: $t("common.createdAt"),
      align: "center",
      customRender: ({ text }) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      key: "operate",
      title: $t("common.operate"),
      align: "center",
      width: 130,
      fixed: "right",
      customRender: ({ record }) => (
        <div class="flex-center gap-8px">
          <Button
            type="primary"
            ghost
            size="small"
            onClick={() => edit(record.id)}
          >
            {$t("common.edit")}
          </Button>
          <Popconfirm
            title={$t("common.confirmDelete")}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small">
              {$t("common.delete")}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ],
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onDeleted,
} = useTableOperate(data, getData);

/**
 * @description: 删除组织
 */
const handleDelete = (id: number) => {
  return new Promise(async (resolve) => {
    await delOrganazation({ id }).then(({ error }) => {
      if (!error) {
        onDeleted();
      }
      resolve(true);
    });
  });
};

/**
 * @description: 编辑组织
 */
const edit = (id: number) => {
  handleEdit(id);
};
</script>
