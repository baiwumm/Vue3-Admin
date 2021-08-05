<template>
  <PageWrapper contentClass="flex">
    <InterTable />
  </PageWrapper>
</template>
<script>
import { PageWrapper } from '/@/components/Page';
import InterTable from './interTable/index.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'internationalManagement',
  components: { PageWrapper, InterTable },
});
</script>
