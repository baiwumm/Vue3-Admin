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
        <AButton v-print type="primary">全屏打印</AButton>
        <AButton v-print="'#print-el'" type="primary">指令打印</AButton>
        <AButton type="primary" @click="handleBasicPrint">方法打印</AButton>
        <AButton v-print="printOps" type="primary">打印忽略 img 标签</AButton>
      </ASpace>
    </ACard>
  </div>
</template>
