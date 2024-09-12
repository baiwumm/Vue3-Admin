<script setup lang="ts">
import { assign, difference, every, join, map, random, sample, shuffle, some } from 'lodash-es';
import { defineEmits, defineProps, nextTick, onMounted, reactive, useTemplateRef } from 'vue';

import { randomColor } from '@/utils';

defineOptions({
  name: 'PointsVerify',
});

// 坐标点
type Point = {
  x: number;
  y: number;
};

type State = {
  canvasPoints: (Point & { char: string })[];
  checkPoints: Point[];
  text: string;
  result: boolean;
  showTip: boolean;
  loading: boolean;
};

// 定义一个接口来描述 props 的类型
type Props = {
  width?: number; // 宽度
  height?: number; // 高度
  defaultNum?: number; // 默认的文字数量
  checkNum?: number; // 校对的文字数量
  imgs?: string[]; // 图片数组，如果不传，则随机背景色
  disturbLine?: number; // 干扰线数量，0为不绘制
  disturbPoint?: number; // 干扰点数量，0为不绘制
  fontSizeMin?: number; // 字体最小值
  fontSizeMax?: number; // 字体最大值
  range?: number; // 校验的容错范围，数值越大，越容易校验通过
  successText?: string; // 校验通过显示的文字
  errorText?: string; // 校验失败显示的文字
};

const props = withDefaults(defineProps<Props>(), {
  width: 200,
  height: 300,
  defaultNum: 4,
  checkNum: 3,
  imgs: () => [],
  disturbLine: 0,
  disturbPoint: 0,
  fontSizeMin: 25,
  fontSizeMax: 35,
  range: 40,
  successText: '验证通过',
  errorText: '验证失败',
});

// 父组件自定义事件
interface Emits {
  (e: 'callback', flag: boolean): void;
}
const emit = defineEmits<Emits>();

// 画布元素
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');

// 初始化数据
const initState = () => ({
  canvasPoints: [], // 画布生成的坐标信息
  checkPoints: [], // 用户点击的坐标
  text: '刷新中...', // 按钮显示的文字
  result: false, // 校验结果
  showTip: false, // 是否显示结果提示
  loading: false, // 是否加载中
});

