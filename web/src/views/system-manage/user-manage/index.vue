<script setup lang="tsx">
import { Avatar, Button, Popconfirm, Space, Tag, Tooltip } from 'ant-design-vue';
import dayjs from 'dayjs';
import { eq, find, get } from 'lodash-es';
import { ref } from 'vue';

import SvgIcon from '@/components/custom/svg-icon.vue';
import { StatueOptions } from '@/constants';
import { I18nUser } from '@/constants/i18n';
import { SEX, STATUS, UNIFORM_TEXT } from '@/enum';
import { USER } from '@/enum/auth';
import { I18N_COMMON, I18N_FORM } from '@/enum/i18n';
import { useAuth } from '@/hooks/business/auth';
import { useTable, useTableOperate, useTableScroll } from '@/hooks/common/table';
import { $t } from '@/locales';
import { delUser, getUserList } from '@/service/api';

import HeaderSearch from './modules/header-search.vue';
import OperateModal from './modules/operate-modal.vue';

// 权限钩子函数
const { hasAuth } = useAuth();

// 编辑的数据
const editingData = ref<Api.SystemManage.UserManage | null>(null);

const { tableWrapperRef, scrollConfig } = useTableScroll(1200);

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
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
      key: 'userName',
      dataIndex: 'userName',
      title: I18nUser('userName'),
      width: 120,
      align: 'center',
      fixed: 'left',
      customRender: ({ text }) => (
        <Tag bordered={false} color="purple">
          <Space>
            <SvgIcon icon="ri:user-line" class="text-base" />
            {text}
          </Space>
        </Tag>
      ),
    },
    {
      key: 'cnName',
      dataIndex: 'cnName',
      title: I18nUser('cnName'),
      width: 100,
      align: 'center',
    },
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: I18nUser('avatar'),
      width: 60,
      align: 'center',
      customRender: ({ text }) => <Avatar src={text} />,
    },
    {
      key: 'roleId',
      dataIndex: 'roleId',
      title: I18nUser('roleId'),
      width: 120,
      align: 'center',
      customRender: ({ record }) => (
        <Tag bordered={false}>
          <Space>
            <SvgIcon icon="carbon:user-role" class="text-base" />
            {record.role.name}
          </Space>
        </Tag>
      ),
    },
    {
      key: 'orgId',
      dataIndex: 'orgId',
      title: I18nUser('orgId'),
      width: 120,
      align: 'center',
      customRender: ({ record }) => (
        <Tag bordered={false}>
          <Space>
            <SvgIcon icon={record.organization.icon || 'ri:exchange-2-line'} class="text-base" />
            {record.organization.name}
          </Space>
        </Tag>
      ),
    },
    {
      key: 'postId',
      dataIndex: 'postId',
      title: I18nUser('postId'),
      width: 120,
      align: 'center',
      customRender: ({ record }) => (
        <Tag bordered={false}>
          <Space>
            <SvgIcon icon="ri:contacts-book-3-line" class="text-base" />
            {record.post.name}
          </Space>
        </Tag>
      ),
    },
    {
      key: 'sex',
      dataIndex: 'sex',
      title: I18nUser('sex'),
      width: 80,
      align: 'center',
      customRender: ({ text }) => (
        <Tag bordered={false} color={eq(text, SEX.MALE) ? 'processing' : 'magenta'}>
          <SvgIcon icon={eq(text, SEX.MALE) ? 'ri:men-line' : 'ri:women-line'} class="inline-block text-lg" />
        </Tag>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: $t(I18N_FORM.STATUS),
      width: 80,
      align: 'center',
      customRender: ({ text }) => (
        <Tag bordered={false} color={eq(text, STATUS.ACTIVE) ? 'processing' : 'error'}>
          {get(find(StatueOptions, ['value', text]), 'label', UNIFORM_TEXT.NULL)}
        </Tag>
      ),
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: I18nUser('phone'),
      width: 100,
      align: 'center',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: I18nUser('email'),
      align: 'center',
      width: 120,
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
      width: 60,
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
          {hasAuth(USER.EDIT) ? (
            <Button type="primary" ghost size="small" onClick={() => edit(record)}>
              {$t(I18N_COMMON.EDIT)}
            </Button>
          ) : null}
          {hasAuth(USER.DELETE) ? (
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

/** @description: 删除用户 */
const handleDelete = async (id: string) =>
  await delUser({ id }).then(({ error }) => {
    if (!error) {
      onDeleted();
    }
  });

/** @description: 编辑岗位 */
const edit = (record: Api.SystemManage.UserManage) => {
  editingData.value = record;
  handleEdit(record.id);
};
</script>

<template>
  <PageContainer>
    <!-- 顶部搜索 -->
    <template #header>
      <HeaderSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    </template>
    <!-- 右侧操作区 -->
    <template #extra>
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :disabled-delete="checkedRowKeys.length === 0"
        :loading="loading"
        :add-btn="hasAuth(USER.ADD)"
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
    <!-- 操作弹窗 -->
    <OperateModal
      v-model:visible="drawerVisible"
      :operate-type="operateType"
      :row-data="editingData"
      @submitted="getDataByPage"
    />
  </PageContainer>
</template>
