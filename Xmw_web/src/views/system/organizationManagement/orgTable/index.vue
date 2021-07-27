<template>
  <div class="orgTable">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <!-- 列插槽 -->
      <template #org_type="{ record }">
        <Tag :color="tagOptions[record.org_type]">
          {{ formatDictValue(orgTypeOptions['org_type'], record.org_type) }}
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
        <a-button type="primary" @click="expandAll" preIcon="ant-design:down-outlined"
          >展开</a-button
        >
        <a-button type="primary" @click="collapseAll" preIcon="ant-design:up-outlined"
          >折叠</a-button
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
          :dropDownActions="[
            {
              label: '添加子级',
              onClick: addChildOrg.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <!-- 表单模态框 -->
    <FormModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { columns, searchFormSchema } from './data'; // 引入列配置和搜索表单
import { useMessage } from '/@/hooks/web/useMessage';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { getOrganizationTree, organizationDel } from '/@/api/system/organizationManagement'; // 引入组织树接口
import FormModal from './formModal.vue'; // 表单模态框
import { Tag, Badge } from 'ant-design-vue';
import { formatDictValue } from '/@/utils';
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 引入字典列表接口
export default defineComponent({
  name: 'orgTable',
  components: { BasicTable, TableAction, FormModal, Tag, Badge },
  setup() {
    const { createMessage } = useMessage();
    // 注册useModal
    const [registerModal, { openModal }] = useModal();
    // 注册useTable
    const [registerTable, { reload, expandAll, collapseAll }] = useTable({
      title: '组织列表',
      titleHelpMessage: '组织架构是企业的流程运转、部门设置及职能规划等最基本的结构依据',
      isTreeTable: true,
      api: getOrganizationTree,
      rowKey: 'org_id',
      columns,
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
      pagination: false,
      actionColumn: {
        width: 120,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
    });

    //   请求状态和组织类型
    let statusOptions = ref([]),
      orgTypeOptions = ref([]),
      tagOptions = ref({ '1': 'green', '2': 'cyan', '3': 'blue', '4': 'purple' });
    async function initOptions() {
      statusOptions.value['status'] = await dictionaryModel({ dict_coding: 'system_status' });
      orgTypeOptions.value['org_type'] = await dictionaryModel({
        dict_coding: 'system_organization_type',
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
      await organizationDel({ ids: record.org_id });
      createMessage.success('删除成功！');
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
    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      statusOptions,
      orgTypeOptions,
      tagOptions,
      formatDictValue,
      expandAll,
      collapseAll,
      onFetchSuccess,
      addChildOrg,
    };
  },
});
</script>
