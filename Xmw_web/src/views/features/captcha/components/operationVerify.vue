<template>
    <Row type="flex" justify="center" align="middle" :gutter="10">
        <Col flex="60px">{{ t('sys.login.verify') }}:</Col>
        <Col :flex="width">
            <div
                class="verify-code"
                @click="setCode"
                :style="{
                    width: width,
                    height: height,
                    lineHeight: height,
                    fontSize: fontSize,
                    backgroundColor: containerBackgroundColor,
                    color: containerColor,
                }"
            >
                <span v-for="(code, i) in codeShow" :key="i">{{ code }}</span>
            </div>
        </Col>
        <Col style="flex: 1">
            <Input v-model:value="inputValue" :placeholder="t('sys.login.verifyRule')"></Input>
        </Col>
    </Row>
</template>
<script type="text/babel" lang="ts">
/**
 * Code
 * @description 常规的图片文字识别或者数字计算
 * */
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { Row, Col, Card, Input } from 'ant-design-vue'; // 引入antd组件
import { _code_chars, randomColor } from '/@/utils'
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化
import { operationVerifyResult } from '../data'

export default defineComponent({
    name: 'operationVerify',
    components: {
        Row, Col, Card, Input
    },
    props: {
        //运算验证码的位数,默认是100以内的数字，即两位数。如果是要设置三位数，则设置figure:1000。
        figure: {
            type: Number,
            default: 100,
        },
        //算法选择，支持加、减、乘。设置为1至3分别代表加减乘，0为随机切换。
        arith: {
            type: Number,
            default: 0,
        },
        // 	运算验证码的宽,支持百分比形式设置，如：width:100%
        width: {
            type: String,
            default: '150px',
        },
        // 运算验证码的高,支持百分比形式设置，如：height:10%
        height: {
            type: String,
            default: '60px',
        },
        // 运算验证码中的数字的字体大小，默认为30px
        fontSize: {
            type: String,
            default: '30px',
        },
        codeLength: {
            type: Number,
            default: 6,
        },
    },
    setup(props) {
        const { t } = useI18n(); // 国际化函数
        const { createMessage } = useMessage();
        const state = reactive<operationVerifyResult>(
            {
                inputValue: '', // 输入值
                containerBackgroundColor: '#fff', // 背景颜色
                containerColor: '#fff', // 验证码颜色
                codeChose: '', // 应该输入的code
                codeShow: [] // 显示用的
            }
        )
        // 生成验证码
        function setCode() {
            state.containerBackgroundColor = randomColor(0, 255)
            state.containerColor = randomColor(0, 255)
            state.inputValue = ''
            state.codeShow = []
            state.codeChose = ''
            // 算法验证码
            var num1 = Math.floor(Math.random() * props.figure)
            var num2 = Math.floor(Math.random() * props.figure)

            let codeShow = '', tmparith = 0

            if (props.arith == 0) {
                tmparith = Math.floor(Math.random() * 3)
            }

            switch (tmparith) {
                case 1:
                    state.codeChose = parseInt(num1) + parseInt(num2)
                    codeShow = num1 + ' + ' + num2 + ' = ?'
                    break
                case 2:
                    if (parseInt(num1) < parseInt(num2)) {
                        var tmpnum = num1
                        num1 = num2
                        num2 = tmpnum
                    }
                    state.codeChose = parseInt(num1) - parseInt(num2)
                    codeShow = num1 + ' - ' + num2 + ' = ?'
                    break
                default:
                    state.codeChose = parseInt(num1) * parseInt(num2)
                    codeShow = num1 + ' × ' + num2 + ' = ?'
                    break
            }

            state.codeShow = codeShow.split('') // 转数组
        }
        // 验证码回调
        function checkCode() {
            if (!state.inputValue) createMessage.warn('请输入验证码!')
            else if (state.inputValue != state.codeChose) createMessage.error(t('component.verify.error'))
            else createMessage.success(t('component.verify.successText'))
            setCode()
        }
        // 实例化验证码
        onMounted(() => {
            setCode()
        })
        return {
            t,
            ...toRefs(state),
            setCode,
            checkCode
        }
    }
})
</script>