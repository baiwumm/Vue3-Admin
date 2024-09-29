<script setup lang="ts">
import { ref } from 'vue';

import { $t } from '@/locales';

import VueOfficeDocx from './modules/vue-office-docx.vue'; // docs 预览
import VueOfficeExcel from './modules/vue-office-excel.vue'; // Excel 预览
import VueOfficePdf from './modules/vue-office-pdf.vue'; // Pdf 预览

const activeKey = ref('docs');

// 国际化
const locales = (field: string) => $t(`page.features.vue-office.${field}`);
</script>

<template>
  <div>
    <ACard :bordered="false">
      <ATabs v-model:activeKey="activeKey">
        <ATabPane key="docs" :tab="locales('docs')">
          <VueOfficeDocx />
        </ATabPane>
        <ATabPane key="excel" :tab="locales('excel')">
          <VueOfficeExcel />
        </ATabPane>
        <ATabPane key="pdf" :tab="locales('pdf')">
          <VueOfficePdf />
        </ATabPane>
      </ATabs>
    </ACard>
  </div>
</template>
