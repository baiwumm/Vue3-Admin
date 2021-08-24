<template>
  <BasicTable @register="registerTable"> </BasicTable>
</template>

<script lang="ts" setup>
import { BasicTable, useTable } from '/@/components/Table'; // 表格组件
import { columns, searchFormSchema } from './data'; // 表格配置项
import { getLogList } from '/@/api/system/operationLogs'; // 日志列表接口
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n();
const [registerTable] = useTable({
  // 注册表格
  title: t('router.system.operationLogs.title'),
  api: getLogList,
  rowKey: 'log_id',
  columns,
  formConfig: {
    labelWidth: 120,
    baseColProps: { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 },
    schemas: searchFormSchema,
    autoSubmitOnEnter: true,
    resetButtonOptions: {
      preIcon: 'ant-design:delete-outlined',
    },
    submitButtonOptions: {
      preIcon: 'ant-design:search-outlined',
    },
    fieldMapToTime: [['create_time', ['start_time', 'end_time'], 'YYYY-MM-DD']],
  },
  useSearchForm: true,
  showIndexColumn: false,
  showTableSetting: true,
  bordered: true,
});
</script>
