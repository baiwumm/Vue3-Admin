<script setup lang="ts">
import dayjs from 'dayjs';
import { divide, round, subtract } from 'lodash-es';
import type { ShallowRef } from 'vue';
import { computed, onMounted, ref, useTemplateRef } from 'vue';

defineOptions({
  name: 'DragVerify',
});

const isMoving = ref(false); // 是否处于拖动状态
const x = ref(0); // 鼠标当前位置
const isOk = ref(false); // 是否验证成功
const startTime = ref(0); // 开始时间
const endTime = ref(0); // 结束时间

const dragVerify = useTemplateRef('dragVerify') as ShallowRef<HTMLElement>;
const progressBar = useTemplateRef('progressBar') as ShallowRef<HTMLElement>;
const handler = useTemplateRef('handler') as ShallowRef<HTMLElement>;
const message = useTemplateRef('message') as ShallowRef<HTMLElement>;

// 定义一个接口来描述 props 的类型
type Props = {
  isPassing?: boolean; // 是否验证通过
  width?: number; // 宽度
  height?: number; // 高度
  text?: string; // 验证码文本
  successText?: string; // 验证通过文字
  background?: string; // 背景色
  progressBarBg?: string; // 滑块背景色
  completedBg?: string; // 验证成功背景色
  circle?: boolean; // 是否为圆形
  radius?: string; // 圆角
  handlerIcon?: string; // 滑块图标
  successIcon?: string; // 验证通过图标
  handlerBg?: string; // 滑块背景色
  textSize?: string; // 文字大小
  textColor?: string; // 文字颜色
};

const props = withDefaults(defineProps<Props>(), {
  isPassing: false,
  width: 250,
  height: 40,
  text: '请按住滑块拖动',
  successText: '验证通过',
  background: '#eee',
  progressBarBg: '#76c61d',
  completedBg: '#76c61d',
  circle: false,
  radius: '4px',
  handlerIcon: 'ri:arrow-right-double-line',
  successIcon: 'ri:checkbox-circle-line',
  handlerBg: '#fff',
  textSize: '14px',
  textColor: '#333',
});

// 父组件自定义事件
interface Emits {
  (e: 'handlerMove'): void;
  (e: 'passfail'): void;
  (e: 'update:isPassing', flag: boolean): void;
  (e: 'passcallback', seconds: number): void;
}
const emit = defineEmits<Emits>();

// 拖拽开始回调
const dragStart = (e: MouseEvent) => {
  if (!props.isPassing) {
    // 记录开始时间
    startTime.value = dayjs().valueOf();
    isMoving.value = true;
    x.value = e.pageX;
  }
  emit('handlerMove');
};

// 拖拽移动回调
const dragMoving = (e: MouseEvent) => {
  if (isMoving.value && !props.isPassing) {
    const diffX = e.pageX - x.value;
    if (diffX > 0 && diffX <= props.width - props.height) {
      handler.value.style.left = `${diffX}px`;
      progressBar.value.style.width = `${diffX + props.height / 2}px`;
    } else if (diffX > props.width - props.height) {
      handler.value.style.left = `${props.width - props.height}px`;
      progressBar.value.style.width = `${props.width - props.height / 2}px`;
      passVerify();
    }
  }
};
// 拖拽结束回调
const dragFinish = (e: MouseEvent) => {
  if (isMoving.value && !props.isPassing) {
    const diffX = e.pageX - x.value;
    if (diffX < props.width - props.height) {
      isOk.value = true;
      setTimeout(() => {
        handler.value.style.left = '0';
        progressBar.value.style.width = '0';
        isOk.value = false;
      }, 500);
      emit('passfail');
    } else {
      handler.value.style.left = `${props.width - props.height}px`;
      progressBar.value.style.width = `${props.width - props.height / 2}px`;
      passVerify();
    }
    isMoving.value = false;
  }
};

