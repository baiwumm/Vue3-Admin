<template>
  <PageWrapper dense contentClass="flex">
    <UserTable ref="userTable" />
  </PageWrapper>
</template>
<script>
import { PageWrapper } from '/@/components/Page';
import UserTable from './userTable/index.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'userManagement',
  components: { PageWrapper, UserTable },
});
</script>
