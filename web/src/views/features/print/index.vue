<script setup lang="ts">
import { type PrintAreaOption, VuePrintNext, vPrint } from 'vue-print-next';

import { $t } from '@/locales';

const handleBasicPrint = () => {
  new VuePrintNext({ el: '#print-el' });
};

const printOps: PrintAreaOption = {
  el: '#print-el',
  // 打印忽略 img
  noPrintSelector: ['img'],
};

// 国际化
const locales = (field: string) => $t(`page.features.print.${field}`);
</script>

<template>
  <div id="print-el">
    <ACard :bordered="false" :title="$t('route.features_print')">
      <template #extra>
        <AButton
          type="primary"
          href="https://github.com/Alessandro-Pang/vue-print-next"
          target="_blank"
          rel="noopener noreferrer"
        >
          vue-print-next
        </AButton>
      </template>
      <ASpace>
        <AButton v-print type="primary">{{ locales('fullScreen') }}</AButton>
        <AButton v-print="'#print-el'" type="primary">{{ locales('instruction') }}</AButton>
        <AButton type="primary" @click="handleBasicPrint">{{ locales('method') }}</AButton>
        <AButton v-print="printOps" type="primary">{{ locales('ingoreImg') }}</AButton>
      </ASpace>
    </ACard>
  </div>
</template>
