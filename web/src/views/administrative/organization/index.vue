<script setup lang="tsx">
import { Button, Popconfirm, Space, Tag, Tooltip } from 'ant-design-vue';
import dayjs from 'dayjs';
import { map } from 'lodash-es';
import { ref } from 'vue';

import SvgIcon from '@/components/custom/svg-icon.vue';
import { I18nOrg } from '@/constants/i18n';
import { UNIFORM_TEXT } from '@/enum';
import { ORGANIZATION } from '@/enum/auth';
import { I18N_COMMON, I18N_FORM } from '@/enum/i18n';
import { useAuth } from '@/hooks/business/auth';
import { useTable, useTableOperate, useTableScroll } from '@/hooks/common/table';
import { $t } from '@/locales';
import { delOrganazation, getOrganazationList } from '@/service/api';

import HeaderSearch from './modules/header-search.vue';
import OperateDrawer from './modules/operate-drawer.vue';

// 权限钩子函数
const { hasAuth } = useAuth();

// 表格滚动配置
const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

// 编辑的数据
const editingData = ref<Api.Administrative.Organization | null>(null);

const { columns, columnChecks, data, getData, getDataByPage, loading, searchParams, resetSearchParams } = useTable({
  apiFn: getOrganazationList,
  apiParams: {
    name: undefined,
    code: undefined,
  },
  columns: () => [
    {
      key: 'name',
      dataIndex: 'name',
      title: I18nOrg('name'),
      customRender: ({ text, record }) => (
        <Tag bordered={false}>
          <Space>
            <SvgIcon icon={record.icon || 'ri:exchange-2-line'} class="text-base" />
            {text}
          </Space>
        </Tag>
      ),
    },
    {
      key: 'code',
      dataIndex: 'code',
      title: I18nOrg('code'),
      align: 'center',
      customRender: ({ text }) => (
        <Tag bordered={false} color="processing">
          {text}
        </Tag>
      ),
    },
    {
      key: 'posts',
      dataIndex: 'posts',
      title: I18nOrg('posts'),
      align: 'center',
      customRender: ({ text: posts }) =>
        posts?.length ? (
          <Space direction="vertical">
            {map(posts, post => (
              <Tag bordered={false}>
                <Space>
                  <SvgIcon icon="ri:contacts-book-3-line" class="text-base" />
                  {post.name}
                </Space>
              </Tag>
            ))}
          </Space>
        ) : (
          UNIFORM_TEXT.NULL
        ),
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: I18nOrg('description'),
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
          {hasAuth(ORGANIZATION.EDIT) ? (
            <Button type="primary" ghost size="small" onClick={() => edit(record)}>
              {$t(I18N_COMMON.EDIT)}
            </Button>
          ) : null}
          {hasAuth(ORGANIZATION.DELETE) ? (
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

/** @description: 删除组织 */
const handleDelete = async (id: string) =>
  await delOrganazation({ id }).then(({ error }) => {
    if (!error) {
      onDeleted();
    }
  });

/** @description: 编辑组织 */
const edit = (record: Api.Administrative.Organization) => {
  editingData.value = record;
  handleEdit(record.id);
};
</script>

<template>
  <PageContainer>
    <template #header>
      <!-- 顶部搜索 -->
      <HeaderSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    </template>
    <template #extra>
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :disabled-delete="checkedRowKeys.length === 0"
        :loading="loading"
        :add-btn="hasAuth(ORGANIZATION.ADD)"
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
      :data-source="data"
      @submitted="getDataByPage"
    />
  </PageContainer>
</template>
