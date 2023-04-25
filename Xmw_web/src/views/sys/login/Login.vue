<template>
    <div :class="prefixCls" class="relative w-full h-full px-4">
        <!-- 粒子背景 -->
        <Particles id="tsparticles" :options="ParticlesConfig" />
        <!-- 切换语言 -->
        <AppLocalePicker
            class="absolute text-white top-4 right-4 enter-x xl:text-gray-600"
            :showText="false"
            v-if="showLocale"
        />
        <!-- 切换黑暗模式 -->
        <AppDarkModeToggle class="absolute top-3 right-7 enter-x" />
        <!-- 登录表单 -->
        <div class="login-container">
            <Card :bordered="false">
                <div class="top">
                    <div class="header enter-x">
                        <img src="../../../assets/images/logo.png" class="logo" alt="logo" />
                        <span class="title">Vue3 Admin</span>
                    </div>
                    <div class="desc enter-x">{{ t('sys.login.motto') }}</div>
                </div>
                <p class="welcome_login enter-x">
                    {{
                        t('sys.login.welcome')
                    }}
                    <em
                        style="margin-left: 10px"
                    >{{ t('sys.login.managementSystem') }}</em>
                </p>
                <!-- 登录表单 -->
                <LoginForm />
            </Card>
        </div>
        <LayoutFooter style="background: none" class="absolute inset-x-0 bottom-0" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'; // 引入 Composition-API
import { Card } from 'ant-design-vue'; // 引入antd组件
import LoginForm from './LoginForm.vue'; // 引入表单
import { AppLocalePicker, AppDarkModeToggle } from '/@/components/Application'; // 引入国际化、黑暗模式
import { useDesign } from '/@/hooks/web/useDesign';
import { useLocaleStore } from '/@/store/modules/locale';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
export default defineComponent({
    name: 'login',
    components: {
        Card,
        LoginForm,
        AppLocalePicker,
        AppDarkModeToggle,
        LayoutFooter: createAsyncComponent(() => import('/@/layouts/default/footer/index.vue')),
    },
    setup() {
        const { t } = useI18n(); // 国际化函数
        const { prefixCls } = useDesign('login');
        const localeStore = useLocaleStore();
        // 粒子背景配置
        const ParticlesConfig = ref({
            background: {
                position: '50% 50%',
                repeat: 'no-repeat',
                size: 'cover',
            },
            fullScreen: { enable: true, zIndex: -1 },
            particles: {
                color: { value: ['#5bc0eb', '#fde74c', '#9bc53d', '#e55934', '#fa7921'] },
                move: {
                    direction: 'top',
                    enable: true,
                    outModes: { bottom: 'out', left: 'out', right: 'out', top: 'out' },
                    speed: 5,
                },
                number: { value: 30 },
                opacity: {
                    random: { enable: true, minimumValue: 0.4 },
                    value: { min: 0.4, max: 0.8 },
                    animation: {
                        speed: 1,
                        minimumValue: 0.1,
                    },
                },
                size: {
                    random: { enable: true, minimumValue: 30 },
                    value: { min: 30, max: 100 },
                    animation: { enable: true, speed: 80, minimumValue: 100 },
                },
            },
            preset: 'bigCircles',
        });
        return { prefixCls, showLocale: localeStore.getShowPicker, ParticlesConfig, t };
    },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-login";
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
                font-family: Avenir, "Helvetica Neue", Arial, Helvetica,
                    sans-serif;
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