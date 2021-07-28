<template>
  <div class="postTable">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #status="{ record }">
        <Badge
          :status="record.status === '1' ? 'success' : 'error'"
          :text="formatDictValue(statusOptions['status'], record.status)"
        >
        </Badge>
      </template>
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"
          >新增</a-button
        >
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
    <!-- 表单模态框 -->
    <PostModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { columns, searchFormSchema } from './data'; //表格配置项
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // 表格组件
import { formatDictValue } from '/@/utils';
import { useModal } from '/@/components/Modal'; // 模态框组件
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { getPostTree, postDel } from '/@/api/system/postManagement'; // 岗位树接口
import { Badge } from 'ant-design-vue';
import PostModal from './postModal.vue'; // 表单模态框
export default defineComponent({
  name: 'postTable',
  components: { BasicTable, TableAction, PostModal, Badge },
  setup() {
    const { createMessage } = useMessage();
    const [registerModal, { openModal }] = useModal(); // 注册模态框
    const [registerTable, { reload, expandAll }] = useTable({
      // 注册表格
      title: '岗位列表',
      titleHelpMessage:
        '岗位管理是以组织中的岗位为对象，科学地进行岗位设置、岗位分析、岗位描述、岗位监控和岗位评估等一系列活动的管理过程',
      isTreeTable: true,
      api: getPostTree,
      rowKey: 'post_id',
      columns,
      formConfig: {
        labelWidth: 80,
        baseColProps: { xs: 24, sm: 12, md: 12, lg: 12, xl: 8 },
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
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
    });
    //   请求字典数据
    let statusOptions = ref([]);
    async function initOptions() {
      statusOptions.value['status'] = await dictionaryModel({ dict_coding: 'system_status' });
    }
    initOptions();
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
      await postDel({ ids: record.post_id });
      createMessage.success('删除成功！');
      openModal(false, {
        isDel: true,
      });
      await reload();
    }
    // 新增编辑成功后的回调
    async function handleSuccess() {
      await reload();
    }
    // 表格接口请求成功后触发,默认展开所有
    function onFetchSuccess() {
      nextTick(expandAll);
    }
    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      statusOptions,
      formatDictValue,
      onFetchSuccess,
    };
  },
});
</script>