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
import Structure from './structure.vue'
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
</script>