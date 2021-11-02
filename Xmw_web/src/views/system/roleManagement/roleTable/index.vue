<template>
  <div class="roleTable">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleCreate"
          preIcon="ant-design:plus-outlined"
          v-auth="['system:role:add']"
          >{{ t('router.common.add') }}</a-button
        >
      </template>
      <!-- 列操作 -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: ['system:role:edit'],
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: ['system:role:delete'],
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
    <!-- 引入抽屉模态框 -->
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // 表格组件
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { useDrawer } from '/@/components/Drawer'; //抽屉组件
import RoleDrawer from './roleDrawer.vue'; // 表单组件
import { columns, searchFormSchema } from './data'; // 表格配置项
import { getRoleList, roleDel } from '/@/api/system/roleManagement'; // 角色管理接口
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置

const { t } = useI18n();
const { createMessage } = useMessage();
const [registerDrawer, { openDrawer }] = useDrawer(); // 注册抽屉
const [registerTable, { reload, getForm }] = useTable({
  // 注册表格
  title: t('router.system.roleManagement.title'),
  api: getRoleList,
  rowKey: 'role_id',
  columns,
  formConfig: {
    labelWidth: 80,
    schemas: searchFormSchema,
    autoSubmitOnEnter: true,
    baseColProps: { xs: 24, sm: 12, md: 12, lg: 12, xl: 8 },
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
  openDrawer(true, {
    isUpdate: false,
  });
}
// 编辑操作
function handleEdit(record: Recordable) {
  openDrawer(true, {
    record,
    isUpdate: true,
  });
}
// 删除操作
async function handleDelete(record: Recordable) {
  await roleDel({ ids: record.role_id, role_name: record.role_name });
  createMessage.success(t('router.common.deleteSuccess'));
  await reload();
}
// 执行成功刷新列表
async function handleSuccess() {
  await reload();
}

// 表格接口请求成功后触发
async function onFetchSuccess() {
  //   请求状态
  await dictionaryModel({ dict_coding: 'system_status' }).then((res) => {
    getForm().updateSchema([
      {
        field: 'status',
        componentProps: {
          options: res.system_status,
        },
      },
    ]);
  });
}
</script>
