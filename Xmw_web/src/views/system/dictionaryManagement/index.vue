<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DitcTable class="w-2/4 xl:w-3/6" @dict-change="handleDictChange" />
    <DitcItemTable class="w-1/2" :parentId="parentId" />
  </PageWrapper>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { PageWrapper } from '/@/components/Page';
import DitcTable from './ditcTable/index.vue';
import DitcItemTable from './ditcItemTable/index.vue';
export default defineComponent({
  name: 'dictionaryManagement',
  components: { PageWrapper, DitcTable, DitcItemTable },
  emits: ['dict-change'],
  setup() {
    const parentId = ref(null);
    function handleDictChange(value) {
      parentId.value = value;
    }
    return {
      parentId,
      handleDictChange,
    };
  },
});
</script>