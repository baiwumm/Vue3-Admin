<script setup lang="tsx">
import { Button, Popconfirm, Space, Tag, Tooltip } from 'ant-design-vue';
import dayjs from 'dayjs';
import { map } from 'lodash-es';
import { ref } from 'vue';

import SvgIcon from '@/components/custom/svg-icon.vue';
import { InternalizationLanguage } from '@/constants';
import { UNIFORM_TEXT } from '@/enum';
import { useAuth } from '@/hooks/business/auth';
import { useTable, useTableOperate, useTableScroll } from '@/hooks/common/table';
import { $t } from '@/locales';
import { delInternalization, getInternalizationList } from '@/service/api';

import HeaderSearch from './modules/header-search.vue';
import OperateDrawer from './modules/operate-drawer.vue';

// 权限钩子函数
const { hasAuth } = useAuth();

const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

// 编辑的数据
const editingData = ref<Api.SystemManage.SaveInternalization | null>(null);

// 国际化
const locales = (field: string) => $t(`page.systemManage.internalization.${field}`);

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  searchParams,
  updateSearchParams,
  resetSearchParams,
} = useTable({
  apiFn: getInternalizationList,
  apiParams: {
    name: undefined,
    zhCN: undefined,
    startTime: undefined,
    endTime: undefined,
  },
  columns: () => [
    {
      key: 'name',
      dataIndex: 'name',
      title: locales('name'),
      align: 'center',
      customRender: ({ text }) => (
        <Tag bordered={false}>
          <Space>
            <SvgIcon icon="ri:font-size" class="text-base" />
            {text}
          </Space>
        </Tag>
      ),
    },
    ...(map(InternalizationLanguage, language => {
      const key = language.replace('-', '');
      return {
        key,
        dataIndex: key,
        title: locales(key),
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
      };
    }) as AntDesign.TableColumn<AntDesign.TableDataWithIndex<Api.SystemManage.Internalization>>[]),
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
          {hasAuth('system-manage:internalization:edit') ? (
            <Button type="primary" ghost size="small" onClick={() => edit(record)}>
              {$t('common.edit')}
            </Button>
          ) : null}
          {hasAuth('system-manage:internalization:delete') ? (
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

const { drawerVisible, operateType, handleAdd, handleEdit, checkedRowKeys, onDeleted } = useTableOperate(data, getData);

/** @description: 删除国际化 */
const handleDelete = async (id: string) =>
  await delInternalization({ id }).then(({ error }) => {
    if (!error) {
      onDeleted();
    }
  });

/** @description: 编辑国际化 */
const edit = (record: Api.SystemManage.Internalization) => {
  editingData.value = record;
  handleEdit(record.id);
};
</script>

<template>
  <PageContainer>
    <!-- 顶部搜索 -->
    <template #header>
      <HeaderSearch
        v-model:model="searchParams"
        :update-search-params="updateSearchParams"
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
        :add-btn="hasAuth('system-manage:internalization:add')"
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
      :locales="locales"
      @submitted="getDataByPage"
    />
  </PageContainer>
</template>
