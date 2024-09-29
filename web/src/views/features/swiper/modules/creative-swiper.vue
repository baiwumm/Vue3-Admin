<script setup lang="ts">
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

import { EffectCreative, Pagination } from 'swiper/modules';
import type { CreativeEffectOptions } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { getRandomImg } from '@/utils';

const imgs = getRandomImg(8) as string[];

defineProps<{
  creativeEffect: CreativeEffectOptions;
}>();
</script>

<template>
  <Swiper
    effect="creative"
    grab-cursor
    centered-slides
    loop
    :creative-effect="creativeEffect"
    :pagination="{
      clickable: true,
    }"
    :modules="[EffectCreative, Pagination]"
    class="h-60 w-80"
  >
    <SwiperSlide v-for="i in 8" :key="i">
      <img :src="imgs[i - 1]" class="h-full w-full object-cover" />
    </SwiperSlide>
  </Swiper>
</template>
