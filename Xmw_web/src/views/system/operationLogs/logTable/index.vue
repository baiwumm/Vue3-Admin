<template>
  <BasicTable @register="registerTable"> </BasicTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable } from '/@/components/Table'; // 表格组件
import { columns } from './data'; // 表格配置项
import { getLogList } from '/@/api/system/operationLogs'; // 日志列表接口
export default defineComponent({
  name: 'logTable',
  components: { BasicTable },
  setup() {
    const [registerTable] = useTable({
      // 注册表格
      title: '操作日志',
      api: getLogList,
      rowKey: 'log_id',
      columns,
      showIndexColumn: false,
      showTableSetting: true,
      bordered: true,
    });
    return {
      registerTable,
    };
  },
});
</script>
