<script setup lang="ts">
import { ref } from 'vue';

import VueOfficeDocx from './modules/vue-office-docx.vue'; // docs 预览
import VueOfficeExcel from './modules/vue-office-excel.vue'; // Excel 预览
import VueOfficePdf from './modules/vue-office-pdf.vue'; // Pdf 预览

const activeKey = ref('docs');
</script>

<template>
  <div>
    <ACard :bordered="false">
      <ATabs v-model:activeKey="activeKey">
        <ATabPane key="docs" tab="Docs 文件预览">
          <VueOfficeDocx />
        </ATabPane>
        <ATabPane key="excel" tab="Excel 文件预览">
          <VueOfficeExcel />
        </ATabPane>
        <ATabPane key="pdf" tab="Pdf 文件预览">
          <VueOfficePdf />
        </ATabPane>
      </ATabs>
    </ACard>
  </div>
</template>
