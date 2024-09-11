<script setup lang="ts">
import { toString } from 'lodash-es';
import { ref, unref } from 'vue';

import { $t } from '@/locales';

import OperationVerify from './operation-verify.vue'; // 运算验证码

defineOptions({
  name: 'OperationCode',
});

// 父组件传递的值
type Props = {
  locales: (field: string) => string;
};
const props = defineProps<Props>();

const generaCode = ref(''); // 输入的常规验证码
const result = ref(0); // 运算验证码的结果

// 验证码校验
const validateGeneraCode = () => {
  if (!generaCode.value) {
    window.$message?.warning($t('form.code.required'));
  } else if (unref(generaCode) !== toString(unref(result))) {
    window.$message?.error(props.locales('verifyError'));
  } else {
    window.$message?.success(props.locales('verifySuccess'));
  }
};
</script>

<template>
  <ARow justify="center" align="middle" :gutter="[10, 10]">
    <ACol flex="160px">
      <OperationVerify v-model="result" :width="160" :height="40" class="cursor-pointer" />
    </ACol>
    <ACol :style="{ flex: 1 }">
      <AInputSearch v-model:value="generaCode" :placeholder="$t('form.code.required')" size="large">
        <template #enterButton>
          <AButton type="primary" @click="validateGeneraCode">{{ locales('verify') }}</AButton>
        </template>
      </AInputSearch>
    </ACol>
  </ARow>
</template>
