<script setup lang="ts">
import { add, multiply, random, subtract } from 'lodash-es';
import { onMounted } from 'vue';

import { randomColor } from '@/utils';

defineOptions({
  name: 'OperationVerify',
});

const result = defineModel<number>(); // 计算结果

// 定义一个接口来描述 props 的类型
type Props = {
  figure?: number; // 运算验证码的位数,默认是100以内的数字，即两位数。如果是要设置三位数，则设置figure:1000。
  arith?: 0 | 1 | 2 | 3; // 算法选择，支持加、减、乘。设置为1至3分别代表加减乘，0为随机切换。
  width?: number; // 容器宽度
  height?: number; // 容器高度
  disturbLine?: number; // 干扰线数量，0为不绘制
  disturbPoint?: number; // 干扰点数量，0为不绘制
};

const props = withDefaults(defineProps<Props>(), {
  figure: 100,
  arith: 0,
  width: 320,
  height: 60,
  disturbLine: 4,
  disturbPoint: 30,
});

/** @description: 绘制干扰线 */
const drawLine = (ctx: CanvasRenderingContext2D) => {
  // 绘制干扰线
  for (let i = 0; i < props.disturbLine; i += 1) {
    ctx.strokeStyle = randomColor(100, 200);
    ctx.beginPath();
    ctx.moveTo(random(0, props.width), random(0, props.height));
    ctx.lineTo(random(0, props.width), random(0, props.height));
    ctx.stroke();
  }
};

/** @description: 绘制干扰点 */
const drawDot = (ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < props.disturbPoint; i += 1) {
    ctx.fillStyle = randomColor();
    ctx.beginPath();
    ctx.arc(random(0, props.width), random(0, props.height), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
};

// 绘制图形码
const drawCanvas = () => {
  const canvas = document.getElementById('operation-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = randomColor(180, 240);
  ctx.fillRect(0, 0, props.width, props.height);

  // 绘制干扰线
  drawLine(ctx);
  // 绘制干扰点
  drawDot(ctx);

  // 算法验证码
  let num1 = Math.floor(Math.random() * props.figure);
  let num2 = Math.floor(Math.random() * props.figure);

  let codeShow = '';
  // 算法运算符
  const tmparith = props.arith === 0 ? Math.floor(Math.random() * 3) : props.arith;

  switch (tmparith) {
    case 1:
      result.value = add(num1, num2);
      codeShow = `${num1} + ${num2} = ?`;
      break;
    case 2:
      if (num1 < num2) {
        const tmpnum = num1;
        num1 = num2;
        num2 = tmpnum;
      }
      result.value = subtract(num1, num2);
      codeShow = `${num1} - ${num2} = ?`;
      break;
    default:
      result.value = multiply(num1, num2);
      codeShow = `${num1} × ${num2} = ?`;
      break;
  }

  for (let i = 0; i < codeShow.length; i += 1) {
    // 随机生成字体颜色
    ctx.fillStyle = randomColor(50, 160);
    // 随机生成字体大小(0.5 - 0.75)高的范围
    ctx.font = `${random((props.height * 2) / 4, (props.height * 3) / 4)}px SimHei`;
    // 字体对齐位置
    ctx.textBaseline = 'top';
    const x = i * ((props.width - 10) / codeShow.length);
    const y = random(5, props.height / 4);
    ctx.fillText(codeShow[i], x + 5, y);
  }
};

onMounted(() => {
  drawCanvas();
});
</script>

<template>
  <canvas id="operation-canvas" :width="width" :height="height" @click="drawCanvas"></canvas>
</template>
