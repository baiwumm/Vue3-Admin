<script setup lang="ts">
import { ref } from 'vue';

import { useRouterPush } from '@/hooks/common/router';
import { $t } from '@/locales';

const successText = ref('你太棒啦！');

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
      <ACard title="复制指令 v-copy" :bordered="false">
        <AInputSearch v-model:value="text">
          <template #enterButton>
            <AButton v-copy="text" type="primary">复制</AButton>
          </template>
        </AInputSearch>
      </ACard>
      <ACard title="长按指令 v-longpress" :bordered="false">
        <AButton v-longpress:[1000]="initLongpress" type="primary" block>长按1秒钟触发</AButton>
      </ACard>
      <ACard title="防抖指令 v-debounce" :bordered="false">
        <AButton v-debounce="{ callback: initDebounce, time: 1000 }" type="primary" block>
          最后一次点击1秒钟后触发
        </AButton>
      </ACard>
      <ACard title="节流指令 v-throllte" :bordered="false">
        <AButton v-throllte="{ callback: initThrollte, time: 1000 }" type="primary" block>1秒钟内只触发一次</AButton>
      </ACard>
      <ACard title="禁止表情和特殊字符 v-emoji" :bordered="false">
        <AInput v-emoji placeholder="禁止输入@#%^等字符" />
      </ACard>
      <ACard title="输入框规则指令 v-input" :bordered="false">
        <AInput v-input:decimal_2="inputValue" placeholder="数字+两位小数" data-rule="/[^\d]/" />
      </ACard>
      <ACard title="水波纹指令 v-ripple" :bordered="false">
        <AButton v-ripple type="primary" block>水波纹指令</AButton>
      </ACard>
      <ACard title="懒加载指令 v-lazyLoad" :bordered="false">
        <AButton type="primary" block @click="routerPushByKey('features_lazyload')">懒加载指令</AButton>
      </ACard>
    </div>
  </ASpace>
</template>
