
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <UserTable ref="userTable" />
  </PageWrapper>
</template>
<script>
import { PageWrapper } from '/@/components/Page'; // 引入包裹页面组件
import UserTable from './userTable/index.vue';
export default {
  name: 'userManagement',
  components: { PageWrapper, UserTable },
};
</script>

<style lang="less">
</style>
