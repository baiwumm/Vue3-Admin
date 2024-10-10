<script setup lang="ts">
import '@vue-office/docx/lib/index.css';

import VueOfficeDocx from '@vue-office/docx';
import type { UploadProps } from 'ant-design-vue';
import { ref } from 'vue';

import DocxFile from '@/assets/office/test.docx?url';

defineOptions({
  name: 'VueOfficeDocx',
});

const loading = ref(true);
const src = ref(DocxFile);

// 渲染完成
const renderedHandler = () => {
  loading.value = false;
};

// 渲染失败
const errorHandler = () => {
  loading.value = false;
};

// 上传回调
const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = loadEvent => {
    const arrayBuffer = loadEvent.target?.result;
    src.value = arrayBuffer;
  };
  return false;
};
</script>

<template>
  <ASpin :spinning="loading">
    <ASpace direction="vertical" size="middle" class="w-full">
      <AUpload accept=".doc,.docx" :max-count="1" :before-upload="beforeUpload">
        <AButton>{{ $t('page.features.vue-office.upload') }}</AButton>
      </AUpload>
      <div :style="{ height: 'calc(100vh - 350px)' }">
        <VueOfficeDocx :src="src" class="h-screen" @rendered="renderedHandler" @error="errorHandler" />
      </div>
    </ASpace>
  </ASpin>
</template>
