<script setup lang="tsx">
import { Button, Popconfirm, Space, Tag, Tooltip } from 'ant-design-vue';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';

import SvgIcon from '@/components/custom/svg-icon.vue';
import { I18nRole } from '@/constants/i18n';
import { UNIFORM_TEXT } from '@/enum';
import { ROLE } from '@/enum/auth';
import { I18N_COMMON, I18N_FORM } from '@/enum/i18n';
import { useAuth } from '@/hooks/business/auth';
import { useTable, useTableOperate, useTableScroll } from '@/hooks/common/table';
import { $t } from '@/locales';
import { delRole, fetchRoleRoutes, getRoleList } from '@/service/api';

import HeaderSearch from './modules/header-search.vue';
import OperateDrawer from './modules/operate-drawer.vue';

// 权限钩子函数
const { hasAuth } = useAuth();

/** @description: 获取权限路由 */
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
      key: 'name',
      dataIndex: 'name',
      title: I18nRole('name'),
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
      key: 'code',
      dataIndex: 'code',
      title: I18nRole('code'),
      align: 'center',
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
      key: 'description',
      dataIndex: 'description',
      title: I18nRole('description'),
      align: 'center',
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
      key: 'sort',
      dataIndex: 'sort',
      title: $t(I18N_FORM.SORT),
      align: 'center',
      customRender: ({ text }) => (
        <Tag bordered={false} color="success">
          {text}
        </Tag>
      ),
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: $t(I18N_COMMON.CREATEDAT),
      align: 'center',
      width: 160,
      customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'operate',
      title: $t(I18N_COMMON.OPERATE),
      align: 'center',
      width: 130,
      fixed: 'right',
      customRender: ({ record }) => (
        <div class="flex-center gap-8px">
          {hasAuth(ROLE.EDIT) ? (
            <Button type="primary" ghost size="small" onClick={() => edit(record)}>
              {$t(I18N_COMMON.EDIT)}
            </Button>
          ) : null}
          {hasAuth(ROLE.DELETE) ? (
            <Popconfirm title={$t(I18N_COMMON.CONFIRM_DELETE)} onConfirm={() => handleDelete(record.id)}>
              <Button danger size="small">
                {$t(I18N_COMMON.DELETE)}
              </Button>
            </Popconfirm>
          ) : null}
        </div>
      ),
    },
  ],
});

const { drawerVisible, operateType, handleAdd, handleEdit, checkedRowKeys, onDeleted } = useTableOperate(data, getData);

/** @description: 删除角色 */
const handleDelete = async (id: string) =>
  await delRole({ id }).then(({ error }) => {
    if (!error) {
      onDeleted();
    }
  });

/** @description: 编辑角色 */
const edit = (record: Api.SystemManage.RoleManage) => {
  editingData.value = record;
  handleEdit(record.id);
};

/** @description: 组件挂载 */
onMounted(() => {
  fetchRoleRouteList();
});
</script>

<template>
  <PageContainer>
    <template #header>
      <!-- 顶部搜索 -->
      <HeaderSearch
        v-model:model="searchParams"
        :update-search-params="updateSearchParams"
        @reset="resetSearchParams"
        @search="getDataByPage"
      />
    </template>
    <template #extra>
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :disabled-delete="checkedRowKeys.length === 0"
        :loading="loading"
        :add-btn="hasAuth(ROLE.ADD)"
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
      :pagination="{
        ...mobilePagination,
        showTotal: total => `共 ${total} 条数据`,
      }"
      class="h-full"
    />
    <!-- 操作抽屉 -->
    <OperateDrawer
      v-model:visible="drawerVisible"
      :operate-type="operateType"
      :row-data="editingData"
      :data-source="data"
      :role-route-list="roleRouteList"
      @submitted="getDataByPage"
    />
  </PageContainer>
</template>
