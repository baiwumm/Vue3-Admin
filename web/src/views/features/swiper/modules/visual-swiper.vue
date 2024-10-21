<script setup lang="ts">
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { getRandomImg } from '@/utils';

const imgs = getRandomImg(8) as string[];

// 事件将在Swiper进度更改时激发，作为参数，它接收的进度始终从0到1
const onProgress = (swiper: SwiperClass) => {
  for (let i = 0; i < swiper.slides.length; i += 1) {
    const slide = swiper.slides[i];
    const slideProgress = slide.progress;
    let modify = 1;
    if (Math.abs(slideProgress) > 1) {
      modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
    }
    const translate = `${slideProgress * modify * 260}px`;
    const scale = 1 - Math.abs(slideProgress) / 5;
    const zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
    slide.style.transform = `translateX(${translate}) scale(${scale})`;
    slide.style.zIndex = `${zIndex}`;
    slide.style.opacity = '1';
    if (Math.abs(slideProgress) > 3) {
      slide.style.opacity = '0';
    }
  }
};

// 事件将在每次swiper启动动画时触发。接收当前转换持续时间（以ms为单位）作为参数
const setTransition = (swiper: SwiperClass, transition: number) => {
  for (let i = 0; i < swiper.slides.length; i += 1) {
    const slide = swiper.slides[i];
    slide.style.transition = `${transition}ms`;
  }
};
</script>

<template>
  <Swiper
    watch-slides-progress
    slides-per-view="auto"
    centered-slides
    loop
    :loop-additional-slides="5"
    autoplay
    navigation
    :modules="[Navigation, Autoplay, Pagination]"
    :pagination="{
      clickable: true,
    }"
    class="!pb-10"
    @progress="onProgress"
    @set-transition="setTransition"
  >
    <SwiperSlide v-for="i in 8" :key="i" :style="{ width: '600px', height: '450px' }">
      <img :src="imgs[i - 1]" class="h-full w-full object-cover" />
    </SwiperSlide>
  </Swiper>
</template>
