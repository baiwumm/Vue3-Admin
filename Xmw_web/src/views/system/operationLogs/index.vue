<template>
  <PageWrapper dense contentClass="flex">
    <LogTable />
  </PageWrapper>
</template>
<script>
import { PageWrapper } from '/@/components/Page';
import LogTable from './logTable/index.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'operationLogs',
  components: { PageWrapper, LogTable },
});
</script>
