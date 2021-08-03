<template>
  <PageWrapper dense contentClass="flex">
    <PostTable />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PageWrapper } from '/@/components/Page';
import PostTable from './postTable/index.vue';
export default defineComponent({
  name: 'postManagement',
  components: { PageWrapper, PostTable },
});
</script>