<script setup lang="ts">
import dayjs from 'dayjs';
import { assign, divide, round, subtract } from 'lodash-es';
import { computed, onMounted, reactive, useTemplateRef } from 'vue';

defineOptions({
  name: 'RotateVerify',
});

// 定义一个接口来描述 props 的类型
type Props = {
  imgSrc?: string; // 图片地址
  // isPassing?: boolean; // 是否验证通过
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
  showTips?: boolean; // 是否显示底部提示
  successTip?: string; // 验证通过提示
  failTip?: string; // 验证失败提示
  diffDegree?: number; // 在此范围内松开计算验证成功(单位°)
  minDegree?: number; // 最小旋转角度
  maxDegree?: number; // 最大旋转角度
};

const props = withDefaults(defineProps<Props>(), {
  imgSrc: '',
  // isPassing: false,
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
  showTips: true,
  successTip: '验证通过',
  failTip: '验证失败',
  diffDegree: 10,
  minDegree: 90,
  maxDegree: 200,
});

// 父组件自定义事件
interface Emits {
  (e: 'move'): void;
  (e: 'fail'): void;
  (e: 'success', seconds: number): void;
}
const emit = defineEmits<Emits>();

// 初始化数据
const initState = () => ({
  isPassing: false,
  isMoving: false,
  x: 0,
  isOk: false,
  showBar: false,
  showErrorTip: false,
  ranRotate: 0,
  cRotate: 0,
  imgStyle: {},
  startTime: 0,
  endTime: 0,
});

const state = reactive(initState());

const dragVerify = useTemplateRef('dragVerify') as ShallowRef<HTMLElement>;
const progressBar = useTemplateRef('progressBar') as ShallowRef<HTMLElement>;
const handler = useTemplateRef('handler') as ShallowRef<HTMLElement>;
const message = useTemplateRef('message') as ShallowRef<HTMLElement>;

// 滑块样式
const handlerStyle = computed(() => {
  return {
    width: `${props.height}px`,
    height: `${props.height}px`,
    background: props.handlerBg,
  };
});

// 提示语
const messageTip = computed(() => (state.isPassing ? '' : props.text));

// 成功提示语
const successMessage = computed(() => (state.isPassing ? props.successText : ''));

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

