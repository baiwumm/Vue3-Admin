<template>
    <Form
        ref="formLogin"
        @keypress.enter="onSubmit"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
    >
        <FormItem
            :label="t('router.common.userName')"
            class="enter-x"
            v-bind="validateInfos.user_name"
        >
            <Input
                size="large"
                v-model:value="modelRef.user_name"
                :placeholder="t('sys.login.userName')"
            >
                <template #prefix>
                    <UserOutlined type="user" />
                </template>
            </Input>
        </FormItem>
        <FormItem
            :label="t('router.common.passWord')"
            class="enter-x"
            v-bind="validateInfos.password"
        >
            <InputPassword
                size="large"
                visibilityToggle
                v-model:value="modelRef.password"
                :placeholder="t('sys.login.password')"
            >
                <template #prefix>
                    <LockOutlined />
                </template>
            </InputPassword>
        </FormItem>
        <FormItem
            class="enter-x"
            :wrapper-col="{ span: 18 }"
            :label="t('sys.login.verify')"
            v-bind="validateInfos.verifyCode"
        >
            <InputGroup>
                <Input size="large" style="width: 45%" v-model:value="modelRef.verifyCode" />
                <div
                    id="svgTemplate"
                    v-html="svgCaptcha"
                    v-debounce="{ callback: createSvgCaptcha, time: 500 }"
                ></div>
            </InputGroup>
        </FormItem>
        <FormItem :wrapper-col="{ span: 18, offset: 6 }" class="enter-x">
            <Button
                size="large"
                block
                type="primary"
                @click.prevent="onSubmit"
                :loading="loginLoading"
                :disabled="loginLoading"
            >{{ t('sys.login.loginButton') }}</Button>
        </FormItem>
    </Form>
</template>

<script lang="ts">
import CryptoJS from 'crypto-js'; // AES/DES加密
import { crypto_key, crypto_iv } from '/@/utils'; // AES/DES加密秘钥
import { defineComponent, reactive, ref, toRaw, UnwrapRef, onMounted } from 'vue'; // 引入 Composition-API
import { Form, Input, Row, Col, Button, Alert } from 'ant-design-vue'; // 引入antd组件
import { useMessage } from '/@/hooks/web/useMessage';
const useForm = Form.useForm;
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'; // 引入antd图标
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化
import { useUserStore } from '/@/store/modules/user';
import { cloneDeep } from 'lodash-es'; // 引入深克隆函数
import { generateVerifCode } from '/@/api/system/userManagement'; // 引入验证码接口
// 登录表单数据类型注解
interface FormState {
    user_name: string;
    password: string;
    verifyCode: string
}
export default defineComponent({
    name: 'LoginForm',
    components: {
        [Col.name]: Col,
        [Row.name]: Row,
        Button,
        Form,
        FormItem: Form.Item,
        Input,
        InputPassword: Input.Password,
        Alert,
        UserOutlined,
        LockOutlined,
        InputGroup: Input.Group
    },
    setup() {
        const { t } = useI18n();
        const { notification } = useMessage();
        const userStore = useUserStore();
        const svgCaptcha = ref('')
        //   表单数据
        const modelRef: UnwrapRef<FormState> = reactive({
            user_name: 'admin',
            password: '123456',
            verifyCode: ''
        });
        // userForm注册表单
        const { validate, validateInfos } = useForm(
            modelRef,
            reactive({
                user_name: [
                    {
                        required: true,
                        message: t('sys.login.userName'),
                    },
                ],
                password: [
                    {
                        required: true,
                        message: t('sys.login.password'),
                    },
                ],
                verifyCode: [
                    {
                        required: true,
                        message: t('sys.login.verifyRule'),
                    },
                ],
            })
        );
        // 按钮请求状态
        const loginLoading = ref<boolean>(false);
        //   表单提交
        const onSubmit = () => {
            loginLoading.value = true;
            validate()
                .then(async () => {
                    let data = cloneDeep(toRaw(modelRef));
                    let encryptionPas = CryptoJS.AES.encrypt(data.password, crypto_key, {
                        iv: crypto_iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7,
                    }).toString();
                    let params = toRaw(Object.assign(data, { password: encryptionPas, mode: 'none' }));
                    //   返回登录用户信息
                    await userStore.login(params).then(res => {
                        const userInfo = res
                        if (userInfo) {
                            notification.success({
                                message: t('sys.login.loginSuccessTitle'),
                                description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.cn_name}`,
                                duration: 3,
                            });
                        }
                    }).catch(() => {
                        createSvgCaptcha()
                    });

                })
                .finally(() => {
                    setTimeout(() => {
                        loginLoading.value = false;
                    }, 600);
                });
        }

        // 生成验证码
        async function createSvgCaptcha() {
            svgCaptcha.value = await generateVerifCode()
        }
        onMounted(() => {
            createSvgCaptcha()
        })
        return {
            t,
            modelRef,
            validateInfos,
            onSubmit,
            loginLoading,
            svgCaptcha,
            createSvgCaptcha
        };
    },
})
</script>
<style lang="less" scoped>
#svgTemplate {
    cursor: pointer;
    margin-left: 20px;
}
</style>