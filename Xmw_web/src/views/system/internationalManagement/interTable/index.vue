<template>
  <div class="internationalManagement">
    <BasicTable @register="registerTable">
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="handleCreate"
          v-auth="['system:inter:add']"
          >{{ t('router.common.add') }}</a-button
        >
      </template>
      <!-- 操作栏 -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: ['system:inter:edit'],
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: ['system:inter:delete'],
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: t('router.common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <!-- 表单模态框 -->
    <InterModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // 表格组件
import { columns, searchFormSchema } from './data'; // 表格配置项
import { useModal } from '/@/components/Modal'; // 模态框组件
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { getInternationalList, internationalDel } from '/@/api/system/internationalManagement'; // 国际化接口
import InterModal from './interModal.vue'; // 表单模态框
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置

const { t } = useI18n();
const { createMessage } = useMessage();
const [registerModal, { openModal }] = useModal(); // 注册模态框
const [registerTable, { reload }] = useTable({
  // 注册表格
  title: t('router.system.internationalManagement.title'),
  api: getInternationalList,
  rowKey: 'internation_id',
  columns,
  formConfig: {
    labelWidth: 120,
    baseColProps: { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 },
    schemas: searchFormSchema,
    autoSubmitOnEnter: true,
    resetButtonOptions: {
      preIcon: 'ant-design:delete-outlined',
    },
    submitButtonOptions: {
      preIcon: 'ant-design:search-outlined',
    },
  },
  showIndexColumn: false,
  useSearchForm: true,
  showTableSetting: true,
  bordered: true,
  actionColumn: {
    width: 80,
    title: t('router.common.action'),
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
});

// 新增操作
function handleCreate() {
  openModal(true, {
    isUpdate: false,
  });
}
// 编辑操作
function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
  });
}
//   删除操作
async function handleDelete(record: Recordable) {
  await internationalDel({
    ids: record.internation_id,
    internation_name: record.internation_name,
  });
  createMessage.success(t('router.common.deleteSuccess'));
  await reload();
}
// 新增编辑成功后的回调
async function handleSuccess() {
  await reload();
}
</script>
