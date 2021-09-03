<template>
    <PageWrapper
        :title="t('router.integrated.organizational.title')"
        :content="t('router.integrated.organizational.content')"
    >
        <Structure />
    </PageWrapper>
</template>

<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page'; // 包裹页面组件
import Structure from './structure.vue'; // 引入structure子组件
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n(); // 国际化函数
</script>