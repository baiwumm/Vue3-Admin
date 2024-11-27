<script setup lang="ts">
import { type PrintAreaOption, VuePrintNext, vPrint } from 'vue-print-next';

import { I18nPrint } from '@/constants/i18n';
import { $t } from '@/locales';

const handleBasicPrint = () => {
  new VuePrintNext({ el: '#print-el' });
};

const printOps: PrintAreaOption = {
  el: '#print-el',
  // 打印忽略 img
  noPrintSelector: ['img'],
};
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
        <AButton v-print type="primary">{{ I18nPrint('fullScreen') }}</AButton>
        <AButton v-print="'#print-el'" type="primary">{{ I18nPrint('instruction') }}</AButton>
        <AButton type="primary" @click="handleBasicPrint">{{ I18nPrint('method') }}</AButton>
        <AButton v-print="printOps" type="primary">{{ I18nPrint('ingoreImg') }}</AButton>
      </ASpace>
    </ACard>
  </div>
</template>
