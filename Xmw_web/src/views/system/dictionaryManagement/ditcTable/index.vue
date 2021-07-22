<template>
  <div class="ditcTable">
    <BasicTable
      @register="registerTable"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @row-dbClick="handleRowDbClick"
    >
      <template #dictCoding="{ record }">
        <Tag color="blue">
          {{ record.dictCoding }}
        </Tag>
      </template>
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
    <FormModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { columns, searchFormSchema } from './data';
import { useMessage } from '/@/hooks/web/useMessage';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { formatDictValue } from '/@/utils';
import {
  getDictionaryList,
  dictionaryDel,
  dictionaryModel,
} from '/@/api/system/dictionaryManagement'; // 引入字典列表接口
import FormModal from './formModal.vue';
import { useModal } from '/@/components/Modal';
import { Tag, Badge } from 'ant-design-vue';
export default defineComponent({
  name: 'ditcTable',
  components: { BasicTable, TableAction, FormModal, Tag, Badge },
  emits: ['dict-change'],
  setup(_, { emit }) {
    const { createMessage } = useMessage();
    const [registerModal, { openModal }] = useModal();
    const [registerTable, { reload, getDataSource, getSelectRowKeys, setSelectedRowKeys }] =
      useTable({
        title: '字典列表',
        titleHelpMessage: '对系统中经常使用的一些较为固定的数据进行维护',
        api: getDictionaryList,
        rowKey: 'dictionaryId',
        columns,
        rowSelection: { type: 'radio' },
        formConfig: {
          labelWidth: 120,
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
        // 请求之后对返回值进行处理
        afterFetch: handleAfterFetch,
      });
    //   请求状态
    let statusOptions = ref([]);
    async function initOptions() {
      statusOptions.value['status'] = await dictionaryModel({ dictCoding: 'system_status' });
    }
    initOptions();
    // 新增
    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      });
    }
    // 编辑
    function handleEdit(record: Recordable) {
      openModal(true, {
        record,
        isUpdate: true,
      });
    }
    //   删除
    async function handleDelete(record: Recordable) {
      await dictionaryDel({ ids: record.dictionaryId });
      createMessage.success('删除成功！');
      await reload();
      const list = getDataSource();
      if (list.length > 0) {
        setSelectedRowKeys([list[0].dictionaryId]);
      } else {
        setSelectedRowKeys([]);
      }
      emitDictChange();
    }
    // 新增编辑成功后的回调
    async function handleSuccess({ isUpdate, values }) {
      await reload();
      if (isUpdate) {
        setSelectedRowKeys([values.dictionaryId]);
      } else {
        const list = getDataSource();
        if (list.length > 0) {
          setSelectedRowKeys([list[0].dictionaryId]);
        } else {
          setSelectedRowKeys([]);
        }
      }
      emitDictChange();
    }
    function emitDictChange() {
      const selectedKeys = getSelectRowKeys();
      emit('dict-change', selectedKeys.length > 0 ? selectedKeys[0] : '');
    }
    // 勾选事件触发
    function handleSelectionChange() {
      emitDictChange();
    }
    //   单击行回调
    function handleRowClick(record: Recordable) {
      setSelectedRowKeys([record.dictionaryId]);
      emitDictChange();
    }
    //   双击行回调
    function handleRowDbClick(record: Recordable) {
      setSelectedRowKeys([record.dictionaryId]);
      emitDictChange();
    }
    function handleAfterFetch(data) {
      // 请求之后对返回值进行处理
      if (data.length > 0) {
        setSelectedRowKeys([data[0].dictionaryId]);
      } else {
        setSelectedRowKeys([]);
      }
      emitDictChange();
    }
    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSelectionChange,
      handleRowClick,
      handleRowDbClick,
      handleAfterFetch,
      statusOptions,
      formatDictValue,
    };
  },
});
</script>
