<script lang="ts" setup>
import type { NodeProps } from '@vue-flow/core';
import { Handle, Position } from '@vue-flow/core';

interface RBGOutputNodeProps extends NodeProps {
  rgb: string;
}

const props = defineProps<RBGOutputNodeProps>();
</script>

<template>
  <div :style="{ backgroundColor: props.rgb }" class="rounded p-4 text-white">
    <div class="text-md uppercase">{{ props.rgb }}</div>
    <Handle type="target" :position="Position.Left" />
  </div>
</template>
