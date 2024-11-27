<script setup lang="ts">
import { ref } from 'vue';

import { I18nVueOffice } from '@/constants/i18n';

import VueOfficeDocx from './modules/vue-office-docx.vue'; // docs 预览
import VueOfficeExcel from './modules/vue-office-excel.vue'; // Excel 预览
import VueOfficePdf from './modules/vue-office-pdf.vue'; // Pdf 预览

const activeKey = ref('docs');
</script>

<template>
  <div>
    <ACard :bordered="false">
      <ATabs v-model:activeKey="activeKey">
        <ATabPane key="docs" :tab="I18nVueOffice('docs')">
          <VueOfficeDocx />
        </ATabPane>
        <ATabPane key="excel" :tab="I18nVueOffice('excel')">
          <VueOfficeExcel />
        </ATabPane>
        <ATabPane key="pdf" :tab="I18nVueOffice('pdf')">
          <VueOfficePdf />
        </ATabPane>
      </ATabs>
    </ACard>
  </div>
</template>
