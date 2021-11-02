<template>
  <div class="orgTable">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <!-- 列插槽 -->
      <template #org_type="{ record }">
        <Tag :color="tagOptions[record.org_type]">{{
          formatDictValue(orgTypeOptions['org_type'], record.org_type)
        }}</Tag>
      </template>
      <template #status="{ record }">
        <Badge
          :status="record.status === '1' ? 'success' : 'error'"
          :text="formatDictValue(statusOptions['status'], record.status)"
        ></Badge>
      </template>
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="handleCreate"
          v-auth="['system:organization:add']"
          >{{ t('router.common.add') }}</a-button
        >
        <a-button
          type="primary"
          @click="expandAll"
          preIcon="ant-design:down-outlined"
          v-auth="['system:organization:expand']"
          >{{ t('router.common.expand') }}</a-button
        >
        <a-button
          type="primary"
          @click="collapseAll"
          preIcon="ant-design:up-outlined"
          v-auth="['system:organization:collapse']"
          >{{ t('router.common.collapse') }}</a-button
        >
      </template>
      <!-- 操作栏 -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: ['system:organization:edit'],
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: ['system:organization:delete'],
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
              auth: ['system:organization:addChild'],
              label: t('router.common.addChild'),
              onClick: addChildOrg.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <!-- 表单模态框 -->
    <OrgModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, reactive } from 'vue';
import { columns, searchFormSchema } from './data'; // 列配置和搜索表单
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // 表格组件
import { useModal } from '/@/components/Modal';
import { getOrganizationTree, organizationDel } from '/@/api/system/organizationManagement'; // 组织树接口
import OrgModal from './orgModal.vue'; // 表单模态框
import { Tag, Badge } from 'ant-design-vue';
import { formatDictValue } from '/@/utils';
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置

const { t } = useI18n();
const { createMessage } = useMessage();
// 注册useModal
const [registerModal, { openModal }] = useModal();
// 注册useTable
const [registerTable, { reload, expandAll, collapseAll }] = useTable({
  title: t('router.system.organizationManagement.title'),
  isTreeTable: true,
  api: getOrganizationTree,
  rowKey: 'org_id',
  columns,
  formConfig: {
    labelWidth: 160,
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
let statusOptions = ref([]),
  orgTypeOptions = ref([]),
  tagOptions = reactive({ '1': 'green', '2': 'cyan', '3': 'blue', '4': 'purple' });
async function initOptions() {
  let params = {
    dict_coding: 'system_status,system_organization_type',
  };
  await dictionaryModel(params).then((res) => {
    statusOptions.value['status'] = res.system_status;
    orgTypeOptions.value['org_type'] = res.system_organization_type;
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
  await organizationDel({ ids: record.org_id, org_name: record.org_name });
  createMessage.success(t('router.common.deleteSuccess'));
  openModal(false, {
    isDel: true,
  });
  await reload();
}
// 添加子级
function addChildOrg(record: Recordable) {
  openModal(true, {
    parent_id: record.org_id,
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
