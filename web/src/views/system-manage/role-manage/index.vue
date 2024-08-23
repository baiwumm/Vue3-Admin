<template>
  <PageContainer>
    <template #header>
      <!-- 顶部搜索 -->
      <HeaderSearch
        v-model:model="searchParams"
        @reset="resetSearchParams"
        @search="getDataByPage"
        :updateSearchParams="updateSearchParams"
        :locales="locales"
      />
    </template>
    <template #extra>
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :disabled-delete="checkedRowKeys.length === 0"
        :loading="loading"
        @add="handleAdd"
        @refresh="getData"
        :add-btn="hasAuth('system-manage:role-manage:add')"
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
      :pagination="{
        ...mobilePagination,
        showTotal: (total) => `共 ${total} 条数据`,
      }"
      class="h-full"
    />
    <!-- 操作抽屉 -->
    <OperateDrawer
      v-model:visible="drawerVisible"
      :operate-type="operateType"
      :row-data="editingData"
      @submitted="getDataByPage"
      :dataSource="data"
      :locales="locales"
      :roleRouteList="roleRouteList"
    />
  </PageContainer>
</template>
<script setup lang="tsx">
import { ref, onMounted } from "vue";
import { $t } from "@/locales";
import { Button, Popconfirm, Tag, Space, Tooltip } from "ant-design-vue";
import {
  useTable,
  useTableOperate,
  useTableScroll,
} from "@/hooks/common/table";
import { getRoleList, delRole, fetchRoleRoutes } from "@/service/api";
import OperateDrawer from "./modules/operate-drawer.vue";
import HeaderSearch from "./modules/header-search.vue";
import dayjs from "dayjs";
import SvgIcon from "@/components/custom/svg-icon.vue";
import { UNIFORM_TEXT } from "@/enum";
import { useAuth } from "@/hooks/business/auth";

// 权限钩子函数
const { hasAuth } = useAuth();

/**
 * @description: 获取权限路由
 */
const roleRouteList = ref<Api.SystemManage.MenuManage[]>([]);
const fetchRoleRouteList = async () => {
  const { data, error } = await fetchRoleRoutes();
  if (!error) {
    roleRouteList.value = data;
  }
};

const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

// 编辑的数据
const editingData = ref<Api.SystemManage.RoleManage | null>(null);

// 国际化
const locales = (field: string) => $t(`page.systemManage.roleManage.${field}`);

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
  apiFn: getRoleList,
  apiParams: {
    name: undefined,
    code: undefined,
    startTime: undefined,
    endTime: undefined,
    current: 1,
    size: 10,
  },
  columns: () => [
    {
      key: "name",
      dataIndex: "name",
      title: locales("name"),
      customRender: ({ text }) => (
        <Tag bordered={false}>
          <Space>
            <SvgIcon icon="carbon:user-role" class="text-base" />
            {text}
          </Space>
        </Tag>
      ),
    },
    {
      key: "code",
      dataIndex: "code",
      title: locales("code"),
      align: "center",
      ellipsis: true,
      customRender: ({ text }) =>
        text ? (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ) : (
          UNIFORM_TEXT.NULL
        ),
    },
    {
      key: "description",
      dataIndex: "description",
      title: locales("description"),
      align: "center",
      ellipsis: true,
      customRender: ({ text }) =>
        text ? (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ) : (
          UNIFORM_TEXT.NULL
        ),
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
      width: 160,
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
          {hasAuth("system-manage:role-manage:edit") ? (
            <Button
              type="primary"
              ghost
              size="small"
              onClick={() => edit(record)}
            >
              {$t("common.edit")}
            </Button>
          ) : null}
          {hasAuth("system-manage:role-manage:delete") ? (
            <Popconfirm
              title={$t("common.confirmDelete")}
              onConfirm={() => handleDelete(record.id)}
            >
              <Button danger size="small">
                {$t("common.delete")}
              </Button>
            </Popconfirm>
          ) : null}
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
 * @description: 删除角色
 */
const handleDelete = (id: string) => {
  return new Promise(async (resolve) => {
    await delRole({ id }).then(({ error }) => {
      if (!error) {
        onDeleted();
      }
      resolve(true);
    });
  });
};

/**
 * @description: 编辑角色
 */
const edit = (record: Api.SystemManage.RoleManage) => {
  editingData.value = record;
  handleEdit(record.id);
};

/**
 * @description: 组件挂载
 */
onMounted(() => {
  fetchRoleRouteList();
});
</script>
