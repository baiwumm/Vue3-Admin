<template>
  <PageWrapper dense>
    <UserTable ref="userTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import UserTable from './userTable/index.vue';
</script>
