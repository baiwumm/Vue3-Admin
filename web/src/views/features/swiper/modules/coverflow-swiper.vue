<script setup lang="ts">
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { getRandomImg } from '@/utils';

const imgs = getRandomImg(8) as string[];
</script>

<template>
  <Swiper
    effect="coverflow"
    grab-cursor
    centered-slides
    slides-per-view="auto"
    :coverflow-effect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    loop
    :pagination="{
      clickable: true,
    }"
    :modules="[EffectCoverflow, Pagination]"
  >
    <SwiperSlide v-for="i in 8" :key="i" class="!h-80 !w-80">
      <img :src="imgs[i - 1]" class="h-full w-full object-cover" />
    </SwiperSlide>
  </Swiper>
</template>
