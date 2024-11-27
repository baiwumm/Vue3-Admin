<script setup lang="ts">
import 'vue-waterfall-plugin-next/dist/style.css';

import { random, times } from 'lodash-es';
import type { ShallowRef } from 'vue';
import { reactive, ref, useTemplateRef } from 'vue';
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';

import errorImg from '@/assets/common/error.png';
import loadingImg from '@/assets/common/loading.png';
import { I18nWaterfall } from '@/constants/i18n';
import { getRandomImg } from '@/utils';

const waterFallRef = useTemplateRef('waterFallRef') as ShallowRef<HTMLElement>;

const loading = ref(true);
const moreLoading = ref(false);

// 手动生成 id
const generateUniqueID = () => {
  const timestamp = Date.now().toString(36); // 将时间戳转换为 36 进制字符串
  const randomness = random(0, 999999).toString(36); // 生成一个六位的随机数并转为 36 进制
  return `${timestamp}-${randomness}`;
};

const getList = (pageSize = 10) => times(pageSize, () => ({ id: generateUniqueID(), url: getRandomImg() }));

const list = ref(getList(50));

// Props 参数
const options = reactive({
  rowKey: 'id', // 数据唯一的字段，比如列表里面的id, 如果要删除卡片，该字段为必填
  width: 310, // 卡片宽度
  // 自定义行显示个数，主要用于对移动端的适配
  breakpoints: {
    1200: {
      // 当屏幕宽度小于等于1200
      rowPerView: 4,
    },
    800: {
      // 当屏幕宽度小于等于800
      rowPerView: 3,
    },
    500: {
      // 当屏幕宽度小于等于500
      rowPerView: 2,
    },
  },
  gutter: 15, // 卡片间隙
  hasAroundGutter: true, // 容器四周是否有 gutter 边距
  posDuration: 600, // 卡片移动到正确位置的动画时间,默认 300
  animationPrefix: 'animate__animated', // 动画前缀
  animationEffect: 'fadeIn', // 卡片入场动画，默认只有 fadeIn，引入 animation.css 后可使用其他动画
  animationDuration: 1000, // 卡片入场动画执行时间（单位毫秒）
  animationDelay: 300, // 卡片入场动画延迟（单位毫秒）
  animationCancel: false, // 是否取消动画
  backgroundColor: '#fff', // 背景颜色
  // 懒加载属性
  loadProps: {
    loading: loadingImg,
    error: errorImg,
    ratioCalculator: (width: number, height: number) => {
      // 我设置了最小宽高比
      const minRatio = random(3, 4, true);
      const maxRatio = random(3, 4, true);
      return minRatio / maxRatio;
    },
  },
  lazyload: true, // 是否开启懒加载
  crossOrigin: true, // 图片加载是否开启跨域
  delay: 300, // 布局刷新的防抖时间，默认 300ms 内没有再次触发才刷新布局
  align: 'center', // 卡片的对齐方式，可选值为：left,center,right
});

// 渲染完成
const afterRender = () => {
  loading.value = false;
};

// 加载更多
const handleLoadMore = () => {
  moreLoading.value = true;
  setTimeout(() => {
    list.value.push(...getList());
    moreLoading.value = false;
  }, 1000);
};
</script>

<template>
  <div class="h-screen flex overflow-hidden">
    <div ref="waterFallRef" class="flex-auto overflow-y-auto">
      <ASpin :spinning="loading">
        <Waterfall :list="list" v-bind="options" @after-render="afterRender">
          <!-- 新版插槽数据获取 -->
          <template #default="{ item }">
            <div class="card-container relative">
              <LazyImg :url="item.url" class="rounded-md" />
            </div>
          </template>
        </Waterfall>
        <ARow v-if="!loading" justify="center" class="mt-4">
          <!-- 加载更多 -->
          <AButton v-if="list.length < 100" type="primary" :loading="moreLoading" @click="handleLoadMore">
            {{ I18nWaterfall('more') }}
          </AButton>
          <p v-else>{{ $I18nWaterfall('noMore') }}</p>
        </ARow>
        <!-- 回到顶部 -->
        <ABackTop :target="() => waterFallRef" />
      </ASpin>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  position: relative;
  .lazy__img[lazy='loading'] {
    opacity: 0;
    transition: opacity 2s;
  }

  .lazy__img[lazy='loaded'] {
    opacity: 1;
  }

  .lazy__img[lazy='error'] {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
