<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <OrgTable />
  </PageWrapper>
</template>

<script>
import { defineComponent } from 'vue';
import { PageWrapper } from '/@/components/Page';
import OrgTable from './orgTable/index.vue';
export default defineComponent({
  name: 'organizationManagement',
  components: { PageWrapper, OrgTable },
});
</script>