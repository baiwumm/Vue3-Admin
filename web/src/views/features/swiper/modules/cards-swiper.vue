<script setup lang="ts">
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { getRandomImg } from '@/utils';

const imgs = getRandomImg(8) as string[];
</script>

<template>
  <Swiper effect="cards" grab-cursor loop :modules="[EffectCards]" class="!h-80 !w-60">
    <SwiperSlide v-for="i in 8" :key="i">
      <img :src="imgs[i - 1]" class="h-full w-full object-cover" />
    </SwiperSlide>
  </Swiper>
</template>
