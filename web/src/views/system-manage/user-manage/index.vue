<template>
  <div
    class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto"
  >
    <ACard
      :title="$t('route.system-manage_user-manage')"
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
        :pagination="mobilePagination"
        class="h-full"
      />
      <!-- 操作弹窗 -->
      <OperateModal
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
import { ref } from "vue";
import { getUserList, delUser } from "@/service/api";
import { $t } from "@/locales";
import { Button, Popconfirm, Tag, Space } from "ant-design-vue";
import SvgIcon from "@/components/custom/svg-icon.vue";
import {
  useTable,
  useTableOperate,
  useTableScroll,
} from "@/hooks/common/table";
import OperateModal from "./modules/operate-modal.vue";

// 编辑的数据
const editingData = ref<Api.SystemManage.UserManage | null>(null);

const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  updateSearchParams,
  resetSearchParams,
} = useTable({
  apiFn: getUserList,
  apiParams: {
    current: 1,
    size: 10,
    userName: undefined,
    status: undefined,
  },
  columns: () => [
    {
      key: "userName",
      dataIndex: "userName",
      title: $t("page.systemManage.userManage.userName"),
      align: "center",
      fixed: "left",
      customRender: ({ text }) => (
        <Tag bordered={false}>
          <Space>
            <SvgIcon icon="ri:user-line" class="text-base" />
            {text}
          </Space>
        </Tag>
      ),
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
            onClick={() => edit(record)}
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
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onDeleted,
} = useTableOperate(data, getData);

/**
 * @description: 删除用户
 */
const handleDelete = (id: number) => {
  return new Promise(async (resolve) => {
    await delUser({ id }).then(({ error }) => {
      if (!error) {
        onDeleted();
      }
      resolve(true);
    });
  });
};

/**
 * @description: 编辑岗位
 */
const edit = (record: Api.SystemManage.UserManage) => {
  editingData.value = record;
  handleEdit(record.id);
};
</script>