const state = reactive<State>(initState());

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
const drawPoint = (ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < props.disturbPoint; i += 1) {
    ctx.fillStyle = randomColor();
    ctx.beginPath();
    ctx.arc(random(0, props.width), random(0, props.height), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
};

// 画布点选回调
const canvasClick = (e: MouseEvent) => {
  // 判断用户点击的坐标是否大于校对的数量
  if (state.checkPoints.length < props.checkNum) {
    // 记录用户点击的坐标
    state.checkPoints.push(getMousePos(e));
  }
  // 如果校对数量相同，则校验结果
  if (state.checkPoints.length === props.checkNum) {
    setTimeout(() => {
      // 校验结果
      const result = comparePoints(state.canvasPoints, state.checkPoints);
      if (!result) {
        // 验证失败
        assign(state, {
          text: props.errorText,
          result: false,
          showTip: true,
        });
        emit('callback', result);
        setTimeout(() => {
          refresh();
        }, 400);
      } else {
        // 验证成功
        assign(state, {
          text: props.successText,
          result: true,
          showTip: true,
        });
        emit('callback', result);
      }
    }, 400);
  }
};

// 绘制合成的图片
const drawImg = (img?: HTMLImageElement) => {
  // 准备canvas环境
  const ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D;

  if (img) {
    // 绘制图片
    ctx.drawImage(img, 0, 0, props.width, props.height);
  } else {
    // 绘制背景
    ctx.fillStyle = randomColor();
    ctx.fillRect(0, 0, props.width, props.height);
  }

  // 是否绘制干扰线
  if (props.disturbLine) {
    drawLine(ctx);
  }

  // 是否绘制干扰点
  if (props.disturbPoint) {
    drawPoint(ctx);
  }

  const fontStr =
    '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐吊民伐罪周发殷汤坐朝问道垂拱平章爱育黎首臣伏戎羌遐迩体率宾归王'; // 不重复的汉字

  // 需要绘制的文字
  const fontChars: string[] = [];

  // 开始绘制文字
  for (let i = 1; i <= props.defaultNum; i += 1) {
    // 加入不重复的文字
    fontChars[i - 1] = sample(difference(fontStr.split(''), fontChars)) as string;

    ctx.font = `${random(props.fontSizeMin, props.fontSizeMax)}px SimHei`; // 随机生成字体大小
    ctx.fillStyle = randomColor();

    // 计算 x 坐标
    const margin = 20; // 容器边缘留白
    const textWidth = ctx.measureText(fontChars[i - 1]).width;
    const x = Math.floor(props.width / props.defaultNum) * i - textWidth - margin;
    const y = random(margin + textWidth, props.height - margin);

    ctx.fillText(fontChars[i - 1], x, y);
    state.canvasPoints[i - 1] = { char: fontChars[i - 1], x, y };
  }

  for (let i = 0; i < props.defaultNum - props.checkNum; i += 1) {
    state.canvasPoints = shuffleAndPopArray(state.canvasPoints);
  }

  // 设置提示语
  state.text = `请顺序点击【${join(map(state.canvasPoints, 'char'), ',')}】`;

  return state.canvasPoints;
};

// 打乱数组，并删除最后一个元素
const shuffleAndPopArray = (arr: State['canvasPoints']) => {
  // 使用 _.shuffle 方法打乱数组
  const shuffledArray = shuffle(arr);
  // 删除最后一个元素
  shuffledArray.pop();
  return shuffledArray;
};
// 获取坐标
const getMousePos = (e: MouseEvent): Point => {
  const x = e.offsetX - 5;
  const y = e.offsetY - 5;
  return { x, y };
};

// 判断点选结果
const comparePoints = (canvasPoints: State['canvasPoints'], checkPoints: Point[]) => {
  function isWithinRange(point: Point, points: Point[], range = props.range) {
    return some(points, point2 => {
      const dx = Math.abs(point.x - point2.x);
      const dy = Math.abs(point.y - point2.y);
      return dx <= range && dy <= range;
    });
  }
  return every(canvasPoints, point => isWithinRange(point, checkPoints));
};

// 刷新状态
function refresh() {
  // 重置状态
  assign(state, initState());

  // 判断是否有传图片
  if (props.imgs.length) {
    const img = new Image();
    // 获取随机一张图片
    img.src = sample(props.imgs) as string;
    // 加载完成开始绘制
    state.loading = true;
    img.onload = async () => {
      await nextTick(() => {
        state.canvasPoints = drawImg(img);
        state.loading = false;
      });
    };
  } else {
    state.canvasPoints = drawImg();
  }
}

onMounted(() => {
  refresh();
});
</script>

<template>
  <div class="points-verify relative mx-auto my-0" :style="{ width: `${width}px` }">
    <ASpin :spinning="state.loading">
      <div
        class="verify-img-panel relative rounded"
        :style="{
          width: width,
          height: height,
          backgroundSize: width + ' ' + height,
        }"
      >
        <canvas
          ref="canvas"
          :width="width"
          :height="height"
          @click="state.result ? undefined : canvasClick($event)"
        ></canvas>

        <div
          v-for="(point, index) in state.checkPoints"
          :key="index"
          class="point-area absolute z-50"
          :style="{
            top: `${point.y}px`,
            left: `${point.x}px`,
          }"
        >
          <AButton type="primary" shape="circle">{{ index + 1 }}</AButton>
        </div>
      </div>
    </ASpin>
    <!-- 画布下方提示 -->
    <AAlert :message="state.text" :type="state.showTip ? (state.result ? 'success' : 'error') : 'info'">
      <template #action>
        <div class="white z-10 cursor-pointer text-20px text-slate-500" @click="refresh">
          <SvgIcon icon="ri:reset-left-fill" />
        </div>
      </template>
    </AAlert>
  </div>
</template>
