<script lang="ts" setup>
import dayjs from 'dayjs';
import { divide, round, subtract } from 'lodash-es';
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

defineOptions({
  name: 'SlideVerify',
});

// 定义一个接口来描述 props 的类型
type Props = {
  text?: string; // 滑块文字
  successText?: string; // 验证成功时的文字
  height?: number; // 高度
  dragBgColor?: string; // 拖动时背景颜色
  successBgColor?: string; // 验证通过时的背景颜色
  radius?: number; // 圆角
};

const props = withDefaults(defineProps<Props>(), {
  text: '向右拖动滑块验证',
  successText: '验证通过',
  height: 40,
  dragBgColor: 'rgba(30, 41, 59, 0.3)',
  successBgColor: '#33d70c',
  radius: 6,
});

// 父组件自定义事件
interface Emits {
  (e: 'success', seconds: number): void;
}
const emit = defineEmits<Emits>();

const dragWidth = ref(0); // 拖动宽度
const startTime = ref(0); // 开始时间
const endTime = ref(0); // 结束时间

const confirmSuccess = ref<boolean>(false); // 是否已经成功
const beginClientX = ref<number>(0); // 距离屏幕左端距离
const mouseMoveState = ref<boolean>(false); // 是否触发拖动状态
const maxWidth = ref<number>(0); // 拖动最大宽度
const dragDiv = useTemplateRef<HTMLElement>('dragDiv');

// 鼠标按下事件
const mouseDownFn = (e: MouseEvent) => {
  if (!confirmSuccess.value) {
    e.preventDefault && e.preventDefault(); // 阻止文字选中等 浏览器默认事件
    startTime.value = dayjs().valueOf();
    mouseMoveState.value = true;
    beginClientX.value = e.clientX;
  }
};

// 鼠标移动事件
const mouseMoveFn = (e: MouseEvent) => {
  if (mouseMoveState.value) {
    const width = e.clientX - beginClientX.value;
    if (width > 0 && width <= maxWidth.value) {
      dragWidth.value = width;
    } else if (width > maxWidth.value) {
      endTime.value = dayjs().valueOf();
      successFunction();
    } else if (width < 0) {
      dragWidth.value = 0; // 如果拖动回退，重置为初始位置
    }
  }
};

// 成功回调
const successFunction = () => {
  confirmSuccess.value = true;
  useRemoveListeners();
  dragWidth.value = maxWidth.value;
  emit('success', round(divide(subtract(endTime.value, startTime.value), 1000), 2));
};

// 鼠标抬起事件
const mouseUpFn = (e: MouseEvent) => {
  mouseMoveState.value = false;
  const width = e.clientX - beginClientX.value;
  if (width < maxWidth.value) {
    dragWidth.value = 0;
  }
};

// 添加监听器
const useAddListeners = () => {
  if (dragDiv.value) {
    window.addEventListener('mousemove', mouseMoveFn);
    window.addEventListener('mouseup', mouseUpFn);
  }
};

// 移除监听器
const useRemoveListeners = () => {
  if (dragDiv.value) {
    window.removeEventListener('mousemove', mouseMoveFn);
    window.removeEventListener('mouseup', mouseUpFn);
  }
};

// 在组件挂载时添加监听器
onMounted(() => {
  if (dragDiv.value) {
    maxWidth.value = dragDiv.value?.clientWidth - props.height;
    useAddListeners();
  }
});

// 在组件卸载时移除监听器
onUnmounted(useRemoveListeners);
</script>

<template>
  <div
    ref="dragDiv"
    class="relative w-full overflow-hidden text-center text-white"
    :style="{
      height: `${props.height}px`,
      lineHeight: `${props.height}px`,
      backgroundColor: props.dragBgColor,
      borderRadius: `${props.radius}px`,
    }"
  >
    <div :style="{ height: `${props.height}px`, width: `${dragWidth}px`, backgroundColor: props.successBgColor }" />
    <div class="absolute top-0 w-full select-none text-center">
      {{ confirmSuccess ? props.successText : props.text }}
    </div>
    <div
      class="absolute top-0 flex cursor-pointer items-center justify-center bg-white"
      :style="{ height: `${props.height}px`, width: `${props.height}px`, left: `${dragWidth}px` }"
      @mousedown="mouseDownFn($event)"
    >
      <SvgIcon v-if="!confirmSuccess" icon="lucide:chevrons-right" class="text-[21px] text-primary"></SvgIcon>
      <SvgIcon v-else icon="ep:success-filled" class="text-[21px] text-primary"></SvgIcon>
    </div>
  </div>
</template>
