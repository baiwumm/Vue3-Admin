<script setup lang="ts">
import type { RouteKey } from '@elegant-router/types';
import { createReusableTemplate } from '@vueuse/core';
import { useAttrs } from 'vue';

import { useRouterPush } from '@/hooks/common/router';
import { useRouteStore } from '@/store/modules/route';
import { useThemeStore } from '@/store/modules/theme';

defineOptions({
  name: 'GlobalBreadcrumb',
  inheritAttrs: false,
});

const attrs = useAttrs();
const themeStore = useThemeStore();
const routeStore = useRouteStore();
const { routerPushByKey } = useRouterPush();

interface BreadcrumbContentProps {
  breadcrumb: App.Global.Menu;
}

const [DefineBreadcrumbContent, BreadcrumbContent] = createReusableTemplate<BreadcrumbContentProps>();

function handleClickMenu(key: RouteKey) {
  routerPushByKey(key);
}
</script>

<template>
  <!-- define component start: BreadcrumbContent -->
  <DefineBreadcrumbContent v-slot="{ breadcrumb }">
    <div class="i-flex-y-center align-middle">
      <component :is="breadcrumb.icon" v-if="themeStore.header.breadcrumb.showIcon" class="mr-4px text-icon" />
      {{ breadcrumb.label }}
    </div>
  </DefineBreadcrumbContent>
  <!-- define component end: BreadcrumbContent -->

  <ABreadcrumb v-if="themeStore.header.breadcrumb.visible" v-bind="attrs">
    <ABreadcrumbItem v-for="item in routeStore.breadcrumbs" :key="item.key">
      <BreadcrumbContent :breadcrumb="item" />

      <template v-if="item.children?.length" #overlay>
        <AMenu>
          <AMenuItem v-for="option in item.children" :key="option.key" @click="handleClickMenu(option.routeKey)">
            <BreadcrumbContent :breadcrumb="option" />
          </AMenuItem>
        </AMenu>
      </template>
    </ABreadcrumbItem>
  </ABreadcrumb>
</template>

<style scoped></style>
