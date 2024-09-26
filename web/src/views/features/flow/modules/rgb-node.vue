<script lang="ts" setup>
import type { NodeProps } from '@vue-flow/core';
import { Handle, Position } from '@vue-flow/core';
import type { SliderValue } from 'ant-design-vue/es/slider';
import { toRef } from 'vue';

import type { Colors } from '../type';

interface RGBNodeProps extends Pick<NodeProps<{ color: Colors }>, 'data'> {
  data: {
    color: Colors;
  };
  amount: Record<Colors, number>;
}

const props = defineProps<RGBNodeProps>();

const emit = defineEmits<{ (event: 'change', data: { color: Colors; val: number }): void }>();

const currentColor = toRef(props.data, 'color', 'red');

const onChange = (value: SliderValue) => {
  return emit('change', { color: currentColor.value, val: Array.isArray(value) ? value[0] : value });
};
</script>

<template>
  <ACard :border="false" :body-style="{ width: '200px' }">
    <ARow justify="center">
      <ATag :color="currentColor">{{ `${currentColor}`.toUpperCase() }}</ATag>
    </ARow>
    <ASlider
      v-model:value="amount[currentColor]"
      :max="255"
      :style="{ color: currentColor }"
      class="nodrag"
      @change="onChange"
    />
    <Handle type="source" :position="Position.Right" :style="{ backgroundColor: currentColor }" />
  </ACard>
</template>

<style lang="scss">
.rgb-slider {
  --color: red;
  margin-top: 12px;
  background: gainsboro;
  width: 100%;
  height: 10px;
  outline: none;
  border-radius: 999px;
  -webkit-appearance: none;
  appearance: none;

  &::-moz-range-thumb,
  &::-webkit-slider-thumb {
    @apply w-[15px] h-[15px] cursor-pointer border-1 border-solid border-white rounded-full;
    -webkit-appearance: none;
    background: var(--color);
  }
}
</style>
