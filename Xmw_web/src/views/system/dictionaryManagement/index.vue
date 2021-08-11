<template>
  <PageWrapper contentClass="flex" dense>
    <DitcTable class="w-2/4 xl:w-3/6" @dict-change="handleDictChange" />
    <DitcItemTable class="w-1/2" :parent_id="parent_id" />
  </PageWrapper>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { PageWrapper } from '/@/components/Page'; // 包裹页面组件
import DitcTable from './ditcTable/index.vue'; // 字典项组件
import DitcItemTable from './ditcItemTable/index.vue'; // 字典子项组件
export default defineComponent({
  name: 'dictionaryManagement',
  components: { PageWrapper, DitcTable, DitcItemTable },
  emits: ['dict-change'], // 接收子组件事件
  setup() {
    const parent_id = ref(null);
    function handleDictChange(value) {
      parent_id.value = value;
    }
    return {
      parent_id,
      handleDictChange,
    };
  },
});
</script>