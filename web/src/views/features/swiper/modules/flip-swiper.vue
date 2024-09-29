<script setup lang="ts">
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectFlip, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { getRandomImg } from '@/utils';

const imgs = getRandomImg(8) as string[];
</script>

<template>
  <Swiper
    effect="flip"
    grab-cursor
    loop
    navigation
    :pagination="{ clickable: true }"
    :modules="[EffectFlip, Pagination, Navigation]"
    class="h-80 w-80"
  >
    <SwiperSlide v-for="i in 8" :key="i">
      <img :src="imgs[i - 1]" class="h-full w-full object-cover" />
    </SwiperSlide>
  </Swiper>
</template>
