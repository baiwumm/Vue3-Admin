<script lang="ts" setup>
import type { UploadChangeParam, UploadFile } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { get } from 'lodash-es';
import { ref } from 'vue';

import { $t } from '@/locales';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'SettingAvatar',
  inheritAttrs: false,
});

// 父组件传递的值
type Props = {
  model: Api.SystemManage.SaveUserManage;
};
defineProps<Props>();

const authStore = useAuthStore();

const emit = defineEmits(['update:model']);

const fileList = ref([]);
const loading = ref<boolean>(false);

const handleChange = ({ file }: UploadChangeParam) => {
  // 移除图片清空值
  if (file.status === 'removed') {
    emit('update:model', {
      avatar: '',
    });
  } else {
    // 图片上传中
    if (file.status === 'uploading') {
      loading.value = true;
      return;
    }
    // 图片上传完成
    if (file.status === 'done') {
      loading.value = false;
      emit('update:model', {
        avatar: get(file, 'response.data.path'),
      });
    }
    if (file.status === 'error') {
      loading.value = false;
      message.error($t('form.upload.error'));
    }
  }
};

/**
 * @param {any} file
 * @description: 上传文件之前的钩子
 */
const beforeUpload = (file: UploadFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error($t('form.upload.fileType', { type: 'jpeg/png' }));
  }
  const isLt2M = file.size ? file.size / 1024 / 1024 < 2 : false;
  if (!isLt2M) {
    message.error($t('form.upload.limitSize', { limitSize: '2M' }));
  }
  return isJpgOrPng && isLt2M;
};
</script>

<template>
  <div class="w-full flex items-center justify-center">
    <AFormItem name="avatar">
      <AUpload
        v-model:file-list="fileList"
        accept="image/png,image/jpeg"
        list-type="picture-card"
        class="avatar-uploader"
        :headers="{
          Authorization: `Bearer ${authStore.token}`,
        }"
        :show-upload-list="false"
        action="/proxy-default/upload/single-file"
        :before-upload="beforeUpload"
        :max-count="1"
        @change="handleChange"
      >
        <ASpin :spinning="loading">
          <img v-if="model.avatar" :src="model.avatar" alt="Avatar" />
          <SvgIcon v-else icon="ri:add-large-line" class="text-base" />
        </ASpin>
      </AUpload>
    </AFormItem>
  </div>
</template>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 40px;
  color: #999;
}
</style>
