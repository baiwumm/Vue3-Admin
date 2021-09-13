<template>
    <PageWrapper
        :title="t('router.features.vitualScroll.title')"
        :content="t('router.features.vitualScroll.content')"
    >
        <Row :gutter="16">
            <Col :span="12">
                <CollapseContainer title="基础滚动示例">
                    <div class="virtual-scroll-demo-wrap">
                        <VScroll :itemHeight="41" :items="data" :height="500" :width="300">
                            <template #default="{ item }">
                                <div class="virtual-scroll-demo__item">{{ item.title }}</div>
                            </template>
                        </VScroll>
                    </div>
                </CollapseContainer>
            </Col>
            <Col :span="12">
                <CollapseContainer title="即使不可见，也预先加载50条数据，防止空白">
                    <div class="virtual-scroll-demo-wrap">
                        <VScroll
                            :itemHeight="41"
                            :items="data"
                            :height="500"
                            :width="300"
                            :bench="50"
                        >
                            <template #default="{ item }">
                                <div class="virtual-scroll-demo__item">{{ item.title }}</div>
                            </template>
                        </VScroll>
                    </div>
                </CollapseContainer>
            </Col>
        </Row>
    </PageWrapper>
</template>
<script lang="ts" setup>
import { VScroll } from '/@/components/VirtualScroll/index';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化
import { PageWrapper } from '/@/components/Page';
import { Row, Col } from 'ant-design-vue';
import { CollapseContainer } from '/@/components/Container/index';

const { t } = useI18n(); // 国际化函数
const data: Recordable[] = (() => {
    const arr: Recordable[] = [];
    for (let index = 1; index < 20000; index++) {
        arr.push({
            title: '列表项' + index,
        });
    }
    return arr;
})();
</script>
<style lang="less" scoped>
.virtual-scroll-demo {
    &-wrap {
        display: flex;
        background-color: @component-background;
        justify-content: center;
    }

    &__item {
        height: 40px;
        padding: 0 20px;
        line-height: 40px;
        border-bottom: 1px solid @border-color-base;
    }
}
</style>
