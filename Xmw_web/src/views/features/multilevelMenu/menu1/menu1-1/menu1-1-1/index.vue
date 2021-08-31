
<template>
    <PageWrapper :title="t('router.features.multilevelMenu.menu1.menu1-1.menu1-1-1.title')">
        <Alert type="success">
            <template #message>
                <h1 style="padding: 30px 0">Menu 1</h1>
                <Alert type="info">
                    <template #message>
                        <h1 style="padding: 30px 0">Menu 1-1</h1>
                        <Alert type="warning">
                            <template #message>
                                <h1 style="padding: 30px 0">Menu 1-1-1</h1>
                            </template>
                        </Alert>
                    </template>
                </Alert>
            </template>
        </Alert>
    </PageWrapper>
</template>
<script lang="ts" setup>
import { Alert } from 'ant-design-vue';
import { PageWrapper } from '/@/components/Page'; // 包裹页面组件
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
</script>
