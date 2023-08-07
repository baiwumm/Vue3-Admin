<template>
    <PageWrapper
        :title="t('router.features.lazyLoad.title')"
        :content="t('router.features.lazyLoad.content')"
    >
        <Row :gutter="20">
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(v, i) in 50" :key="i">
                <div class="lazy-img-cpntainer">
                    <div
                        class="img-waterMarker"
                        v-waterMarker="{ text: 'Vue3 Admin', textColor: useAppStore().getProjectConfig.themeColor }"
                    ></div>
                    <img
                        class="lazy-img"
                        v-lazyLoad="{
                            src: beautyList[randomNum(1, 6)],
                            callback: onCallback,
                        }"
                    />
                </div>
            </Col>
        </Row>
    </PageWrapper>
</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page'; // 页面包裹组件
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化
import { Row, Col } from 'ant-design-vue'
const { t } = useI18n(); // 国际化函数
import { useAppStore } from '/@/store/modules/app'; // vuex配置
import { randomNum, beautyList } from '/@/utils'

function onCallback(el) {
    el.style.opacity = 1
    el.style.display = 'block'
}
</script>

<style lang="less" scoped>
.lazy-img-cpntainer {
    position: relative;
    margin-bottom: 20px;
    .img-waterMarker {
        position: absolute;
        width: 170px;
        height: 65px;
        top: 0;
        right: 0;
    }
    .lazy-img {
        height: 400px;
        width: 400px;
        opacity: 0;
        transition: opacity 2s;
    }
}
</style>
