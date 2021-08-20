<template>
  <PageWrapper
    :title="t('router.common.changeUserPsd')"
    :content="t('router.common.changePsdSuccess')"
    dense
  >
    <div class="flex flex-col items-center justify-start py-8 bg-white">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> {{ t('common.resetText') }} </a-button>
        <a-button
          class="!ml-4"
          type="primary"
          @click="handleSubmit"
          :loading="loading"
          :disabled="loading"
        >
          {{ t('common.okText') }}
        </a-button>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CryptoJS from 'crypto-js'; // AES/DES加密
import { crypto_key, crypto_iv } from '/@/utils'; // AES/DES加密秘钥
import { BasicForm, useForm } from '/@/components/Form';
import { PageWrapper } from '/@/components/Page';
import { pwdForm } from './data';
import { changeUserPassword } from '/@/api/personal/personal'; // 个人中心接口
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { useI18n } from '/@/hooks/web/useI18n';
import { useUserStore } from '/@/store/modules/user';
const userStore = useUserStore();
export default defineComponent({
  name: 'changePsd',
  components: { PageWrapper, BasicForm },
  setup() {
    const { t } = useI18n();
    const loading = ref(false);
    const { createMessage } = useMessage();
    const [register, { validate, resetFields }] = useForm({
      size: 'large',
      labelWidth: 140,
      showActionButtonGroup: false,
      schemas: pwdForm,
    });
    async function handleSubmit() {
      const values = await validate();
      loading.value = true;
      const { passwordOld, passwordNew } = values;
      let params = {
        passwordOld: getAesString(passwordOld),
        passwordNew: getAesString(passwordNew),
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
    function getAesString(mes) {
      var encrypted = CryptoJS.AES.encrypt(mes, crypto_key, {
        iv: crypto_iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString(); //返回的是base64格式的密文
    }
    return { register, resetFields, handleSubmit, loading, t };
  },
});
</script>

<style>
</style>