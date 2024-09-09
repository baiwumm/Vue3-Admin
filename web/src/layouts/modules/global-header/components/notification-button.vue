<script setup lang="ts">
import { Avatar, Button, notification } from 'ant-design-vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { assign } from 'lodash-es';
import { h, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';

import { useRouterPush } from '@/hooks/common/router';
import { $t } from '@/locales';
import { createMessageRead, getUnreadMessageCount, getUnreadMessageList } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';
import { getServiceBaseURL } from '@/utils/service';

// 使用 relativeTime 插件
dayjs.extend(relativeTime);

defineOptions({
  name: 'NotificationButton',
});

const authStore = useAuthStore();

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

// 创建 EventSource 实例
const eventSource = new EventSourcePolyfill(`${baseURL}/administrative/message/sse/event`, {
  headers: {
    Authorization: `Bearer ${authStore.token}`,
  },
  heartbeatTimeout: 60 * 60 * 1000, // 这是自定义配置请求超时时间  默认是45000ms
});

const [api, ContextHolder] = notification.useNotification();

const { routerPushByKey } = useRouterPush();

// 未读条数
const unReadMessageCount = ref<number>(0);
const countLoading = ref(false);
// 未读列表
const unReadMessageList = ref<Api.Administrative.Message[]>([]);
const messageListLoading = ref(false);

// 分页条数
const pageSize = 5;

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
const fetchUnreadMessageList = async (current: number = 1, size: number = pageSize) => {
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
  pageSize,
  showSizeChanger: false,
  total: 0,
  onChange: (current: number, size: number) => {
    assign(pagination, {
      current,
    });
    fetchUnreadMessageList(current, size);
  },
});

/** @description: 初始化未读数据 */
const initUnReadMessage = async () => {
  await fetchUnReadMessageCount();
  await fetchUnreadMessageList();
};

/** @description: 创建已读信息 */
const handleCreateMessage = async (id: string) => {
  const { error } = await createMessageRead({
    id,
  });
  if (!error) {
    initUnReadMessage();
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

/** @description: 显示隐藏的回调 */
const openChange = (visible: boolean) => {
  if (visible && !unReadMessageList.value?.length) {
    fetchUnreadMessageList();
  }
};

/** @description: 服务器推送 */
const handleMessageEvent = () => {
  eventSource.onmessage = (e: MessageEvent) => {
    const { user, title, userId, id }: Api.Administrative.Message = JSON.parse(e.data) || {};
    // 初始化未读数据
    initUnReadMessage();
    // 弹窗提示
    if (authStore.userInfo.id !== userId) {
      api.open({
        message: `${user.cnName} - ${$t('components.notificationButton.title')}`,
        description: title,
        duration: null,
        icon: () => h(Avatar, { src: user.avatar }),
        btn: () =>
          h(
            Button,
            {
              type: 'primary',
              size: 'small',
              onClick: () => {
                handleJumpDetail(id);
                api.destroy();
              },
            },
            { default: () => $t('components.notificationButton.view') },
          ),
      });
    }
  };
};

watch(unReadMessageCount, newVal => {
  assign(pagination, {
    total: newVal,
  });
});

onMounted(() => {
  fetchUnReadMessageCount();
  handleMessageEvent();
});

onBeforeUnmount(() => {
  // 组件卸载前关闭连接
  eventSource.close();
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
  <ContextHolder />
</template>
