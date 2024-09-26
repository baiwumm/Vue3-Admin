<!-- Flowchart.vue -->
<script setup lang="ts">
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';

import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { type Elements, type Node, VueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { ref } from 'vue';

import RGBEdge from './modules/rgb-edge.vue';
import RGBNode from './modules/rgb-node.vue';
import RGBOutputNode from './modules/rgb-output-node.vue';
import type { Colors } from './type';

const elements = ref<Elements>([
  { id: '1', type: 'rgb', data: { color: 'red' }, position: { x: 50, y: 50 } },
  { id: '2', type: 'rgb', data: { color: 'green' }, position: { x: 50, y: 200 } },
  { id: '3', type: 'rgb', data: { color: 'blue' }, position: { x: 50, y: 350 } },
  { id: '4', type: 'rgb-output', data: { label: 'RGB' }, position: { x: 450, y: 225 } },
  { id: 'e1-4', type: 'rgb-edge', data: { color: 'red' }, source: '1', target: '4', animated: true },
  { id: 'e2-4', type: 'rgb-edge', data: { color: 'green' }, source: '2', target: '4', animated: true },
  { id: 'e3-4', type: 'rgb-edge', data: { color: 'blue' }, source: '3', target: '4', animated: true },
]);

const color = ref<Record<Colors, number>>({
  red: 100,
  green: 150,
  blue: 100,
});

function onChange({ color: c, val }: { color: Colors; val: number }) {
  return (color.value[c] = Number(val));
}

// minimap stroke color functions
function nodeStroke(n: Node) {
  if (n.type === 'rgb') {
    return n.data.color;
  }
  return `rgb(${color.value.red}, ${color.value.green}, ${color.value.blue})`;
}

function nodeColor(n: Node) {
  if (n.type === 'rgb') {
    return n.data.color;
  }
  return `rgb(${color.value.red}, ${color.value.green}, ${color.value.blue})`;
}
</script>

<template>
  <VueFlow v-model="elements">
    <template #node-rgb="props">
      <RGBNode v-bind="props" :amount="color" @change="onChange" />
    </template>

    <template #node-rgb-output="props">
      <RGBOutputNode v-bind="props" :rgb="`rgb(${color.red}, ${color.green}, ${color.blue})`" />
    </template>

    <template #edge-rgb-edge="props">
      <RGBEdge v-bind="{ ...props, data: { text: color[props.data?.color], ...props.data } }" />
    </template>
    <!-- 背景 -->
    <Background variant="lines" :gap="50" />

    <!-- 小地图 -->
    <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor" />

    <!-- 控制面板 -->
    <Controls />
  </VueFlow>
</template>