// 拖拽图片样式
const dragVerifyImgStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.width}px`,
    position: 'relative',
    overflow: 'hidden',
    'border-radius': '50%',
  };
});

// 拖动时的样式
const progressBarStyle = computed(() => {
  return {
    background: props.progressBarBg,
    height: `${props.height}px`,
    borderRadius: props.circle ? `${props.height / 2}px 0 0 ${props.height / 2}px` : props.radius,
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

// 避免指定旋转角度时一直拖动到最右侧才验证通过
const factor = computed(() => {
  if (props.minDegree === props.maxDegree) {
    return Math.floor(1 + Math.random() * 6) / 10 + 1;
  }
  return 1;
});

const checkimgLoaded = () => {
  state.ranRotate = Math.floor(props.minDegree + Math.random() * (props.maxDegree - props.minDegree)); // 生成随机角度
  state.imgStyle = {
    transform: `rotateZ(${state.ranRotate}deg)`,
  };
};
const dragStart = e => {
  if (!state.isPassing) {
    // 记录开始时间
    state.startTime = dayjs().valueOf();
    state.isMoving = true;
    state.x = e.pageX || e.touches[0].pageX;
  }
  state.showBar = true;
  state.showErrorTip = false;
  emit('move');
};
const dragMoving = e => {
  if (state.isMoving && !state.isPassing) {
    const diffX = (e.pageX || e.touches[0].pageX) - state.x;
    handler.value.style.left = `${diffX}px`;
    progressBar.value.style.width = `${diffX + props.height / 2}px`;
    const cRotate = Math.ceil((diffX / (props.width - props.height)) * props.maxDegree * factor.value);
    state.cRotate = cRotate;
    const rotate = state.ranRotate - cRotate;
    state.imgStyle = {
      transform: `rotateZ(${rotate}deg)`,
    };
  }
};
const dragFinish = () => {
  if (state.isMoving && !state.isPassing) {
    if (Math.abs(state.ranRotate - state.cRotate) > props.diffDegree) {
      state.isOk = true;
      state.imgStyle = {
        transform: `rotateZ(${state.ranRotate}deg)`,
      };
      setTimeout(() => {
        handler.value.style.left = '0';
        progressBar.value.style.width = '0';
        state.isOk = false;
      }, 500);
      state.showErrorTip = true;
      emit('fail');
    } else {
      passVerify();
    }
    state.isMoving = false;
  }
};
const passVerify = () => {
  state.endTime = dayjs().valueOf();
  state.isPassing = true;
  state.isMoving = false;
  progressBar.value.style.background = props.completedBg;
  message.value.style['-webkit-text-fill-color'] = 'unset';
  message.value.style.animation = 'slidetounlock2 3s infinite';
  progressBar.value.style.color = '#fff';
  progressBar.value.style.fontSize = props.textSize;
  emit('success', round(divide(subtract(state.endTime, state.startTime), 1000), 2));
};
const reset = () => {
  reImg();
  checkimgLoaded();
};
const reImg = () => {
  // 重置状态
  assign(state, initState());

  handler.value.style.left = '0';
  progressBar.value.style.width = '0';
  message.value.style['-webkit-text-fill-color'] = 'transparent';
  message.value.style.animation = 'slidetounlock 3s infinite';
  message.value.style.color = props.background;
};

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
  <div class="drag-verify-container">
    <div :style="dragVerifyImgStyle">
      <img
        ref="checkImg"
        :src="imgSrc"
        class="check-img"
        :class="{ goOrigin: state.isOk }"
        :style="state.imgStyle"
        @load="checkimgLoaded"
      />
      <div v-if="showTips && state.isPassing" class="tips success">{{ successTip }}</div>
      <div v-if="showTips && !state.isPassing && state.showErrorTip" class="tips danger">{{ failTip }}</div>
    </div>
    <div
      ref="dragVerify"
      class="drag_verify"
      :style="dragVerifyStyle"
      @mousemove="dragMoving"
      @mouseup="dragFinish"
      @mouseleave="dragFinish"
      @touchmove="dragMoving"
      @touchend="dragFinish"
    >
      <div ref="progressBar" class="dv_progress_bar" :class="{ goFirst2: state.isOk }" :style="progressBarStyle">
        {{ successMessage }}
      </div>
      <div ref="message" class="dv_text" :style="textStyle">
        {{ messageTip }}
      </div>

      <div
        ref="handler"
        class="dv_handler dv_handler_bg flex items-center justify-center"
        :class="{ goFirst: state.isOk }"
        :style="handlerStyle"
        @mousedown="dragStart"
        @touchstart="dragStart"
      >
        <SvgIcon
          :icon="state.isPassing ? successIcon : handlerIcon"
          class="text-[21px] text-primary"
          :style="{ color: state.isPassing ? completedBg : undefined }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drag_verify {
  position: relative;
  background-color: #e8e8e8;
  text-align: center;
  overflow: hidden;
}
.drag_verify .dv_handler {
  position: absolute;
  top: 0px;
  left: 0px;
  cursor: move;
}
.drag_verify .dv_handler i {
  color: #666;
  padding-left: 0;
  font-size: 16px;
}
.drag_verify .dv_handler .el-icon-circle-check {
  color: #6c6;
  margin-top: 9px;
}
.drag_verify .dv_progress_bar {
  position: absolute;
  height: 34px;
  width: 0px;
}
.drag_verify .dv_text {
  position: absolute;
  top: 0px;
  color: transparent;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
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
.drag_verify .dv_text * {
  -webkit-text-fill-color: var(--textColor);
}
.goFirst {
  left: 0px !important;
  transition: left 0.5s;
}
.goOrigin {
  transition: transform 0.5s;
}
.goKeep {
  transition: left 0.2s;
}
.goFirst2 {
  width: 0px !important;
  transition: width 0.5s;
}
.drag-verify-container {
  position: relative;
  line-height: 0;
  border-radius: 50%;
}
.move-bar {
  position: absolute;
  z-index: 100;
}
.clip-bar {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
}
.refresh {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  font-size: 20px;
  z-index: 200;
}
.tips {
  position: absolute;
  bottom: 25px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  z-index: 200;
}
.tips.success {
  background: rgba(255, 255, 255, 0.6);
  color: green;
}
.tips.danger {
  background: rgba(0, 0, 0, 0.6);
  color: yellow;
}
.check-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
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
