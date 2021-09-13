import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import type { App, Plugin } from 'vue';
import CryptoJS from 'crypto-js' // AES/DES加密解密
import { unref } from 'vue';
import { isObject } from '/@/utils/is';
import beauty001 from '/@/assets/images/001.jpg'
import beauty002 from '/@/assets/images/002.jpg'
import beauty003 from '/@/assets/images/003.jpg'
import beauty004 from '/@/assets/images/004.jpg'
import beauty005 from '/@/assets/images/005.jpg'
import beauty006 from '/@/assets/images/006.jpg'

export const noop = () => { };

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
    return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = '';
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    parameters = parameters.replace(/&$/, '');
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string;
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}

export function openWindow(
    url: string,
    opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
    const feature: string[] = [];

    noopener && feature.push('noopener=yes');
    noreferrer && feature.push('noreferrer=yes');

    window.open(url, target, feature.join(','));
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
    const ret: Recordable = {};

    Object.keys(props).map((key) => {
        ret[key] = unref((props as Recordable)[key]);
    });

    return ret as Partial<U>;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
    if (!route) return route;
    const { matched, ...opt } = route;
    return {
        ...opt,
        matched: (matched
            ? matched.map((item) => ({
                meta: item.meta,
                name: item.name,
                path: item.path,
            }))
            : undefined) as RouteRecordNormalized[],
    };
}

export const withInstall = <T>(component: T, alias?: string) => {
    const comp = component as any;
    comp.install = (app: App) => {
        app.component(comp.name || comp.displayName, component);
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };
    return component as T & Plugin;
};

export function formatDictValue(options: Array<any>, value: string) {
    if (!value || !options) {
        return '';
    }
    const matchItem = options.find((item) => item['value'] === value);
    return matchItem && matchItem['label'] ? matchItem['label'] : '';
}

export const crypto_key = CryptoJS.enc.Utf8.parse('ABCDEF0123456789') //十六位十六进制数作为密钥
export const crypto_iv = CryptoJS.enc.Utf8.parse('ABCDEF0123456789') //十六位十六进制数作为密钥偏移量

export const timeFix = () => {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '夜深了'
}

export const welcome = () => {
    const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 LOL', '我猜你可能累了', '认真工作吧']
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
}

// 千位格式化数字
export const filterDigital = (value, decimal) => {
    if (!value) {
        return '0'
    }
    const intPartFormat = (+value || 0).toFixed(decimal).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') // 将整数部分逢三一断
    return intPartFormat
}

// 验证码模块
// 生成一个随机数
export const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}
// 生成一个随机的颜色
export const randomColor = (min, max) => {
    let r = randomNum(min, max)
    let g = randomNum(min, max)
    let b = randomNum(min, max)
    return 'rgb(' + r + ',' + g + ',' + b + ')'
}
export const _code_chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
export const _code_color1 = ['#fffff0', '#f0ffff', '#f0fff0', '#fff0f0']
export const _code_color2 = ['#FF0033', '#006699', '#993366', '#FF9900', '#66CC66', '#FF33CC']

export const beautyList = [beauty001, beauty002, beauty003, beauty004, beauty005, beauty006]
export const randomImg = beautyList[randomNum(1, 6)]
