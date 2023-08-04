<template>
    <Footer :class="prefixCls" v-if="getShowLayoutFooter" ref="footerRef">
        <div :class="`${prefixCls}__links`">
            <a @click="openWindow('https://vue2.baiwumm.com/')">Vue2 Admin</a>

            <GithubFilled @click="openWindow(GITHUB_URL)" :class="`${prefixCls}__github`" />

            <a @click="openWindow('https://react.baiwumm.com/')">Xmw Admin</a>
        </div>
        <div>Copyright &copy; 2021 Vue3 Admin by 843348394@qq.com<a href="https://beian.miit.gov.cn/" target="_blank" style="color: rgba(0, 0, 0, 0.45); font-size: 14px; margin-left: 10px;"> 粤ICP备2023007649号-2 </a></div>
    </Footer>
</template>

<script lang="ts">
import { computed, defineComponent, unref, ref } from 'vue';
import { Layout } from 'ant-design-vue';

import { GithubFilled } from '@ant-design/icons-vue';

import { DOC_URL, GITHUB_URL, SITE_URL } from '/@/settings/siteSetting';
import { openWindow } from '/@/utils';

import { useI18n } from '/@/hooks/web/useI18n';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useRouter } from 'vue-router';
import { useDesign } from '/@/hooks/web/useDesign';
import { useLayoutHeight } from '../content/useContentViewHeight';

export default defineComponent({
    name: 'LayoutFooter',
    components: { Footer: Layout.Footer, GithubFilled },
    setup() {
        const { t } = useI18n();
        const { getShowFooter } = useRootSetting();
        const { currentRoute } = useRouter();
        const { prefixCls } = useDesign('layout-footer');

        const footerRef = ref<ComponentRef>(null);
        const { setFooterHeight } = useLayoutHeight();

        const getShowLayoutFooter = computed(() => {
            if (unref(getShowFooter)) {
                const footerEl = unref(footerRef)?.$el;
                setFooterHeight(footerEl?.offsetHeight || 0);
            } else {
                setFooterHeight(0);
            }
            return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter;
        });

        return {
            getShowLayoutFooter,
            prefixCls,
            t,
            DOC_URL,
            GITHUB_URL,
            SITE_URL,
            openWindow,
            footerRef,
        };
    },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-layout-footer";

@hover-color: rgba(0, 0, 0, 0.85);

.@{prefix-cls} {
    color: rgba(0, 0, 0, 0.6);
    text-align: center;

    &__links {
        margin-bottom: 8px;

        a {
            color: rgba(0, 0, 0, 0.6);

            &:hover {
                color: @hover-color;
            }
        }
    }

    &__github {
        margin: 0 30px;

        &:hover {
            color: @hover-color;
        }
    }
}
</style>
