<template>
    <div
        :class="[prefixCls, getLayoutContentMode]"
        v-loading="getOpenPageLoading && getPageLoading"
    >
        <PageLayout />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import PageLayout from '/@/layouts/page/index.vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
import { useContentViewHeight } from './useContentViewHeight';
import { useWatermark } from '/@/hooks/web/useWatermark';

export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout },
    setup() {
        const { prefixCls } = useDesign('layout-content');
        const { getOpenPageLoading } = useTransitionSetting();
        const { getLayoutContentMode, getPageLoading } = useRootSetting();
        const { setWatermark } = useWatermark();
        useContentViewHeight();
        onMounted(() => {
            setWatermark('Vue3 Admin')
        })
        return {
            prefixCls,
            getOpenPageLoading,
            getLayoutContentMode,
            getPageLoading,
        };
    },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-layout-content";

.@{prefix-cls} {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;

    &.fixed {
        width: 1200px;
        margin: 0 auto;
    }

    &-loading {
        position: absolute;
        top: 200px;
        z-index: @page-loading-z-index;
    }
}
</style>
