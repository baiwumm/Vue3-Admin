<script setup lang="ts">
import { random } from 'lodash-es';
import { onMounted, watch } from 'vue';

import { randomColor } from '@/utils';

defineOptions({
  name: 'GeneraVerify',
});

// 定义一个接口来描述 props 的类型
type Props = {
  identifyCode?: string; // 默认注册码
  fontSizeMin?: number; // 字体最小值
  fontSizeMax?: number; // 字体最大值
  backgroundColorMin?: number; // 验证码图片背景色最小值
  backgroundColorMax?: number; // 验证码图片背景色最大值
  contentWidth?: number; // 容器宽度
  contentHeight?: number; // 容器高度
  disturbLine?: number; // 干扰线数量，0为不绘制
  disturbPoint?: number; // 干扰点数量，0为不绘制
};

const props = withDefaults(defineProps<Props>(), {
  identifyCode: '1234',
  fontSizeMin: 25,
  fontSizeMax: 35,
  backgroundColorMin: 200,
  backgroundColorMax: 229,
  contentWidth: 116,
  contentHeight: 38,
  disturbLine: 4,
  disturbPoint: 30,
});

/** @description: 绘制画布 */
const drawCanvas = () => {
  const canvas = document.getElementById('genera-verify') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.textBaseline = 'bottom';
  // 绘制背景
  ctx.fillStyle = randomColor(props.backgroundColorMin, props.backgroundColorMax);
  ctx.fillRect(0, 0, props.contentWidth, props.contentHeight);
  // 绘制文字
  for (let i = 0; i < props.identifyCode.length; i += 1) {
    drawText(ctx, props.identifyCode[i], i);
  }
  drawLine(ctx);
  drawDot(ctx);
};

/** @description: 绘制文字 */
const drawText = (ctx: CanvasRenderingContext2D, txt: string, i: number) => {
  ctx.fillStyle = randomColor(); // 随机生成字体颜色
  ctx.font = `${random(props.fontSizeMin, props.fontSizeMax)}px SimHei`; // 随机生成字体大小
  const x = (i + 1) * (props.contentWidth / (props.identifyCode.length + 1));
  const y = random(props.fontSizeMax, props.contentHeight - 5);
  const deg = random(-30, 30);
  // 修改坐标原点和旋转角度
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.fillText(txt, 0, 0);
  // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 180);
  ctx.translate(-x, -y);
};

/** @description: 绘制干扰线 */
const drawLine = (ctx: CanvasRenderingContext2D) => {
  // 绘制干扰线
  for (let i = 0; i < props.disturbLine; i += 1) {
    ctx.strokeStyle = randomColor(100, 200);
    ctx.beginPath();
    ctx.moveTo(random(0, props.contentWidth), random(0, props.contentHeight));
    ctx.lineTo(random(0, props.contentWidth), random(0, props.contentHeight));
    ctx.stroke();
  }
};

/** @description: 绘制干扰点 */
const drawDot = (ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < props.disturbPoint; i += 1) {
    ctx.fillStyle = randomColor();
    ctx.beginPath();
    ctx.arc(random(0, props.contentWidth), random(0, props.contentHeight), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
};
// 挂载实例
onMounted(() => {
  drawCanvas();
});
// 监听是否刷新
watch(
  () => props.identifyCode,
  () => {
    drawCanvas();
  },
);
</script>

<template>
  <canvas id="genera-verify" :width="contentWidth" :height="contentHeight" />
</template>
