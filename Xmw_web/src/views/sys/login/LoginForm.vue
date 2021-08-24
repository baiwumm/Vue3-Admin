<template>
  <Form
    ref="formLogin"
    @keypress.enter="onSubmit"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
  >
    <FormItem :label="t('router.common.userName')" class="enter-x" v-bind="validateInfos.user_name">
      <Input size="large" v-model:value="modelRef.user_name" :placeholder="t('sys.login.userName')">
        <template #prefix>
          <UserOutlined type="user" />
        </template>
      </Input>
    </FormItem>
    <FormItem :label="t('router.common.passWord')" class="enter-x" v-bind="validateInfos.password">
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
    <FormItem :wrapper-col="{ span: 18, offset: 6 }" class="enter-x" v-bind="validateInfos.verify">
      <div id="aliyunVerify"></div>
    </FormItem>
    <FormItem :wrapper-col="{ span: 18, offset: 6 }" class="enter-x">
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
import { defineComponent, reactive, ref, toRaw, UnwrapRef, onMounted } from 'vue';
import { Form, Input, Row, Col, Button, Alert } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
const useForm = Form.useForm;
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化
import { useUserStore } from '/@/store/modules/user';
import { cloneDeep } from 'lodash-es';
// 登录表单数据类型注解
interface FormState {
  user_name: string;
  password: string;
  sessionId: string;
  sig: string;
  token: string;
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
  },
  setup() {
    const { t } = useI18n();
    const { createMessage, notification } = useMessage();
    const userStore = useUserStore();
    //   表单数据
    const modelRef: UnwrapRef<FormState> = reactive({
      user_name: 'admin',
      password: '123456',
      sessionId: '',
      sig: '',
      token: '',
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
          if (!data.sessionId || !data.sig || !data.token) {
            createMessage.warn(t('sys.login.verification'));
            return;
          }
          let encryptionPas = CryptoJS.AES.encrypt(data.password, crypto_key, {
            iv: crypto_iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }).toString();
          let params = toRaw(Object.assign(data, { password: encryptionPas, mode: 'none' }));
          //   返回登录用户信息
          const userInfo = await userStore.login(params);
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
    // 阿里云智能验证
    function initAliyunVerify() {
      AWSC.use('ic', function (state, module) {
        // 初始化
        window.ic = module.init({
          // 应用类型标识。它和使用场景标识（scene字段）一起决定了智能验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
          appkey: 'FFFF0N000000000098FA',
          // 使用场景标识。它和应用类型标识（appkey字段）一起决定了智能验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的scene值，请务必正确填写。
          scene: 'ic_login',
          // 声明智能验证需要渲染的目标元素ID。
          renderTo: 'aliyunVerify',
          // 验证通过时会触发该回调参数。您可以在该回调参数中将会话ID（sessionId）、签名串（sig）、请求唯一标识（token）字段记录下来，随业务请求一同发送至您的服务端调用验签。
          // 智能验证组件初始状态文案。
          default_txt: t('sys.login.verification'),
          //智能验证组件验证通过状态文案。
          success_txt: t('sys.login.verifySuccess'),
          //智能验证组件验证失败（拦截）状态文案。
          fail_txt: t('sys.login.verifyFailed'),
          //智能验证组件验证中状态文案。
          scaning_txt: t('sys.login.detection'),
          success: function (data) {
            modelRef.sessionId = data.sessionId;
            modelRef.sig = data.sig;
            modelRef.token = data.token;
          },
          // 验证失败时触发该回调参数
          fail: function (failCode) {
            createMessage.error(t('component.verify.error') + failCode);
          },
          // 验证码加载异常时触发该回调参数
          error: function (errorCode) {
            createMessage.error(t('sys.login.abnormal') + errorCode);
          },
        });
      });
    }
    onMounted(() => {
      initAliyunVerify();
    });

    return {
      t,
      modelRef,
      validateInfos,
      onSubmit,
      loginLoading,
    };
  },
});
</script>