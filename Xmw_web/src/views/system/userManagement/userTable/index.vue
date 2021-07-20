<template>
  <BasicTable @register="registerTable">
    <template #sex="{ record }">
      <Tag color="processing">{{ { 0: '女', 1: '男' }[record.sex] }}</Tag>
    </template>
    <!-- 工具栏 -->
    <template #toolbar>
      <a-button type="primary" preIcon="ant-design:plus-outlined">新增</a-button>
    </template>
    <!-- 操作栏 -->
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
</template>

<script lang="ts">
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // 引入table组件
import { columns, searchFormSchema } from './data';
import { getUserList } from '/@/api/system/userManagement'; // 引入用户接口
import { Tag } from 'ant-design-vue';
import { defineComponent, nextTick, ref, watch } from 'vue';
import { useModal } from '/@/components/Modal';
export default defineComponent({
  name: 'UserTable',
  components: { BasicTable, TableAction, Tag },
  setup() {
    const [registerTable] = useTable({
      title: '用户列表 ',
      api: getUserList,
      rowKey: 'userId',
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        resetButtonOptions: {
          // @ts-ignore
          preIcon: 'ant-design:delete-outlined',
        },
        submitButtonOptions: {
          // @ts-ignore
          preIcon: 'ant-design:search-outlined',
        },
      },
      showIndexColumn: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      actionColumn: {
        width: 120,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
    });
    function handleEdit(record: Recordable) {}
    function handleDelete(record: Recordable) {}
    return {
      registerTable,
      handleEdit,
      handleDelete,
    };
  },
});
</script>

<style>
</style>
