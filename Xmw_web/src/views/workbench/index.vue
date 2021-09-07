<template>
    <PageWrapper>
        <template #headerContent>
            <!-- 头部信息 -->
            <WorkbenchHeader />
        </template>
        <!-- 销售卡片 -->
        <SalesCard />
    </PageWrapper>
</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page'; // 页面包裹组件
import WorkbenchHeader from './components/WorkbenchHeader.vue'; // 头部信息
import SalesCard from './components/salesCard.vue' // 销售卡片
</script>
