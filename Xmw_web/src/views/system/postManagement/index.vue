
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <PostTable />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import { PageWrapper } from '/@/components/Page';
import PostTable from './postTable/index.vue';
export default defineComponent({
  name: 'postManagement',
  components: { PageWrapper, PostTable },
  setup() {},
});
</script>