// 验证通过回调
const passVerify = () => {
  endTime.value = dayjs().valueOf();
  emit('update:isPassing', true);
  isMoving.value = false;
  message.value.style['-webkit-text-fill-color'] = 'unset';
  message.value.style.animation = 'slidetounlock2 3s infinite';
  dragVerify.value.style.setProperty('--textColor', '#fff');
  emit('passcallback', round(divide(subtract(endTime.value, startTime.value), 1000), 2));
};

// 重置状态
const reset = () => {
  isMoving.value = false;
  x.value = 0;
  isOk.value = false;
  handler.value.style.left = '0';
  progressBar.value.style.width = '0';
  dragVerify.value.style.setProperty('--textColor', props.textColor);
  message.value.style['-webkit-text-fill-color'] = 'transparent';
  message.value.style.animation = 'slidetounlock 3s infinite';
  message.value.style.color = props.background;
};

// 滑块样式
const handlerStyle = computed(() => {
  return {
    width: `${props.height}px`,
    height: `${props.height}px`,
    background: props.handlerBg,
  };
});

// 提示语
const messageTip = computed(() => (props.isPassing ? props.successText : props.text));

// 拖拽样式
const dragVerifyStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
    lineHeight: `${props.height}px`,
    background: props.background,
    borderRadius: props.circle ? `${props.height / 2}px` : props.radius,
  };
});

// 拖动时的样式
const progressBarStyle = computed(() => {
  return {
    background: props.progressBarBg,
    height: `${props.height}px`,
    borderRadius: props.circle ? `${props.height / 2}px 0 0 ${props.height / 2}px` : props.radius,
    backgroundColor: props.completedBg,
  };
});

// 文字样式
const textStyle = computed(() => {
  return {
    height: `${props.height}px`,
    width: `${props.width}px`,
    fontSize: props.textSize,
  };
});

defineExpose({
  // 暴露给父组件的方法
  reset,
});

onMounted(() => {
  dragVerify.value.style.setProperty('--textColor', props.textColor);
  dragVerify.value.style.setProperty('--width', `${Math.floor(props.width / 2)}px`);
  dragVerify.value.style.setProperty('--pwidth', `${-Math.floor(props.width / 2)}px`);
});
</script>

<template>
  <div
    ref="dragVerify"
    class="drag_verify relative select-none overflow-hidden bg-slate-300 text-center"
    :style="dragVerifyStyle"
    @mousemove="dragMoving"
    @mouseup="dragFinish"
    @mouseleave="dragFinish"
  >
    <div
      ref="progressBar"
      class="dv_progress_bar absolute h-0 w-0"
      :class="{ goFirst2: isOk }"
      :style="progressBarStyle"
    ></div>
    <div ref="message" class="dv_text absolute top-0 select-none" :style="textStyle">
      <div
        class="flex items-center justify-center gap-1"
        :style="{
          color: props.isPassing ? '#fff' : props.textColor,
        }"
      >
        <slot name="textBefore"></slot>
        {{ messageTip }}
        <slot name="textAfter"></slot>
      </div>
    </div>

    <div
      ref="handler"
      class="dv_handler dv_handler_bg absolute left-0 top-0 flex cursor-move items-center justify-center"
      :class="{ goFirst: isOk }"
      :style="handlerStyle"
      @mousedown="dragStart"
    >
      <SvgIcon
        :icon="props.isPassing ? successIcon : handlerIcon"
        class="text-[21px] text-primary"
        :style="{ color: props.isPassing ? props.completedBg : undefined }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drag_verify .dv_text {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, var(--textColor)),
    color-stop(0.4, var(--textColor)),
    color-stop(0.5, #fff),
    color-stop(0.6, var(--textColor)),
    color-stop(1, var(--textColor))
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-size-adjust: none;
  animation: slidetounlock 3s infinite;
}
.goFirst {
  left: 0px !important;
  transition: left 0.5s;
}
.goFirst2 {
  width: 0px !important;
  transition: width 0.5s;
}
</style>

<style>
@keyframes slidetounlock {
  0% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--width) 0;
  }
}
@keyframes slidetounlock2 {
  0% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--pwidth) 0;
  }
}
</style>
