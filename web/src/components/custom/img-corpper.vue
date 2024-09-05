<script lang="ts" setup>
import { ref } from 'vue';
import ImgCutter from 'vue-img-cutter';

import { $t } from '@/locales';
import { uploadSingleFile } from '@/service/api';

defineOptions({
  name: 'ImgCropper',
});

// 父组件传递的值
type Props = {
  modelValue: string;
};
defineProps<Props>();

// 父组件自定义事件
interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const emit = defineEmits<Emits>();

const loading = ref<boolean>(false);
/** @description: 完成截图后要执行的方法 */
const handleCut = async croppedData => {
  const formData = new FormData();
  formData.append('file', croppedData.blob);
  loading.value = true;
  const { error, data } = await uploadSingleFile(formData);
  if (!error) {
    emit('update:modelValue', data.path);
  }
  loading.value = false;
};
</script>

<template>
  <div class="w-full flex items-center justify-center">
    <AFormItem name="avatar">
      <ASpace direction="vertical" align="center">
        <!-- 头像 -->
        <ASpin :spinning="loading">
          <AAvatar :src="modelValue" :size="128" class="w-full flex items-center justify-center">
            <template #icon>
              <SvgIcon icon="ri:user-line" class="size-96px!" />
            </template>
          </AAvatar>
        </ASpin>
        <!-- 裁剪弹窗 -->
        <ImgCutter :label="$t('form.upload.button')" :show-choose-btn="false" @cut-down="handleCut">
          <template #cancel>
            <AButton>{{ $t('common.cancel') }}</AButton>
          </template>
          <template #confirm>
            <AButton type="primary" class="ml-2">{{ $t('common.confirm') }}</AButton>
          </template>
          <template #choose>
            <AButton type="primary" class="ml-2">{{ $t('form.upload.button') }}</AButton>
          </template>
        </ImgCutter>
      </ASpace>
    </AFormItem>
  </div>
</template>
