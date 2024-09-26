<script lang="ts" setup>
import type { EdgeProps } from '@vue-flow/core';
import { getBezierPath } from '@vue-flow/core';
import { computed } from 'vue';

import type { Colors } from '../type';
defineOptions({
  inheritAttrs: false,
});

interface EdgeData {
  text?: string;
  color?: Colors;
}

interface CustomEdgeProps extends EdgeProps<EdgeData> {
  id: string;
  markerEnd: string;
  data: {
    text?: string;
    color?: Colors;
  };
}

const props = defineProps<CustomEdgeProps>();

const edgePath = computed(() => getBezierPath(props));
</script>

<template>
  <path
    :id="id"
    class="vue-flow__edge-path"
    :style="{ stroke: data?.color, strokeWidth: '3' }"
    :d="edgePath[0]"
    :marker-end="markerEnd"
  />

  <text>
    <textPath :href="`#${id}`" :style="{ fontSize: '1.25rem', fill: 'black' }" startOffset="50%" text-anchor="middle">
      {{ data?.text }}
    </textPath>
  </text>
</template>
