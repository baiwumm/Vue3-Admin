<template>
    <PageWrapper
        :title="t('router.features.customDirective.title')"
        :content="t('router.features.customDirective.content')"
    >
        <Row :gutter="20">
            <!-- 复制粘贴指令 v-copy -->
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <Card
                    :bordered="false"
                    :title="t('router.features.customDirective.copyTip') + ' v-copy'"
                >
                    <InputSearch :placeholder="t('common.inputText')" v-model:value="copyText">
                        <template #enterButton>
                            <Button
                                type="primary"
                                v-copy="copyText"
                            >{{ t('router.features.customDirective.copy') }}</Button>
                        </template>
                    </InputSearch>
                </Card>
            </Col>
            <!-- 长按指令 v-longpress -->
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <Card
                    :bordered="false"
                    :title="t('router.features.customDirective.longpressTip') + ' v-longpress'"
                >
                    <a-button
                        type="primary"
                        block
                        v-longpress:[1000]="initLongpress"
                    >{{ t('router.features.customDirective.longpressBtn') }}</a-button>
                </Card>
            </Col>
            <!-- 防抖指令 v-debounce -->
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <Card
                    :bordered="false"
                    :title="t('router.features.customDirective.debounceTip') + ' v-debounce'"
                >
                    <a-button
                        type="primary"
                        block
                        v-debounce="{ callback: initDebounce, time: 500 }"
                    >{{ t('router.features.customDirective.debounce') }}</a-button>
                </Card>
            </Col>
            <!-- 节流指令 v-throllte -->
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <Card
                    :bordered="false"
                    :title="t('router.features.customDirective.throllteTip') + ' v-throllte'"
                >
                    <a-button
                        type="primary"
                        block
                        v-throllte="{ callback: initThrollte, time: 1000 }"
                    >{{ t('router.features.customDirective.throllte') }}</a-button>
                </Card>
            </Col>
            <!-- 限制特殊字符指令 v-emoji -->
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <Card
                    :bordered="false"
                    :title="t('router.features.customDirective.emojiTip') + ' v-emoji'"
                >
                    <Input v-emoji :placeholder="t('router.features.customDirective.emojiTip')" />
                </Card>
            </Col>
            <!-- 输入框规则指令 v-input -->
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <Card
                    :bordered="false"
                    :title="t('router.features.customDirective.inputTip') + ' v-input'"
                >
                    <Input
                        :placeholder="t('router.features.customDirective.inputTip')"
                        v-input:decimal_2="inputValue"
                        data-rule="/[^\d]/"
                    />
                </Card>
            </Col>
            <!-- 水波纹指令 v-ripple -->
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <Card
                    :bordered="false"
                    :title="t('router.features.customDirective.rippleTip') + ' v-ripple'"
                >
                    <a-button
                        type="primary"
                        block
                        v-ripple
                    >{{ t('router.features.customDirective.rippleTip') }}</a-button>
                </Card>
            </Col>
            <!-- 点击外部指令 v-clickOutside -->
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <Card
                    :bordered="false"
                    :title="t('router.features.customDirective.clickOutsideTip') + ' v-clickOutside'"
                >
                    <ClickOutSide @clickOutside="handleClickOutside">
                        <a-button type="primary" block @click="innerClick">{{ onClickOutsideText }}</a-button>
                    </ClickOutSide>
                </Card>
            </Col>
            <!-- 图片懒加载指令 v-lazyLoad -->
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <Card
                    :bordered="false"
                    :title="t('router.features.customDirective.lazyLoadTip') + ' v-lazyLoad'"
                >
                    <router-link :to="{ path: '/features/lazyLoad' }">
                        <a-button
                            type="primary"
                            block
                        >{{ t('router.features.customDirective.lazyLoadTip') }}</a-button>
                    </router-link>
                </Card>
            </Col>
            <!-- 拖拽指令 v-draggable-->
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <Card
                    :bordered="false"
                    :title="t('router.features.customDirective.draggableTip') + ' v-draggable'"
                >
                    <div
                        id="draggableBox"
                        style="width: 100%;height: 200px;border: 1px solid red"
                        :style="{ borderColor: useAppStore().getProjectConfig.themeColor }"
                    >
                        <div
                            v-draggable:draggableBox
                            style="width: 50px;height: 50px;"
                            :style="{ background: useAppStore().getProjectConfig.themeColor }"
                        ></div>
                    </div>
                </Card>
            </Col>
        </Row>
    </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RippleDirective from '/@/directives/ripple';
export default defineComponent({
    directives: {
        Ripple: RippleDirective
    },
});
</script>
<script lang="ts" setup>
import { ref } from 'vue';
import { PageWrapper } from '/@/components/Page';
import { useMessage } from '/@/hooks/web/useMessage';
import { useI18n } from '/@/hooks/web/useI18n';
import { Button, Row, Col, Card, Input } from 'ant-design-vue';
import { ClickOutSide } from '/@/components/ClickOutSide';
import { useAppStore } from '/@/store/modules/app';
const { t } = useI18n();
const { createMessage } = useMessage();
const InputSearch = Input.Search

const copyText = ref<string>('vue3-admin')
const inputValue = ref<string>('')
const onClickOutsideText = ref<string>(t('router.features.customDirective.clickOutsideTip'))


// 长按指令回调
function initLongpress() {
    createMessage.success(t('layout.setting.operatingTitle'))
}

// 防抖指令回调
function initDebounce() {
    createMessage.success(t('layout.setting.operatingTitle'))
}

// 节流指令回调
function initThrollte() {
    createMessage.success(t('layout.setting.operatingTitle'))
}

// 点击外部指令
function handleClickOutside() {
    onClickOutsideText.value = t('router.features.customDirective.clickOutside')
}

function innerClick() {
    onClickOutsideText.value = t('router.features.customDirective.clickOutsideInner')
}
</script>
<style lang="less" scoped>
.ant-card /deep/ .ant-card-body {
    margin-bottom: 20px;
}
</style>