import dayjs from 'dayjs';
import { isInteger, random, sample, sampleSize } from 'lodash-es';

/**
 * @param {string} className
 * @description: 切换 html 类名
 */
export function toggleHtmlClass(className: string) {
  function add() {
    document.documentElement.classList.add(className);
  }

  function remove() {
    document.documentElement.classList.remove(className);
  }

  return {
    add,
    remove,
  };
}

/** @description: 获取当前时间 */
export const timeFix = () => {
  const hour = dayjs().hour();
  let result = '';
  if (hour < 9) {
    result = '早上好';
  } else if (hour <= 11) {
    result = '上午好';
  } else if (hour <= 13) {
    result = '中午好';
  } else if (hour <= 20) {
    result = '下午好';
  } else {
    result = '夜深了';
  }
  return result;
};

/** @description: 随机欢迎语 */
export const welcomeWords = () => {
  const words = [
    '休息一会儿吧',
    '准备吃什么呢?',
    '要不要打一把 LOL',
    '我猜你可能累了',
    '认真工作吧',
    '今天又是充满活力的一天',
  ];
  return sample(words);
};

/** @description: 生成随机颜色 */
export const randomColor = (min = 0, max = 255) => {
  // 生成三个介于 0 到 255 之间的随机数作为 RGB 的值
  const r = random(min, max);
  const g = random(min, max);
  const b = random(min, max);
  return `rgb(${r},${g},${b})`;
};

/** @description: 验证码字符 */
export const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * @param {number} size 随机获取几张图片数组，默认获取随机一张图片
 * @description: 获取 /assets/img 路径下随机图片
 */
export const getRandomImg = (size = 1) => {
  if (!isInteger(size) || size < 1) {
    return window.$message?.warning('参数必须是一个正整数!');
  }
  // 匹配该目录下所有的图片
  const images: string[] = [];
  for (let i = 1; i <= 20; i += 1) {
    const img = new URL(`../assets/img/${i}.jpg`, import.meta.url).href;
    images.push(img);
  }
  // 获取图片集合
  const result = sampleSize(images, size);
  return result.length === 1 ? result[0] : result;
};

/**
 * @param {number} count
 * @description: 生成随机的汉字数组
 */
export const generateRandomHanziArray = (count = 1) => {
  const minCode = 0x4e00; // 汉字 Unicode 范围的最小值
  const maxCode = 0x9fff; // 汉字 Unicode 范围的最大值

  const hanziArray = [];
  for (let i = 0; i < count; i += 1) {
    const randomCode = random(minCode, maxCode);
    hanziArray.push(String.fromCodePoint(randomCode));
  }

  return hanziArray;
};
