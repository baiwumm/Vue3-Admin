<script setup lang="ts">
import { Modal } from 'ant-design-vue';

import { useRouterPush } from '@/hooks/common/router';
import { $t } from '@/locales';
import { fetchLogout } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'UserAvatar',
});

const authStore = useAuthStore();
const { routerPushByKey, toLogin } = useRouterPush();

function loginOrRegister() {
  toLogin();
}

function logout() {
  Modal.confirm({
    title: $t('common.tip'),
    content: $t('common.logoutConfirm'),
    okText: $t('common.confirm'),
    cancelText: $t('common.cancel'),
    onOk: async () => {
      const { error } = await fetchLogout();
      if (!error) {
        authStore.resetStore();
      }
    },
  });
}
</script>

<template>
  <AButton v-if="!authStore.isLogin" @click="loginOrRegister">{{ $t('page.login.loginNow') }}</AButton>
  <ADropdown v-else placement="bottomRight" trigger="click">
    <ButtonIcon>
      <SoybeanAvatar class="size-24px!" />
      <span class="text-16px font-medium">{{ authStore.userInfo.cnName }}</span>
    </ButtonIcon>
    <template #overlay>
      <AMenu>
        <AMenuItem @click="routerPushByKey('user-center')">
          <div class="flex-center gap-8px">
            <SvgIcon icon="ri:id-card-line" class="text-icon" />
            {{ $t('route.user-center') }}
          </div>
        </AMenuItem>
        <AMenuDivider />
        <AMenuItem @click="logout">
          <div class="flex-center gap-8px">
            <SvgIcon icon="ph:sign-out" class="text-icon" />
            {{ $t('common.logout') }}
          </div>
        </AMenuItem>
      </AMenu>
    </template>
  </ADropdown>
</template>

<style scoped></style>
