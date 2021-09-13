<template>
    <PageWrapper
        :title="t('router.features.captcha.title')"
        :content="t('router.features.captcha.content')"
    >
        <Row :gutter="20">
            <!-- 常规验证码 -->
            <Col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
                <Card :bordered="false" :title="t('router.features.captcha.generaVerify')">
                    <Row type="flex" justify="center" align="middle" :gutter="10">
                        <Col flex="60px">{{ t('sys.login.verify') }}:</Col>
                        <Col style="flex: 1">
                            <Input
                                v-model:value="generaCode"
                                :placeholder="t('sys.login.verifyRule')"
                            ></Input>
                        </Col>
                        <Col flex="120px">
                            <div @click="refreshCode">
                                <GeneraVerify
                                    :identifyCode="identifyCode"
                                    :contentHeight="40"
                                    :backgroundColorMin="0"
                                    :backgroundColorMax="255"
                                />
                            </div>
                        </Col>
                        <Col :span="24" style="margin-top: 10px">
                            <a-button
                                type="primary"
                                block
                                @click="validateGeneraCode('generaVerify')"
                            >{{ t('router.features.captcha.validation') }}</a-button>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <!-- 运算验证码 -->
            <Col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
                <Card :bordered="false" :title="t('router.features.captcha.operationVerify')">
                    <OperationVerify height="40px" ref="operationVerifyRef" width="160px" />
                    <a-button
                        type="primary"
                        block
                        @click="validateGeneraCode('operationVerify')"
                        style="margin-top: 10px"
                    >{{ t('router.features.captcha.validation') }}</a-button>
                </Card>
            </Col>
            <!-- 滑块验证码 -->
            <Col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
                <Card :bordered="false" :title="t('router.features.captcha.dragVerify')">
                    <BasicDragVerify
                        ref="dragVerifyRef"
                        @success="dragVerifySuccess"
                        class="mx-auto"
                    >
                        <template #text="isPassing">
                            <div v-if="isPassing">{{ t('component.verify.successText') }}</div>
                            <div v-else>
                                <UnlockOutlined />
                                {{ t('component.verify.dragText') }}
                            </div>
                        </template>
                    </BasicDragVerify>
                    <a-button
                        type="primary"
                        block
                        @click="dragVerifyReset(dragVerifyRef)"
                        style="margin-top: 10px"
                    >{{ t('common.resetText') }}</a-button>
                </Card>
            </Col>
            <!-- 图片旋转验证码 -->
            <Col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
                <Card :bordered="false" :title="t('router.features.captcha.rotateVerify')">
                    <RotateDragVerify
                        :src="beautyList[randomNum(1, 6)]"
                        ref="rotateVerifyRef"
                        @success="rotateVerifySuccess"
                    >
                        <template #text="isPassing">
                            <div v-if="isPassing">{{ t('component.verify.successText') }}</div>
                            <div v-else>
                                <UnlockOutlined />
                                {{ t('component.verify.dragText') }}
                            </div>
                        </template>
                    </RotateDragVerify>
                    <a-button
                        type="primary"
                        block
                        @click="handleBtnClick(rotateVerifyRef)"
                        style="margin-top: 10px"
                    >{{ t('common.resetText') }}</a-button>
                </Card>
            </Col>
            <!-- 拼图验证码 -->
            <Col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
                <Card :bordered="false" :title="t('router.features.captcha.graphicsVerify')">
                    <GraphicsVerify
                        ref="graphicsVerifyRef"
                        :isPassing.sync="graphicsPassing"
                        :imgsrc="graphicsImg"
                        :width="280"
                        @refresh="graphicsRefresh"
                        @changePassing="changePassing"
                    />
                    <a-button
                        type="primary"
                        block
                        @click="graphicsRefresh"
                        style="margin-top: 10px"
                    >{{ t('common.resetText') }}</a-button>
                </Card>
            </Col>
            <!-- 点选验证码 -->
            <Col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
                <Card :bordered="false" :title="t('router.features.captcha.pointsVerify')">
                    <PointsVerify
                        @callback="pointsPassing"
                        :imgArr="beautyList"
                        :setSize="{
                            imgHeight: 312,
                            imgWidth: 312,
                        }"
                        :barSize="{
                            width: '312px',
                            height: '40px'
                        }"
                    />
                </Card>
            </Col>
        </Row>
    </PageWrapper>
