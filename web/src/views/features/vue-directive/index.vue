<script setup lang="ts">
import { ref } from 'vue';

import { I18nVueDirective } from '@/constants/i18n';
import { useRouterPush } from '@/hooks/common/router';
import { $t } from '@/locales';

const successText = ref(I18nVueDirective('success'));

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
      <ACard :title="I18nVueDirective('v-copy.title')" :bordered="false">
        <AInputSearch v-model:value="text">
          <template #enterButton>
            <AButton v-copy="text" type="primary">{{ I18nVueDirective('v-copy.button') }}</AButton>
          </template>
        </AInputSearch>
      </ACard>
      <ACard :title="I18nVueDirective('v-longpress.title')" :bordered="false">
        <AButton v-longpress:[1000]="initLongpress" type="primary" block>
          {{ I18nVueDirective('v-longpress.button') }}
        </AButton>
      </ACard>
      <ACard :title="I18nVueDirective('v-debounce.title')" :bordered="false">
        <AButton v-debounce="{ callback: initDebounce, time: 1000 }" type="primary" block>
          {{ I18nVueDirective('v-debounce.button') }}
        </AButton>
      </ACard>
      <ACard :title="I18nVueDirective('v-throllte.title')" :bordered="false">
        <AButton v-throllte="{ callback: initThrollte, time: 1000 }" type="primary" block>
          {{ I18nVueDirective('v-throllte.button') }}
        </AButton>
      </ACard>
      <ACard :title="I18nVueDirective('v-emoji.title')" :bordered="false">
        <AInput v-emoji :placeholder="I18nVueDirective('v-emoji.placeholder')" />
      </ACard>
      <ACard :title="I18nVueDirective('v-input.title')" :bordered="false">
        <AInput
          v-input:decimal_2="inputValue"
          :placeholder="I18nVueDirective('v-input.placeholder')"
          data-rule="/[^\d]/"
        />
      </ACard>
      <ACard :title="I18nVueDirective('v-ripple.title')" :bordered="false">
        <AButton v-ripple type="primary" block>{{ I18nVueDirective('v-ripple.button') }}</AButton>
      </ACard>
      <ACard :title="I18nVueDirective('v-lazyLoad.title')" :bordered="false">
        <AButton type="primary" block @click="routerPushByKey('features_lazyload')">
          {{ I18nVueDirective('v-lazyLoad.button') }}
        </AButton>
      </ACard>
    </div>
  </ASpace>
</template>
