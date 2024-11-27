<script setup lang="ts">
import { join, random, times, toLower } from 'lodash-es';
import { onMounted, ref, unref } from 'vue';

import { I18nCaptcha } from '@/constants/i18n';
import { I18N_FORM } from '@/enum/i18n';
import { $t } from '@/locales';
import { codeChars } from '@/utils';

import GeneraVerify from './genera-verify.vue';

defineOptions({
  name: 'GraphicCode',
});

const generaCode = ref(''); // 输入的常规验证码
const identifyCode = ref(''); // 图形验证码的值

// 刷新常规验证码
const refreshCode = () => {
  generaCode.value = '';
  identifyCode.value = join(
    times(4, () => codeChars[random(0, codeChars.length)]),
    '',
  );
};

// 验证码校验
const validateGeneraCode = () => {
  if (!generaCode.value) {
    window.$message?.warning($t(I18N_FORM.CODE_REQUIRED));
  } else if (toLower(unref(generaCode)) !== toLower(unref(identifyCode))) {
    window.$message?.error(I18nCaptcha('verifyError'));
  } else {
    window.$message?.success(I18nCaptcha('verifySuccess'));
  }
};

onMounted(() => {
  refreshCode();
});
</script>

<template>
  <ARow justify="center" align="middle" :gutter="[10, 10]">
    <ASpace direction="vertical" align="center">
      <GeneraVerify
        :identify-code="identifyCode"
        :content-height="40"
        :content-width="160"
        :background-color-min="0"
        :background-color-max="255"
        class="cursor-pointer"
        @click="refreshCode"
      />
      <AInputSearch v-model:value="generaCode" :placeholder="$t(I18N_FORM.CODE_REQUIRED)">
        <template #enterButton>
          <AButton type="primary" @click="validateGeneraCode">{{ I18nCaptcha('verify') }}</AButton>
        </template>
      </AInputSearch>
    </ASpace>
  </ARow>
</template>
