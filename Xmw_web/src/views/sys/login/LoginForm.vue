<template>
  <Form
    ref="formLogin"
    @keypress.enter="onSubmit"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 19 }"
  >
    <FormItem label="用户名" class="enter-x" v-bind="validateInfos.user_name">
      <Input size="large" v-model:value="modelRef.user_name" :placeholder="t('sys.login.userName')">
        <template #prefix>
          <UserOutlined type="user" />
        </template>
      </Input>
    </FormItem>
    <FormItem label="密码" class="enter-x" v-bind="validateInfos.password">
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
    <FormItem :wrapper-col="{ span: 19, offset: 5 }" class="enter-x" v-bind="validateInfos.verify">
      <BasicDragVerify @success="handleSuccess" width="318">
        <template #text="isPassing">
          <div v-if="isPassing"> 验证成功 </div>
          <div v-else> 请安住滑块,拖动到最右边 </div>
        </template>
      </BasicDragVerify>
    </FormItem>
    <FormItem :wrapper-col="{ span: 19, offset: 5 }" class="enter-x">
      <Button
        size="large"
        block
        type="primary"
        @click.prevent="onSubmit"
        :loading="loginLoading"
        :disabled="loginLoading"
        >{{ t('sys.login.loginButton') }}</Button
      >
    </FormItem>
  </Form>
</template>

<script lang="ts">
import CryptoJS from 'crypto-js'; // AES/DES加密
import { crypto_key, crypto_iv } from '/@/utils'; // AES/DES加密秘钥
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from 'vue';
import { Form, Input, Row, Col, Button, Alert } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { BasicDragVerify, PassingData } from '/@/components/Verify/index'; // 验证组件
const useForm = Form.useForm;
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化
import { useUserStore } from '/@/store/modules/user';
// 登录表单数据类型注解
interface FormState {
  user_name: string;
  password: string;
  verify: boolean;
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
    BasicDragVerify,
  },
  setup() {
    const { t } = useI18n();
    const { createMessage, notification } = useMessage();
    const userStore = useUserStore();
    //   表单数据
    const modelRef: UnwrapRef<FormState> = reactive({
      user_name: '',
      password: '',
      verify: false,
    });
    // userForm注册表单
    const { validate, validateInfos } = useForm(
      modelRef,
      reactive({
        user_name: [
          {
            required: true,
            message: '请输入用户名',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
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
        .then(async (res) => {
          let data = toRaw(modelRef);
          let encryptionPas = CryptoJS.AES.encrypt(data.password, crypto_key, {
            iv: crypto_iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }).toString();
          if (!data.verify) {
            createMessage.warn(`请完成滑块验证!`);
            return;
          }
          //   返回登录用户信息
          const userInfo = await userStore.login(
            toRaw({
              password: encryptionPas,
              user_name: data.user_name,
              mode: 'none', //不要默认的错误提示
            })
          );
          if (userInfo) {
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.cn_name}`,
              duration: 3,
            });
          }
        })
        .finally(() => {
          setTimeout(() => {
            loginLoading.value = false;
          }, 600);
        });
    };
    // 滑块验证成功回调
    function handleSuccess(data: PassingData) {
      console.log(data);
      const { isPassing, time } = data;
      modelRef.verify = isPassing;
      createMessage.success(`校验成功,耗时${time}秒`);
    }
    return {
      t,
      modelRef,
      validateInfos,
      onSubmit,
      loginLoading,
      handleSuccess,
    };
  },
});
</script>

<style lang="less" scoped>
</style>