</template>

<script lang="ts" setup>
import { ref, unref, onMounted } from 'vue'
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化
import { PageWrapper } from '/@/components/Page'; // 页面包裹组件
import { Row, Col, Card, Input } from 'ant-design-vue'; // 引入antd组件
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { GeneraVerify, OperationVerify, GraphicsVerify, PointsVerify } from './components' // 验证码组件
import { _code_chars, randomNum, beautyList } from '/@/utils'
import { BasicDragVerify, RotateDragVerify } from '/@/components/Verify/index'; // 滑块验证组件
import { UnlockOutlined } from '@ant-design/icons-vue'

const { t } = useI18n(); // 国际化函数
const { createMessage } = useMessage();

const generaCode = ref<string>('') // 输入的常规验证码
const identifyCode = ref<string>('') // 常规验证码的值
const operationVerifyRef = ref<HTMLElement | null>(null) // 运算验证码ref
const dragVerifyRef = ref<HTMLElement | null>(null); //滑块验证码ref
const rotateVerifyRef = ref<HTMLElement | null>(null); // 图片旋转验证码ref
const graphicsVerifyRef = ref<HTMLElement | null>(null); // 拼图验证码ref
const graphicsPassing = ref<boolean>(false) // 拼图验证码
const graphicsImg = ref<string>('') //拼图验证码背景图

// 刷新常规验证码
function refreshCode() {
    identifyCode.value = ''
    makeCode(_code_chars, 4)
}
// 生成验证码
function makeCode(o, l) {
    for (let i = 0; i < l; i++) {
        identifyCode.value += _code_chars[randomNum(0, _code_chars.length)]
    }
}

// 滑块验证码成功回调
function dragVerifySuccess(data) {
    const { time } = data;
    createMessage.success(t('component.verify.time', { time }));
}
// 滑块验证码还原
function dragVerifyReset(elRef) {
    if (!elRef) {
        return;
    }
    elRef.resume();
}

// 图片旋转验证码成功回调
function rotateVerifySuccess() {
    createMessage.success(t('component.verify.successText'))
}
// 图片旋转验证码还原
function handleBtnClick(elRef) {
    if (!elRef) {
        return;
    }
    elRef.resume();
}

// 拼图验证码生成背景
function graphicsRefresh() {
    graphicsImg.value = beautyList[randomNum(1, 6)]
}

function changePassing(val) {
    graphicsPassing.value = val
}

// 点选验证码回调
function pointsPassing(flag, text) {
    if (flag) createMessage.success(text)
    else createMessage.error(text)
}

// 验证码回调验证
function validateGeneraCode(code: string): void {
    switch (code) {
        // 常规验证码
        case 'generaVerify':
            if (!unref(generaCode)) createMessage.warn(t('sys.login.verifyRule'))
            else if (unref(generaCode).toUpperCase() != unref(identifyCode).toUpperCase())
                createMessage.error(t('component.verify.error'))
            else createMessage.success(t('component.verify.successText'))
            refreshCode()
            break;
        // 运算验证码
        case 'operationVerify':
            operationVerifyRef.value.checkCode()
            break;
    }
}

// 初始化挂载验证码
onMounted(() => {
    refreshCode()
    graphicsRefresh()
})
</script>

<style lang="less" scoped>
.ant-card /deep/ .ant-card-body {
    margin-bottom: 20px;
}

/deep/ .darg-verify-content {
    -webkit-text-fill-color: #000;
}
</style>