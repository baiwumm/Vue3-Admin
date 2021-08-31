<template>
    <PageWrapper contentClass="flex" dense>
        <DitcTable class="w-2/4 xl:w-3/6" @dict-change="handleDictChange" />
        <DitcItemTable class="w-1/2" :parent_id="parent_id" />
    </PageWrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { PageWrapper } from '/@/components/Page'; // 包裹页面组件
import DitcTable from './ditcTable/index.vue'; // 字典项组件
import DitcItemTable from './ditcItemTable/index.vue'; // 字典子项组件

const parent_id = ref<string>('');
function handleDictChange(value) {
    parent_id.value = value;
}
</script>