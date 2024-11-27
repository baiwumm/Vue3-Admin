<script setup lang="ts">
import { eq, find, get } from 'lodash-es';
import { onMounted, ref, watch } from 'vue';

import { StatueOptions } from '@/constants';
import { I18nUserCenter } from '@/constants/i18n';
import { STATUS, UNIFORM_TEXT } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { getMessageList } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';

const authStore = useAuthStore();
const { routerPushByKey } = useRouterPush();

defineOptions({
  name: 'PublishMessage',
});

const loading = ref(false);
const total = ref(0);
const messageList = ref<Api.Administrative.Message[]>([]);

// 请求已发布公告列表
const fetchPublishMessageList = async (current = 1, size = 5) => {
  loading.value = true;
  const { data, error } = await getMessageList({
    userId: authStore.userInfo.id,
    current,
    size,
  });
  if (!error) {
    total.value = get(data, 'total', 0);
    messageList.value = get(data, 'records', []);
  }
  loading.value = false;
};

// 切换分页回调
const pagination = {
  align: 'start',
  pageSize: 5,
  showSizeChanger: false,
  total: total.value,
  size: 'small',
  onChange: (page: number, pageSize: number) => {
    fetchPublishMessageList(page, pageSize);
  },
};

/** @description: 跳转消息公告详情 */
const handleJumpDetail = async (record: Api.Administrative.Message) => {
  routerPushByKey('administrative_message-detail', { params: { id: record.id } });
};

watch(total, newVal => {
  pagination.total = newVal;
});

onMounted(() => {
  fetchPublishMessageList();
});
</script>

<template>
  <ACard
    :title="I18nUserCenter('title.publishMessage')"
    :bordered="false"
    class="h-full flex-col-stretch card-wrapper"
    :body-style="{ flex: 1, overflow: 'hidden', padding: '10px 0' }"
  >
    <AList item-layout="horizontal" size="small" :pagination="pagination" :data-source="messageList" :loading="loading">
      <template #renderItem="{ item }">
        <AListItem :key="item.id">
          <template #actions>
            <ATag :bordered="false" :color="eq(item.status, STATUS.ACTIVE) ? 'processing' : 'error'">
              {{ get(find(StatueOptions, ['value', item.status]), 'label', UNIFORM_TEXT.NULL) }}
            </ATag>
          </template>
          <AListItemMeta>
            <template #title>
              <a @click="() => handleJumpDetail(item)">
                {{ item.title }}
              </a>
            </template>
            <template #avatar>
              <AAvatar :src="item.user.avatar" class="size-32px!" />
            </template>
          </AListItemMeta>
        </AListItem>
      </template>
    </AList>
  </ACard>
</template>
