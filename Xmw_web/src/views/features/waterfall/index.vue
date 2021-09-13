<template>
    <PageWrapper
        :title="t('router.features.waterfall.title')"
        content="瀑布流组件,支持瀑布流布局和无限滚动加载,相比其他实现方式，无需在返回的数据中指定图片的宽度和高度"
    >
        <h1>待开发</h1>
    </PageWrapper>
</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page'; // 页面包裹组件
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化
// import VueWaterfall from '/@/components/Waterfall'
const { t } = useI18n(); // 国际化函数
</script>



