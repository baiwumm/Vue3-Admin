<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <AppLocalePicker
      class="absolute text-white top-4 right-4 enter-x xl:text-gray-600"
      :showText="false"
      v-if="showLocale"
    />
    <AppDarkModeToggle class="absolute top-3 right-7 enter-x" />
    <div class="login-container">
      <Card :bordered="false">
        <div class="top">
          <div class="header enter-x">
            <img src="../../../assets/images/logo.svg" class="logo" alt="logo" />
            <span class="title">vue-admin-xmw-pro</span>
          </div>
          <div class="desc enter-x">真正的大师永远怀着一颗学徒的心。</div>
        </div>
        <p class="welcome_login enter-x">欢迎登陆<em>后台管理系统</em></p>
        <!-- 登录表单 -->
        <LoginForm />
      </Card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Card } from 'ant-design-vue';
import LoginForm from './LoginForm.vue';
import { AppLocalePicker, AppDarkModeToggle } from '/@/components/Application';
import { useDesign } from '/@/hooks/web/useDesign';
import { useLocaleStore } from '/@/store/modules/locale';
export default defineComponent({
  name: 'login',
  components: {
    Card,
    LoginForm,
    AppLocalePicker,
    AppDarkModeToggle,
  },
  setup() {
    const { prefixCls } = useDesign('login');
    const localeStore = useLocaleStore();
    return { prefixCls, showLocale: localeStore.getShowPicker };
  },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-login';
.login-container {
  position: relative;
  top: 50%;
  transform: translateY(-60%);
  width: 450px;
  margin: 0 auto;
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
        border-style: none;
        display: inline-block;
      }
      .title {
        font-size: 33px;
        opacity: 0.85;
        font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 16px;
      margin-top: 12px;
      margin-bottom: 20px;
    }
  }
  .ant-card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .welcome_login {
      text-align: center;
      font-size: 22px;
      font-family: SimSun;
      margin-bottom: 15px;
      em {
        color: #47a7fb;
      }
    }
  }
}
</style>