<template>
  <div class="news-container">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <!-- 标题-插槽 -->
      <template #title="{ record }">
        <a-button type="link" @click="showNewsDetails(record)">{{ record.title }}</a-button>
      </template>
      <!-- 状态-插槽 -->
      <template #status="{ record }">
        <Badge
          :status="record.status === '1' ? 'success' : 'error'"
          :text="formatDictValue(options['status'], record.status)"
        ></Badge>
      </template>
      <!-- 类型-插槽 -->
      <template #type="{ record }">
        <Tag :color="record.type === 'news' ? 'green' : 'cyan'">{{
          formatDictValue(options['type'], record.type)
        }}</Tag>
      </template>
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate">{{
          t('router.common.add')
        }}</a-button>
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
                title: t('router.common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <!-- 表单模态框 -->
    <NewsModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'; // 引入 Composition-API
import { BasicTable, useTable, TableAction } from '/@/components/Table'; // 表格组件
import { columns, searchFormSchema } from './data'; // 表格配置项
import { useModal } from '/@/components/Modal'; // 模态框组件
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { getNewsList, newsDel } from '/@/api/integrated/news'; // 新闻公告接口
import NewsModal from './newsModal.vue'; // 表单模态框
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
import { formatDictValue } from '/@/utils'; // 工具函数
import { Badge, Tag } from 'ant-design-vue'; // 引入antd组件
import mybus from '/@/utils/eventBus'; // 引入mitt工具类

const { t } = useI18n(); // 国际化函数
const { createMessage } = useMessage(); //消息函数
const [registerModal, { openModal }] = useModal(); // 注册模态框
const [registerTable, { reload, getForm }] = useTable({
  // 注册表格
  title: t('router.integrated.news.title'),
  api: getNewsList,
  rowKey: 'news_id',
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
    width: 80,
    title: t('router.common.action'),
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
});

//  请求字典数据
let options = reactive({});
async function initOptions() {
  await dictionaryModel({ dict_coding: 'system_status,integrated_news_type' }).then((res) => {
    options['status'] = res.system_status;
    options['type'] = res.integrated_news_type;
  });
}
initOptions();

// 新增操作
function handleCreate() {
  openModal(true, { isUpdate: false });
}
// 编辑操作
function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true });
}
//   删除操作
async function handleDelete(record: Recordable) {
  await newsDel({ ids: record.news_id, title: record.title });
  createMessage.success(t('router.common.deleteSuccess'));
  await reload();
}
// 新增编辑成功后的回调
async function handleSuccess() {
  await reload();
}

// 表格接口请求成功后触发
async function onFetchSuccess() {
  const newsType = await dictionaryModel({ dict_coding: 'integrated_news_type' });
  getForm().updateSchema([
    { field: 'type', componentProps: { options: newsType.integrated_news_type } },
  ]);
}

// 展示新闻公告详情
function showNewsDetails(record: Recordable) {
  mybus.emit('notify-details', record);
}
</script>