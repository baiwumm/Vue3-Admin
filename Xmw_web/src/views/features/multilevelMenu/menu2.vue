
<template>
    <PageWrapper :title="t('router.features.multilevelMenu.menu2.title')">
        <Alert message="Menu 2" type="success" />
    </PageWrapper>
</template>
<script lang="ts" setup>
import { Alert } from 'ant-design-vue';
import { PageWrapper } from '/@/components/Page'; // 包裹页面组件
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
</script>
