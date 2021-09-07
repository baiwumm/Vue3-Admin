import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import type { App, Plugin } from 'vue';
import CryptoJS from 'crypto-js' // AES/DES加密解密
import { unref } from 'vue';
import { isObject } from '/@/utils/is';

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
