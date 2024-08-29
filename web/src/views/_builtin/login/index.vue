<script setup lang="ts">
import { getColorPalette, mixColor } from '@sa/utils';
import { computed, reactive } from 'vue';

import { useAntdForm, useFormRules } from '@/hooks/common/form';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import { useThemeStore } from '@/store/modules/theme';

import CaptchaCode from './modules/captcha-code.vue';

const authStore = useAuthStore();

const appStore = useAppStore();
const themeStore = useThemeStore();

// 主题色
const bgThemeColor = computed(() =>
  themeStore.darkMode ? getColorPalette(themeStore.themeColor, 7) : themeStore.themeColor,
);

// 背景色
const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff';
  const ratio = themeStore.darkMode ? 0.5 : 0.2;
  return mixColor(COLOR_WHITE, themeStore.themeColor, ratio);
});

const { formRef, validate } = useAntdForm();

const model: Api.Auth.LoginParams = reactive({
  userName: 'Admin',
  password: 'abc123456',
  captchaCode: '',
});

/** @description: 表单验证 */
const rules = computed(() => {
  const { formRules, defaultRequiredRule } = useFormRules();
  return {
    userName: formRules.userName,
    password: formRules.pwd,
    captchaCode: defaultRequiredRule,
  };
});

/** @description: 登录回调 */
async function handleSubmit() {
  await validate();
  await authStore.login(model);
}
</script>

<template>
  <div class="relative size-full flex-center" :style="{ backgroundColor: bgColor }">
    <div class="absolute right-2 top-2 z-2 flex">
      <ThemeSchemaSwitch
        :theme-schema="themeStore.themeScheme"
        :show-tooltip="false"
        class="text-20px lt-sm:text-18px"
        @switch="themeStore.toggleThemeScheme"
      />
      <LangSwitch
        :lang="appStore.locale"
        :lang-options="appStore.localeOptions"
        :show-tooltip="false"
        @change-lang="appStore.changeLocale"
      />
    </div>
    <WaveBg :theme-color="bgThemeColor" />
    <ACard class="relative z-4">
      <div class="w-400px lt-sm:w-300px">
        <header class="flex items-center justify-center">
          <SystemLogo class="text-64px text-primary lt-sm:text-48px" />
          <h3 class="ml-4 text-28px text-primary font-600 lt-sm:text-22px">
            {{ $t('system.title') }}
          </h3>
        </header>
        <main>
          <div class="animation-slide-in-left pt-24px">
            <Transition :name="themeStore.page.animateMode" mode="out-in" appear>
              <AForm ref="formRef" :model="model" :rules="rules">
                <AFormItem name="userName">
                  <AInput
                    v-model:value="model.userName"
                    size="large"
                    :placeholder="$t('page.login.userNamePlaceholder')"
                  >
                    <template #prefix>
                      <SvgIcon icon="ri:user-line" />
                    </template>
                  </AInput>
                </AFormItem>
                <AFormItem name="password">
                  <AInputPassword
                    v-model:value="model.password"
                    size="large"
                    :placeholder="$t('page.login.passwordPlaceholder')"
                  >
                    <template #prefix>
                      <SvgIcon icon="ri:lock-line" />
                    </template>
                  </AInputPassword>
                </AFormItem>
                <AFormItem name="captchaCode">
                  <ARow>
                    <ACol flex="auto">
                      <AInput
                        v-model:value="model.captchaCode"
                        size="large"
                        :placeholder="$t('page.login.codePlaceholder')"
                        @press-enter="handleSubmit"
                      />
                    </ACol>
                    <ACol flex="132px">
                      <!-- 图形验证码 -->
                      <CaptchaCode />
                    </ACol>
                  </ARow>
                </AFormItem>
                <ASpace direction="vertical" size="large" class="w-full">
                  <AButton
                    type="primary"
                    block
                    size="large"
                    shape="round"
                    :loading="authStore.loginLoading"
                    @click="handleSubmit"
                  >
                    {{ $t('common.confirm') }}
                  </AButton>
                </ASpace>
              </AForm>
            </Transition>
          </div>
        </main>
      </div>
    </ACard>
  </div>
</template>

<style scoped></style>
