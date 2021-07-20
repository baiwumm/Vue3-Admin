<template>
  <div class="ditcItemTable">
    <BasicTable @register="registerTable">
      <template #status="{ record }">
        <Tag :color="record.status === '1' ? 'success' : 'error'">
          {{ formatDictValue(statusOptions['status'], record.status) }}
        </Tag>
      </template>
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button
          v-show="!!parentId"
          type="primary"
          @click="handleCreate"
          preIcon="ant-design:plus-outlined"
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
    <FormModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, watch, ref } from 'vue';
import { columns } from './data';
import { useMessage } from '/@/hooks/web/useMessage';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import FormModal from './formModal.vue';
import { useModal } from '/@/components/Modal';
import {
  getDictionaryList,
  dictionaryDel,
  dictionaryModel,
} from '/@/api/system/dictionaryManagement'; // 引入字典列表接口
import { Tag } from 'ant-design-vue';
import { formatDictValue } from '/@/utils';
const props = {
  parentId: { type: String },
};
export default defineComponent({
  name: 'ditcItemTable',
  components: { BasicTable, FormModal, TableAction, Tag },
  props,
  setup(props) {
    const { createMessage } = useMessage();
    const [registerModal, { openModal }] = useModal();
    const [registerTable, { reload }] = useTable({
      title: '字典子项列表',
      titleHelpMessage: '请先选中字典，再操作字典子项',
      api: getDictionaryList,
      rowKey: 'dictionaryId',
      columns,
      formConfig: {
        labelWidth: 120,
        autoSubmitOnEnter: true,
        resetButtonOptions: {
          preIcon: 'ant-design:delete-outlined',
        },
        submitButtonOptions: {
          preIcon: 'ant-design:search-outlined',
        },
      },
      immediate: false,
      showIndexColumn: false,
      useSearchForm: false,
      showTableSetting: true,
      bordered: true,
      actionColumn: {
        width: 80,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
      //   请求之前对参数进行处理
      beforeFetch: handleBeforeFetch,
    });
    //   请求状态
    let statusOptions = ref({});
    async function initOptions() {
      statusOptions.value['status'] = await dictionaryModel({ dictCoding: 'system_status' });
    }
    initOptions();
    //   新增
    function handleCreate() {
      openModal(true, {
        isUpdate: false,
        parentId: props.parentId,
      });
    }
    //   编辑
    function handleEdit(record: Recordable) {
      openModal(true, {
        record,
        isUpdate: true,
        parentId: props.parentId,
      });
    }
    //   删除
    async function handleDelete(record: Recordable) {
      await dictionaryDel({ ids: record.dictionaryId });
      createMessage.success('删除成功！');
      await reload();
    }
    function handleSuccess() {
      reload();
    }
    //   请求之前对参数进行处理
    function handleBeforeFetch(params) {
      return Object.assign(params, { parentId: props.parentId });
    }
    // 监听字典列表的parentId
    watch(
      () => props.parentId,
      () => {
        nextTick(() => {
          reload();
        });
      }
    );
    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      statusOptions,
      formatDictValue,
    };
  },
});
</script>
