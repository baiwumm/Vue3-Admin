<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { assign } from 'lodash-es';
import { onMounted, reactive, ref, watch } from 'vue';

import { useRouterPush } from '@/hooks/common/router';
import { createMessageRead, getUnreadMessageCount, getUnreadMessageList } from '@/service/api';

// 使用 relativeTime 插件
dayjs.extend(relativeTime);

defineOptions({
  name: 'NotificationButton',
});

const { routerPushByKey } = useRouterPush();

// 未读条数
const unReadMessageCount = ref<number>(0);
const countLoading = ref(false);
// 未读列表
const unReadMessageList = ref<Api.Administrative.Message[]>([]);
const messageListLoading = ref(false);

// 获取未读条数
const fetchUnReadMessageCount = async () => {
  countLoading.value = true;
  const { data, error } = await getUnreadMessageCount();
  if (!error) {
    unReadMessageCount.value = data;
  }
  countLoading.value = false;
};

// 获取未读列表
const fetchUnreadMessageList = async (current: number = 1, size: number = 5) => {
  messageListLoading.value = true;
  const { data, error } = await getUnreadMessageList({ current, size });
  if (!error) {
    unReadMessageList.value = data;
  }
  messageListLoading.value = false;
};

// 切换分页回调
const pagination = reactive({
  current: 1,
  align: 'start',
  pageSize: 5,
  showSizeChanger: false,
  total: 0,
  onChange: (page: number, pageSize: number) => {
    fetchUnreadMessageList(page, pageSize);
  },
});

/** @description: 创建已读信息 */
const handleCreateMessage = async (id: string) => {
  const { error } = await createMessageRead({
    id,
  });
  if (!error) {
    fetchUnReadMessageCount();
    fetchUnreadMessageList();
  }
};

/** @description: 跳转消息公告详情 */
const handleJumpDetail = async (id: string) => {
  assign(pagination, {
    current: 1,
  });
  routerPushByKey('administrative_message-detail', { params: { id } });
  await handleCreateMessage(id);
};

const openChange = (visible: boolean) => {
  if (visible && !unReadMessageList.value?.length) {
    fetchUnreadMessageList();
  }
};

watch(unReadMessageCount, newVal => {
  assign(pagination, {
    total: newVal,
  });
});

onMounted(() => {
  fetchUnReadMessageCount();
});
</script>

<template>
  <APopover :overlay-style="{ width: '400px' }" placement="bottomRight" @open-change="openChange">
    <ABadge :count="unReadMessageCount" :offset="[-14, 10]">
      <ASpin :spinning="countLoading">
        <ButtonIcon icon="ri:notification-line" />
      </ASpin>
    </ABadge>
    <template #content>
      <AList
        item-layout="horizontal"
        :data-source="unReadMessageList"
        :loading="messageListLoading"
        :pagination="pagination"
      >
        <template #renderItem="{ item }">
          <AListItem>
            <AListItemMeta>
              <template #title>
                <a @click="handleJumpDetail(item.id)">{{ item.title }}</a>
              </template>
              <template #avatar>
                <AAvatar :src="item.user.avatar" />
              </template>
              <template #description>
                <ARow justify="space-between">
                  <ACol>{{ item.user.cnName }}</ACol>
                  <ACol>{{ dayjs(item.createdAt).fromNow() }}</ACol>
                </ARow>
              </template>
            </AListItemMeta>
          </AListItem>
        </template>
      </AList>
    </template>
  </APopover>
</template>
