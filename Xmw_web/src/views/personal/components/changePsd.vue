<template>
    <PageWrapper
        :title="t('router.common.changeUserPsd')"
        :content="t('router.common.changePsdSuccess')"
        dense
    >
        <div class="flex flex-col items-center justify-start py-8 bg-white">
            <!-- 修改密码表单 -->
            <BasicForm @register="register" />
            <div class="flex justify-center">
                <a-button @click="resetFields">{{ t('common.resetText') }}</a-button>
                <a-button
                    class="!ml-4"
                    type="primary"
                    @click="handleSubmit"
                    :loading="loading"
                    :disabled="loading"
                >{{ t('common.okText') }}</a-button>
            </div>
        </div>
    </PageWrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'; // 引入 Composition-API
import CryptoJS from 'crypto-js'; // AES/DES加密
import { crypto_key, crypto_iv } from '/@/utils'; // AES/DES加密秘钥
import { BasicForm, useForm } from '/@/components/Form'; // form组件
import { PageWrapper } from '/@/components/Page'; //页面包裹组件
import { pwdForm } from './data'; // 表单
import { changeUserPassword } from '/@/api/personal/personal'; // 个人中心接口
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
import { useUserStore } from '/@/store/modules/user';
const userStore = useUserStore(); // Vuex用户信息

const { t } = useI18n(); // 国际化函数
const loading = ref<boolean>(false); // 加载Loading...
const { createMessage } = useMessage(); //消息函数
// 注册表单组件
const [register, { validate, resetFields }] = useForm({
    size: 'large',
    labelWidth: 140,
    showActionButtonGroup: false,
    schemas: pwdForm,
});
// 修改密码回调
async function handleSubmit() {
    const values = await validate();
    loading.value = true;
    const { passwordOld, passwordNew } = values;
    let params = {
        passwordOld: getAesString(passwordOld), // 旧密码加密
        passwordNew: getAesString(passwordNew), // 新密码加密
    };
    await changeUserPassword(params)
        .then(() => {
            createMessage.success(t('layout.setting.operatingTitle'));
            //   返回登录页
            setTimeout(() => {
                userStore.setToken(undefined);
                userStore.setSessionTimeout(true);
            }, 500);
        })
        .finally(() => {
            setTimeout(() => {
                loading.value = false;
            }, 300);
        });
}
// AES/DES加密
function getAesString(mes: string) {
    var encrypted = CryptoJS.AES.encrypt(mes, crypto_key, {
        iv: crypto_iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString(); //返回的是base64格式的密文
}
</script>
