<script setup lang="ts">
import ColorThief from 'colorthief';
import { map } from 'lodash-es';
import { ref, useTemplateRef } from 'vue';

import { I18nColorthief } from '@/constants/i18n';
import { $t } from '@/locales';
import { getRandomImg } from '@/utils';

// 图片数组
const imgs = getRandomImg(8);

const hoverIndex = ref(-1);

const colorThief = new ColorThief();

const colorThiefRef = useTemplateRef<HTMLElement>('colorThiefRef');

// 鼠标悬停回调
const onMouseOver = (event: MouseEvent, i: number) => {
  hoverIndex.value = i;
  const img = event.target as HTMLImageElement;
  let colors = colorThief.getPalette(img, 3);
  colors = map(colors, c => `rgb(${c[0]}, ${c[1]}, ${c[2]})`);
  if (colorThiefRef.value) {
    colorThiefRef.value.style.setProperty('--c1', colors[0]);
    colorThiefRef.value.style.setProperty('--c2', colors[1]);
    colorThiefRef.value.style.setProperty('--c3', colors[2]);
  }
};

// 鼠标移出回调
const onMouseOut = () => {
  hoverIndex.value = -1;
  if (colorThiefRef.value) {
    colorThiefRef.value.style.setProperty('--c1', '#fff');
    colorThiefRef.value.style.setProperty('--c2', '#fff');
    colorThiefRef.value.style.setProperty('--c3', '#fff');
  }
};
</script>

<template>
  <ASpace direction="vertical" size="middle">
    <ACard :bordered="false" :body-style="{ padding: 0 }">
      <APageHeader :title="$t('route.features_colorthief')">
        {{ I18nColorthief('subTitle') }}
      </APageHeader>
    </ACard>
    <div
      ref="colorThiefRef"
      class="colorthief-container grid rounded-md bg-white p-4"
      :style="{ gridTemplateColumns: 'repeat(4, 1fr)' }"
    >
      <div v-for="i in 8" :key="i" :span="8" class="imgbox">
        <img
          :src="imgs[i - 1]"
          class="color-img h-full w-full rounded-md object-cover"
          :style="{
            opacity: hoverIndex === -1 ? 1 : hoverIndex === i ? 1 : 0.3,
            filter: `blur(${hoverIndex === -1 ? '0px' : hoverIndex === i ? '0px' : '1px'})`,
          }"
          @mouseover="onMouseOver($event, i)"
          @mouseout="onMouseOut()"
        />
      </div>
    </div>
  </ASpace>
</template>

<style scoped lang="scss">
@property --c1 {
  syntax: '<color>';
  initial-value: transparent;
  inherits: false;
}
@property --c2 {
  syntax: '<color>';
  initial-value: transparent;
  inherits: false;
}
@property --c3 {
  syntax: '<color>';
  initial-value: transparent;
  inherits: false;
}
.colorthief-container {
  background: linear-gradient(to bottom, var(--c1) 33%, var(--c2) 66%, var(--c3) 100%);
  animation: spread 0.35s ease-in forwards;
  transition-property: --c1, --c2, --c3;
  transition-duration: 0.35s;
  transition-timing-function: ease-in;
  height: calc(100vh - 322px);
  .imgbox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    border-radius: 5px;
    border: 4px solid transparent;
  }
  .imgbox:hover {
    filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.5));
    border-color: #fff;
    transform: scale(1.05);
  }
}
</style>
