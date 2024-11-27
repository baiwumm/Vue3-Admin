<script setup lang="tsx">
import dayjs from 'dayjs';
import { assign } from 'lodash-es';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import { I18nMessage } from '@/constants/i18n';
import { I18N_COMMON } from '@/enum/i18n';
import { $t } from '@/locales';
import { getMessageDetail } from '@/service/api';
import { useTabStore } from '@/store/modules/tab';
const tabStore = useTabStore();

// 获取动态路由 id
const route = useRoute();
const id = route.params.id;

const loading = ref(false);

// 消息详情
const messageInfo = reactive<Partial<Api.Administrative.Message>>({});

// 获取消息详情
const fetchMessageDetail = async () => {
  loading.value = true;
  const { data, error } = await getMessageDetail(id as string);
  if (!error) {
    assign(messageInfo, data);
    // 设置标签页标题
    tabStore.setTabLabel(data.title);
  }
  loading.value = false;
};

onMounted(() => {
  fetchMessageDetail();
});
</script>

<template>
  <div class="message-container">
    <ACard :border="false" :loading="loading">
      <ARow justify="center">
        <ATypographyTitle :level="4">{{ messageInfo.title }}</ATypographyTitle>
      </ARow>
      <ARow justify="end">
        <ASpace direction="vertical">
          <ASpace>
            <span>{{ I18nMessage('userId') }}：</span>
            <AAvatar :src="messageInfo.user?.avatar" class="size-36px!" />
            <ATag :bordered="false" color="processing">{{ messageInfo.user?.cnName }}</ATag>
          </ASpace>
          <ACol>{{ $t(I18N_COMMON.CREATEDAT) }}：{{ dayjs(messageInfo.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</ACol>
        </ASpace>
      </ARow>
      <!-- 主体内容 -->
      <ATypographyParagraph class="mt-6" v-html="messageInfo.content" />
    </ACard>
  </div>
</template>

<style scoped lang="scss">
.message-container {
  :deep(img) {
    display: inline-block;
  }
  :deep(li) {
    list-style: none;
  }
}
</style>
