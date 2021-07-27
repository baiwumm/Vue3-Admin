<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex"><RoleTable /></PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PageWrapper } from '/@/components/Page';
import RoleTable from './roleTable/index.vue';
export default defineComponent({
  name: 'roleManagement',
  components: { PageWrapper, RoleTable },
});
</script>
