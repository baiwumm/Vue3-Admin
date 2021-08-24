<template>
  <PageWrapper dense contentClass="flex">
    <OrgTable />
  </PageWrapper>
</template>

<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import OrgTable from './orgTable/index.vue';
</script>