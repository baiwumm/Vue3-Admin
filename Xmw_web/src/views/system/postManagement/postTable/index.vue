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
        <a-button
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="handleCreate"
          v-auth="['system:post:add']"
          >{{ t('router.common.add') }}</a-button
        >
        <a-button
          type="primary"
          @click="expandAll"
          preIcon="ant-design:down-outlined"
          v-auth="['system:menu:expand']"
          >{{ t('router.common.expand') }}</a-button
        >
        <a-button
          type="primary"
          @click="collapseAll"
          preIcon="ant-design:up-outlined"
          v-auth="['system:menu:collapse']"
          >{{ t('router.common.collapse') }}</a-button
        >
      </template>
      <!-- 操作栏 -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: ['system:post:edit'],
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: ['system:post:delete'],
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: t('router.common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          :dropDownActions="[
            {
              auth: ['system:post:addChild'],
              label: t('router.common.addChild'),
              onClick: addChildPost.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <!-- 表单模态框 -->
    <PostModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { columns, searchFormSchema } from './data'; //表格配置项
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // 表格组件
import { formatDictValue } from '/@/utils';
import { useModal } from '/@/components/Modal'; // 模态框组件
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { getPostTree, postDel } from '/@/api/system/postManagement'; // 岗位树接口
import { Badge } from 'ant-design-vue';
import PostModal from './postModal.vue'; // 表单模态框
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置

const { t } = useI18n();
const { createMessage } = useMessage();
const [registerModal, { openModal }] = useModal(); // 注册模态框
const [registerTable, { reload, expandAll, collapseAll }] = useTable({
  // 注册表格
  title: t('router.system.postManagement.title'),
  isTreeTable: true,
  api: getPostTree,
  rowKey: 'post_id',
  columns,
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
  pagination: false,
  actionColumn: {
    width: 120,
    title: t('router.common.action'),
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
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
  await postDel({ ids: record.post_id, post_name: record.post_name });
  createMessage.success(t('router.common.deleteSuccess'));
  openModal(false, {
    isDel: true,
  });
  await reload();
}
// 添加子级
function addChildPost(record: Recordable) {
  openModal(true, {
    parent_id: record.post_id,
    isUpdate: false,
  });
}
// 新增编辑成功后的回调
async function handleSuccess() {
  await reload();
}
// 表格接口请求成功后触发,默认展开所有
function onFetchSuccess() {
  nextTick(expandAll);
}
</script>