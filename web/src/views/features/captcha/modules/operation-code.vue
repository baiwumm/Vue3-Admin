<script setup lang="ts">
import { toString } from 'lodash-es';
import { ref, unref } from 'vue';

import { I18nCaptcha } from '@/constants/i18n';
import { I18N_FORM } from '@/enum/i18n';
import { $t } from '@/locales';

import OperationVerify from './operation-verify.vue'; // 运算验证码

defineOptions({
  name: 'OperationCode',
});

const generaCode = ref(''); // 输入的常规验证码
const result = ref(0); // 运算验证码的结果

// 验证码校验
const validateGeneraCode = () => {
  if (!generaCode.value) {
    window.$message?.warning($t(I18N_FORM.CODE_REQUIRED));
  } else if (unref(generaCode) !== toString(unref(result))) {
    window.$message?.error(I18nCaptcha('verifyError'));
  } else {
    window.$message?.success(I18nCaptcha('verifySuccess'));
  }
};
</script>

<template>
  <ARow justify="center" align="middle" :gutter="[10, 10]">
    <ASpace direction="vertical" align="center">
      <OperationVerify v-model="result" :width="160" :height="40" class="cursor-pointer" />
      <AInputSearch v-model:value="generaCode" :placeholder="$t(I18N_FORM.CODE_REQUIRED)">
        <template #enterButton>
          <AButton type="primary" @click="validateGeneraCode">{{ I18nCaptcha('verify') }}</AButton>
        </template>
      </AInputSearch>
    </ASpace>
  </ARow>
</template>
