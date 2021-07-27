<template>
  <div class="roleTable">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <!-- 列操作 -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <!-- 引入抽屉模态框 -->
    <FormDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // 引入表格组件
import { useMessage } from '/@/hooks/web/useMessage';
import { useDrawer } from '/@/components/Drawer'; //引入抽屉组件
import FormDrawer from './formDrawer.vue'; // 表单组件
import { columns, searchFormSchema } from './data'; // 表格配置项
import { getRoleList, roleDel } from '/@/api/system/roleManagement'; // 引入角色管理接口
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 引入字典列表接口
export default defineComponent({
  name: 'menuTable',
  components: { BasicTable, FormDrawer, TableAction },
  setup() {
    const { createMessage } = useMessage();
    const [registerDrawer, { openDrawer }] = useDrawer(); // 注册抽屉
    const [registerTable, { reload, getForm }] = useTable({
      // 注册表格
      title: '角色列表',
      api: getRoleList,
      rowKey: 'role_id',
      columns,
      formConfig: {
        labelWidth: 120,
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
        title: '操作',
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
      await roleDel({ ids: record.role_id });
      createMessage.success('删除成功！');
      await reload();
    }
    // 执行成功刷新列表
    async function handleSuccess() {
      await reload();
    }

    // 表格接口请求成功后触发
    async function onFetchSuccess() {
      //   请求状态
      const statusOptions = await dictionaryModel({ dict_coding: 'system_status' });
      getForm().updateSchema([
        {
          field: 'status',
          componentProps: {
            options: statusOptions,
          },
        },
      ]);
    }
    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      onFetchSuccess,
    };
  },
});
</script>
