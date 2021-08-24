<template>
  <PageWrapper dense contentClass="flex">
    <PostTable />
  </PageWrapper>
</template>

<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import PostTable from './postTable/index.vue';
</script>