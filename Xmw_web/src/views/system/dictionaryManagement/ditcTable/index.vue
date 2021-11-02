<template>
  <div class="ditcTable">
    <BasicTable
      @register="registerTable"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @row-dbClick="handleRowDbClick"
    >
      <!-- 字典编码-插槽 -->
      <template #dict_coding="{ record }">
        <Tag color="blue">
          {{ record.dict_coding }}
        </Tag>
      </template>
      <!-- 状态-插槽 -->
      <template #status="{ record }">
        <Badge
          :status="record.status === '1' ? 'success' : 'error'"
          :text="formatDictValue(statusOptions['status'], record.status)"
        >
        </Badge>
      </template>
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="handleCreate"
          v-auth="['system:dictionary:ditc:add']"
          >{{ t('router.common.add') }}</a-button
        >
      </template>
      <!-- 操作栏 -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: ['system:dictionary:ditc:edit'],
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: ['system:dictionary:ditc:delete'],
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: t('router.common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          :stopButtonPropagation="true"
        />
      </template>
    </BasicTable>
    <DictModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { columns, searchFormSchema } from './data'; // 表格配置项
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // 表格组件
import { formatDictValue } from '/@/utils';
import {
  getDictionaryList,
  dictionaryDel,
  dictionaryModel,
} from '/@/api/system/dictionaryManagement'; // 引入字典列表接口
import DictModal from './dictModal.vue'; //表单组件
import { useModal } from '/@/components/Modal'; // 模态框组件
import { Tag, Badge } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置

const emit = defineEmits(['dict-change']);
const { t } = useI18n();
const { createMessage } = useMessage();
const [registerModal, { openModal }] = useModal(); // 注册模态框
const [registerTable, { reload, getDataSource, getSelectRowKeys, setSelectedRowKeys }] = useTable({
  // 注册表格
  title: t('router.system.dictionaryManagement.title'),
  api: getDictionaryList,
  rowKey: 'dictionary_id',
  columns,
  rowSelection: { type: 'radio' },
  formConfig: {
    labelWidth: 100,
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
    title: t('router.common.action'),
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
  // 请求之后对返回值进行处理
  afterFetch: handleAfterFetch,
});
//   请求字典数据
let statusOptions = ref([]);
async function initOptions() {
  await dictionaryModel({ dict_coding: 'system_status' }).then((res) => {
    statusOptions.value['status'] = res.system_status;
  });
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
  await dictionaryDel({ ids: record.dictionary_id, dict_name: record.dict_name });
  createMessage.success(t('router.common.deleteSuccess'));
  await reload();
  const list = getDataSource();
  if (list.length > 0) {
    setSelectedRowKeys([list[0].dictionary_id]);
  } else {
    setSelectedRowKeys([]);
  }
  emitDictChange();
}
// 新增编辑成功后的回调
async function handleSuccess({ isUpdate, values }) {
  await reload();
  if (isUpdate) {
    setSelectedRowKeys([values.dictionary_id]);
  } else {
    const list = getDataSource();
    if (list.length > 0) {
      setSelectedRowKeys([list[0].dictionary_id]);
    } else {
      setSelectedRowKeys([]);
    }
  }
  emitDictChange();
}
function emitDictChange() {
  const selectedKeys = getSelectRowKeys();
  emit('dict-change', selectedKeys.length > 0 ? selectedKeys[0] : '0');
}
// 勾选事件触发
function handleSelectionChange() {
  emitDictChange();
}
//   单击行回调
function handleRowClick(record: Recordable) {
  setSelectedRowKeys([record.dictionary_id]);
  emitDictChange();
}
//   双击行回调
function handleRowDbClick(record: Recordable) {
  setSelectedRowKeys([record.dictionary_id]);
  emitDictChange();
}
function handleAfterFetch(data) {
  // 请求之后对返回值进行处理
  if (data.length > 0) {
    setSelectedRowKeys([data[0].dictionary_id]);
  } else {
    setSelectedRowKeys([]);
  }
  emitDictChange();
}
</script>
