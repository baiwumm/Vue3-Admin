<script setup lang="ts">
import 'swiper/css';

import { ref } from 'vue';

import { I18nSwiper } from '@/constants/i18n';

import CardsSwiper from './modules/cards-swiper.vue'; // 特效牌
import CoverflowSwiper from './modules/coverflow-swiper.vue'; // 3d流翻转
import CreativeSwiper from './modules/creative-swiper.vue'; // 创意效果
import CubeSwiper from './modules/cube-swiper.vue'; // 方块
import FlipSwiper from './modules/flip-swiper.vue'; // 翻转
import ThumbnailSwiper from './modules/thumbnail-swiper.vue'; // 缩略图
import VisualSwiper from './modules/visual-swiper.vue'; // 横向循环焦点图片展示

const creativeEffectOptions = ref([
  {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
  {
    prev: {
      shadow: true,
      translate: ['-120%', 0, -500],
    },
    next: {
      shadow: true,
      translate: ['120%', 0, -500],
    },
  },
  {
    prev: {
      shadow: true,
      translate: ['-20%', 0, -1],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
  {
    prev: {
      shadow: true,
      translate: [0, 0, -800],
      rotate: [180, 0, 0],
    },
    next: {
      shadow: true,
      translate: [0, 0, -800],
      rotate: [-180, 0, 0],
    },
  },
  {
    prev: {
      shadow: true,
      translate: ['-125%', 0, -800],
      rotate: [0, 0, -90],
    },
    next: {
      shadow: true,
      translate: ['125%', 0, -800],
      rotate: [0, 0, 90],
    },
  },
  {
    prev: {
      shadow: true,
      origin: 'left center',
      translate: ['-5%', 0, -200],
      rotate: [0, 100, 0],
    },
    next: {
      origin: 'right center',
      translate: ['5%', 0, -200],
      rotate: [0, -100, 0],
    },
  },
]);
</script>

<template>
  <div>
    <ARow :gutter="[16, 16]">
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <ACard :border="false" :title="I18nSwiper('cube')">
          <CubeSwiper />
        </ACard>
      </ACol>
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <ACard :border="false" :title="I18nSwiper('flip')">
          <FlipSwiper />
        </ACard>
      </ACol>
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <ACard :border="false" :title="I18nSwiper('card')">
          <CardsSwiper />
        </ACard>
      </ACol>
      <ACol :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <ACard :border="false" :title="I18nSwiper('coverFlow')">
          <CoverflowSwiper />
        </ACard>
      </ACol>
      <ACol xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <ACard :border="false" :title="I18nSwiper('thumbnail')">
          <ThumbnailSwiper />
        </ACard>
      </ACol>
      <ACol :span="24">
        <ACard :border="false" :title="I18nSwiper('creative')">
          <ACardGrid v-for="(option, i) in creativeEffectOptions" :key="i" :hoverable="false">
            <CreativeSwiper :creative-effect="option" />
          </ACardGrid>
        </ACard>
      </ACol>
      <ACol :span="24">
        <ACard :border="false" :title="I18nSwiper('visual')">
          <VisualSwiper />
        </ACard>
      </ACol>
    </ARow>
  </div>
</template>
