<script setup lang="tsx">
import { Avatar, Button, Popconfirm, Space, Tag } from 'ant-design-vue';
import dayjs from 'dayjs';
import { find, get } from 'lodash-es';
import { onMounted, ref } from 'vue';

import SvgIcon from '@/components/custom/svg-icon.vue';
import { BroswerIconMap, MethodOptions, OsIconMap } from '@/constants';
import { useAuth } from '@/hooks/business/auth';
import { useTable, useTableOperate, useTableScroll } from '@/hooks/common/table';
import { $t } from '@/locales';
import { delOperationLog, getOperationLogList, getUserList } from '@/service/api';

import HeaderSearch from './modules/header-search.vue';

// 权限钩子函数
const { hasAuth } = useAuth();

const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

// 国际化
const locales = (field: string) => $t(`page.systemManage.operationLog.${field}`);

/** @description: 获取用户列表 */
const userList = ref<Api.SystemManage.UserManage[]>([]);
const fetchUserList = async () => {
  const { data, error } = await getUserList({ current: 1, size: 999 });
  if (!error) {
    userList.value = data.records;
  }
};

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
  apiFn: getOperationLogList,
  apiParams: {
    current: 1,
    size: 10,
    userId: undefined,
    method: undefined,
    startTime: undefined,
    endTime: undefined,
  },
  columns: () => [
    {
      key: 'userId',
      dataIndex: 'userId',
      title: locales('userId'),
      align: 'center',
      fixed: 'left',
      customRender: ({ record }) => (
        <Space>
          <Avatar src={record.user.avatar} />
          {record.user.cnName}
        </Space>
      ),
    },
    {
      key: 'action',
      dataIndex: 'action',
      title: locales('action'),
      align: 'center',
      ellipsis: true,
    },
    {
      key: 'method',
      dataIndex: 'method',
      title: locales('method'),
      align: 'center',
      customRender: ({ text }) => {
        const color = get(find(MethodOptions, ['value', text]), 'key');
        return (
          <Tag bordered={false} color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      key: 'os',
      dataIndex: 'os',
      title: locales('os'),
      width: 120,
      align: 'center',
      customRender: ({ text }) => (
        <Space>
          {OsIconMap(text) ? <SvgIcon icon={OsIconMap(text)} class="text-base" /> : null}
          {text}
        </Space>
      ),
    },
    {
      key: 'browser',
      dataIndex: 'browser',
      title: locales('browser'),
      width: 120,
      align: 'center',
      customRender: ({ text }) => (
        <Space>
          {BroswerIconMap[text] ? <SvgIcon icon={BroswerIconMap[text]} class="text-base" /> : null}
          {text}
        </Space>
      ),
    },
    {
      key: 'ip',
      dataIndex: 'ip',
      title: locales('ip'),
      align: 'center',
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: $t('common.createdAt'),
      align: 'center',
      width: 160,
      customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      fixed: 'right',
      customRender: ({ record }) => (
        <div class="flex-center gap-8px">
          {hasAuth('system-manage:operation-log:delete') ? (
            <Popconfirm title={$t('common.confirmDelete')} onConfirm={() => handleDelete(record.id)}>
              <Button danger size="small">
                {$t('common.delete')}
              </Button>
            </Popconfirm>
          ) : null}
        </div>
      ),
    },
  ],
});

const { checkedRowKeys, rowSelection, onDeleted, onBatchDeleted } = useTableOperate(data, getData);

/** @description: 删除操作日志 */
const handleDelete = async (id: string) =>
  await delOperationLog({ ids: [id] }).then(({ error }) => {
    if (!error) {
      onDeleted();
    }
  });

/** @description: 批量删除日志 */
const handleBatchDelete = async () =>
  await delOperationLog({ ids: checkedRowKeys.value }).then(({ error }) => {
    if (!error) {
      onBatchDeleted();
    }
  });

/** @description: 组件挂载 */
onMounted(() => {
  fetchUserList();
});
</script>

<template>
  <PageContainer>
    <!-- 顶部搜索 -->
    <template #header>
      <HeaderSearch
        v-model:model="searchParams"
        :update-search-params="updateSearchParams"
        :user-list="userList"
        :locales="locales"
        @reset="resetSearchParams"
        @search="getDataByPage"
      />
    </template>
    <!-- 右侧操作区 -->
    <template #extra>
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :disabled-delete="checkedRowKeys.length === 0"
        :loading="loading"
        :add-btn="false"
        :batch-delete-btn="hasAuth('system-manage:operation-log:batch-delete')"
        @refresh="getData"
        @delete="handleBatchDelete"
      />
    </template>
    <!-- 表格 -->
    <ATable
      ref="tableWrapperRef"
      :columns="columns"
      :data-source="data"
      size="small"
      :row-selection="rowSelection"
      :scroll="scrollConfig"
      :loading="loading"
      row-key="id"
      :pagination="{
        ...mobilePagination,
        showTotal: total => `共 ${total} 条数据`,
      }"
      class="h-full"
    >
      <template #expandedRowRender="{ record }">
        <pre class="json-data">{{ JSON.stringify(record.params, null, 2) }}</pre>
      </template>
    </ATable>
  </PageContainer>
</template>
