
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <MenuTable />
  </PageWrapper>
</template>

<script>
import { defineComponent } from 'vue';
import { PageWrapper } from '/@/components/Page';
import MenuTable from './menuTable/index.vue';
export default defineComponent({
  name: 'menuManagement',
  components: { PageWrapper, MenuTable },
});
</script>
