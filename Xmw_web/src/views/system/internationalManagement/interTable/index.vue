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
          >新增</a-button
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
                title: '是否确认删除',
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

<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // 表格组件
import { columns } from './data'; // 表格配置项
import { useModal } from '/@/components/Modal'; // 模态框组件
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { getInternationalList, internationalDel } from '/@/api/system/internationalManagement'; // 国际化接口
import InterModal from './interModal.vue'; // 表单模态框
export default defineComponent({
  name: 'interTable',
  components: { BasicTable, InterModal, TableAction },
  setup() {
    const { createMessage } = useMessage();
    const [registerModal, { openModal }] = useModal(); // 注册模态框
    const [registerTable, { reload }] = useTable({
      // 注册表格
      title: '国际化',
      api: getInternationalList,
      rowKey: 'internation_id',
      columns,
      showIndexColumn: false,
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
      createMessage.success('删除成功！');
      await reload();
    }
    // 新增编辑成功后的回调
    async function handleSuccess() {
      await reload();
    }
    return {
      registerModal,
      registerTable,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
    };
  },
});
</script>
