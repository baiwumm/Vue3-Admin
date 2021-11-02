<template>
  <div class="ditcItemTable" style="padding: 16px 16px 16px 0">
    <BasicTable @register="registerTable">
      <template #status="{ record }">
        <Badge
          :status="record.status === '1' ? 'success' : 'error'"
          :text="formatDictValue(statusOptions['status'], record.status)"
        ></Badge>
      </template>
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button
          v-show="!!parent_id && parent_id != '0'"
          type="primary"
          @click="handleCreate"
          preIcon="ant-design:plus-outlined"
          v-auth="['system:dictionary:ditcItem:add']"
          >{{ t('router.common.add') }}</a-button
        >
      </template>
      <!-- 操作栏 -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: ['system:dictionary:ditcItem:edit'],
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: ['system:dictionary:ditcItem:delete'],
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
    <DitcItemModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, watch, ref, defineProps } from 'vue';
import { columns } from './data'; //表格列配置项
import { useMessage } from '/@/hooks/web/useMessage';
import { BasicTable, useTable, TableAction } from '/@/components/Table'; //表格组件
import DitcItemModal from './ditcItemModal.vue'; // 表单组件
import { useModal } from '/@/components/Modal'; // 模态框组件
import {
  getDictionaryList,
  dictionaryDel,
  dictionaryModel,
} from '/@/api/system/dictionaryManagement'; // 引入字典列表接口
import { Badge } from 'ant-design-vue';
import { formatDictValue } from '/@/utils';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置

const props = defineProps({
  parent_id: { type: String },
});
const { t } = useI18n();
const { createMessage } = useMessage();
const [registerModal, { openModal }] = useModal(); // 注册模态框
const [registerTable, { reload }] = useTable({
  // 注册表格
  title: t('router.system.dictionaryManagement.dictItemtitle'),
  api: getDictionaryList,
  rowKey: 'dictionary_id',
  columns,
  immediate: false,
  showIndexColumn: false,
  useSearchForm: false,
  showTableSetting: true,
  bordered: true,
  actionColumn: {
    width: 80,
    title: t('router.common.action'),
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
  //   请求之前对参数进行处理
  beforeFetch: handleBeforeFetch,
});
//   请求字典数据
let statusOptions = ref({});
async function initOptions() {
  await dictionaryModel({ dict_coding: 'system_status' }).then((res) => {
    statusOptions.value['status'] = res.system_status;
  });
}
initOptions();
//   新增操作
function handleCreate() {
  openModal(true, {
    isUpdate: false,
    parent_id: props.parent_id,
  });
}
//   编辑操作
function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    parent_id: props.parent_id,
  });
}
//   删除操作
async function handleDelete(record: Recordable) {
  await dictionaryDel({ ids: record.dictionary_id, dictionary_label: record.dictionary_label });
  createMessage.success(t('router.common.deleteSuccess'));
  await reload();
}
// 重新请求列表
function handleSuccess() {
  reload();
}
//   请求之前对参数进行处理
function handleBeforeFetch(params) {
  return Object.assign(params, { parent_id: props.parent_id });
}
// 监听字典列表的parent_id
watch(
  () => props.parent_id,
  () => {
    nextTick(() => {
      reload();
    });
  }
);
</script>
