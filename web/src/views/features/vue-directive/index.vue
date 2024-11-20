<script setup lang="ts">
import { ref } from 'vue';

import { useRouterPush } from '@/hooks/common/router';
import { $t } from '@/locales';

// 国际化
const locales = (field: string) => $t(`page.features.vue-directive.${field}`);

const successText = ref(locales('success'));

// 复制文本
const text = ref(import.meta.env.VITE_APP_TITLE);
// 输入规则
const inputValue = ref<string>('');
const { routerPushByKey } = useRouterPush();

// 长按指令回调
const initLongpress = () => {
  window.$message?.success(successText.value);
};

// 防抖指令回调
const initDebounce = () => {
  window.$message?.success(successText.value);
};

// 节流指令回调
const initThrollte = () => {
  window.$message?.success(successText.value);
};
</script>

<template>
  <ASpace direction="vertical" size="middle">
    <ACard :bordered="false" :body-style="{ padding: 0 }">
      <APageHeader :title="$t('route.features_vue-directive')" />
    </ACard>
    <div class="grid gap-4" :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }">
      <ACard :title="locales('v-copy.title')" :bordered="false">
        <AInputSearch v-model:value="text">
          <template #enterButton>
            <AButton v-copy="text" type="primary">{{ locales('v-copy.button') }}</AButton>
          </template>
        </AInputSearch>
      </ACard>
      <ACard :title="locales('v-longpress.title')" :bordered="false">
        <AButton v-longpress:[1000]="initLongpress" type="primary" block>{{ locales('v-longpress.button') }}</AButton>
      </ACard>
      <ACard :title="locales('v-debounce.title')" :bordered="false">
        <AButton v-debounce="{ callback: initDebounce, time: 1000 }" type="primary" block>
          {{ locales('v-debounce.button') }}
        </AButton>
      </ACard>
      <ACard :title="locales('v-throllte.title')" :bordered="false">
        <AButton v-throllte="{ callback: initThrollte, time: 1000 }" type="primary" block>
          {{ locales('v-throllte.button') }}
        </AButton>
      </ACard>
      <ACard :title="locales('v-emoji.title')" :bordered="false">
        <AInput v-emoji :placeholder="locales('v-emoji.placeholder')" />
      </ACard>
      <ACard :title="locales('v-input.title')" :bordered="false">
        <AInput v-input:decimal_2="inputValue" :placeholder="locales('v-input.placeholder')" data-rule="/[^\d]/" />
      </ACard>
      <ACard :title="locales('v-ripple.title')" :bordered="false">
        <AButton v-ripple type="primary" block>{{ locales('v-ripple.button') }}</AButton>
      </ACard>
      <ACard :title="locales('v-lazyLoad.title')" :bordered="false">
        <AButton type="primary" block @click="routerPushByKey('features_lazyload')">
          {{ locales('v-lazyLoad.button') }}
        </AButton>
      </ACard>
    </div>
  </ASpace>
</template>
