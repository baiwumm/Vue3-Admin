<script setup lang="ts">
import VueOfficePdf from '@vue-office/pdf';
import type { UploadProps } from 'ant-design-vue';
import { ref } from 'vue';

defineOptions({
  name: 'VueOfficePdf',
});

// 获取文件地址
const getFileUrl = (file: string) => {
  return new URL(file, import.meta.url).href;
};

const loading = ref(true);
const src = ref(getFileUrl('../../../../assets/office/test.pdf'));

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
      <AUpload accept=".pdf" :max-count="1" :before-upload="beforeUpload">
        <AButton>上传本地文件</AButton>
      </AUpload>
      <VueOfficePdf :src="src" @rendered="renderedHandler" @error="errorHandler" />
    </ASpace>
  </ASpin>
</template>
