<script setup lang="ts">
import '@simonwep/pickr/dist/themes/classic.min.css';
import '@simonwep/pickr/dist/themes/monolith.min.css';
import '@simonwep/pickr/dist/themes/nano.min.css';

import Pickr from '@simonwep/pickr';
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

defineOptions({
  name: 'ColorPicker',
});

const props = defineProps<{
  modelValue?: string;
  theme: Pickr.Theme;
}>();

// 父组件自定义事件
interface Emits {
  (e: 'update:modelValue', value: string): void;
}
const emit = defineEmits<Emits>();

const localColor = ref(props.modelValue);
// 实例
const pickr = ref<Pickr>();

// 颜色选择器
const colorPickerRef = useTemplateRef<HTMLElement>('colorPickerRef');

onMounted(() => {
  if (colorPickerRef.value) {
    pickr.value = Pickr.create({
      el: colorPickerRef.value,
      theme: props.theme, // or 'nano' for another style
      swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)',
      ],
      default: localColor.value, // The default color
      components: {
        preview: true,
        opacity: true,
        hue: true,

        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: true,
          input: true,
          clear: true,
          save: true,
        },
      },
      i18n: {
        'btn:save': '保存',
        'btn:clear': '清空',
      },
    });
    pickr.value.on('save', color => {
      let hexa = '#000';
      if (color) {
        hexa = color.toHEXA().toString();
      }
      localColor.value = hexa;
      emit('update:modelValue', hexa);
    });
  }
});

onUnmounted(() => {
  if (pickr.value) {
    // 销毁实例
    pickr.value.destroy();
  }
});
</script>

<template>
  <input ref="colorPickerRef" type="text" />
</template>
