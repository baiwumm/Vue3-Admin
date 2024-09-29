<script setup lang="ts">
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { EffectCube, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { getRandomImg } from '@/utils';

const imgs = getRandomImg(8) as string[];
</script>

<template>
  <Swiper
    effect="cube"
    grab-cursor
    :cube-effect="{
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    }"
    loop
    :pagination="{
      clickable: true,
    }"
    :modules="[EffectCube, Pagination]"
    class="h-80 w-80"
  >
    <SwiperSlide v-for="i in 8" :key="i">
      <img :src="imgs[i - 1]" class="h-full w-full object-cover" />
    </SwiperSlide>
  </Swiper>
</template>
