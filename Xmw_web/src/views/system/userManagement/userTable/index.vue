<template>
  <div class="userTable">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <!-- 性别-插槽 -->
      <template #sex="{ record }">
        <Tag color="processing">{{ formatDictValue(options['sex'], record.sex) }}</Tag>
      </template>
      <!-- 状态-插槽 -->
      <template #status="{ record }">
        <Badge
          :status="record.status === '1' ? 'success' : 'error'"
          :text="formatDictValue(options['status'], record.status)"
        >
        </Badge>
      </template>
      <!-- 角色名称-插槽 -->
      <template #role_name="{ record }">
        <Space>
          <Tag color="purple" v-for="(item, index) in record.role_name.split(',')" :key="index">{{
            item
          }}</Tag>
        </Space>
      </template>
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="handleCreate"
          v-auth="['system:user:add']"
          >{{ t('router.common.add') }}</a-button
        >
      </template>
      <!-- 操作栏 -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: ['system:user:edit'],
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: ['system:user:delete'],
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
    <!-- 引入抽屉模态框 -->
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { useMessage } from '/@/hooks/web/useMessage'; // 提示模态框
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // table组件
import { columns, searchFormSchema } from './data'; // 表格配置项
import { getUserList, userDel } from '/@/api/system/userManagement'; // 用户接口
import { useDrawer } from '/@/components/Drawer'; //抽屉组件
import UserDrawer from './userDrawer.vue'; // 表单组件
import { Tag, Badge, Space } from 'ant-design-vue';
import { ref } from 'vue';
import { formatDictValue } from '/@/utils';
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
const { createMessage } = useMessage();
const [registerDrawer, { openDrawer }] = useDrawer(); // 注册抽屉
const [registerTable, { reload, getForm }] = useTable({
  // 注册表格
  title: t('router.system.userManagement.title'),
  api: getUserList,
  rowKey: 'user_id',
  columns,
  formConfig: {
    labelWidth: 100,
    baseColProps: { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 },
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
    width: 120,
    title: t('router.common.action'),
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
});

//  请求字典数据
let options = ref([]);
async function initOptions() {
  let params = { dict_coding: 'system_status,system_sex' };
  await dictionaryModel(params).then((res) => {
    options.value['status'] = res.system_status;
    options.value['sex'] = res.system_sex;
  });
}
initOptions();
// 新增操作
function handleCreate() {
  openDrawer(true, {
    isUpdate: false,
  });
}
// 编辑操作
function handleEdit(record: Recordable) {
  openDrawer(true, {
    record,
    isUpdate: true,
  });
}
// 删除操作
async function handleDelete(record: Recordable) {
  if (record.user_name == 'admin') {
    createMessage.error(t('router.system.userManagement.admin'));
    return;
  }
  await userDel({ ids: record.user_id, cn_name: record.cn_name });
  createMessage.success(t('router.common.deleteSuccess'));
  await reload();
}
// 执行成功刷新列表
async function handleSuccess() {
  await reload();
}

// 表格接口请求成功后触发
async function onFetchSuccess() {
  await dictionaryModel({ dict_coding: 'system_status' }).then((res) => {
    getForm().updateSchema([
      {
        field: 'status',
        componentProps: {
          options: res.system_status,
        },
      },
    ]);
  });
}
</script>
