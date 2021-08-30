import type { Directive, App } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();
// 派发自定义事件
const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
}

const inputDirective: Directive = {
    mounted(el, binding) {
        const _type = binding.arg;
        const types = ['number', 'decimal', 'decimal_2', 'customize'];
        if (!_type || !types.includes(_type)) return createMessage.warn(`使用v-input指令需要选择特定功能：v-input:type="inputValue";  type = ${types.join('/')}.`);
        el.$handler = (el) => {
            switch (_type) {
                // 数字
                case 'number':
                    el.value = el.value.replace(/[^\d]/, '');
                    break;
                // 数字+小数
                case 'decimal':
                    el.value = el.value.replace(/[^\d.]/g, '');  // 清除数字和'.'以外的字符  
                    el.value = el.value.replace(/\.{2,}/g, '.'); // 连续两个'.', 只保留第一个'.'
                    el.value = el.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.'); // 隔着字符, 也保证只有一个'.'
                    el.value.indexOf('.') < 0 && el.value != '' && (el.value = parseFloat(el.value)); // 保证不会出现重复的: 00, 01, 02 ...
                    el.value.indexOf('.') > -1 && el.value.length === 1 && (el.value = ''); // 第一位不能以'.'开头
                    break;
                // 数字+两位小数
                case 'decimal_2':
                    el.value = el.value.replace(/[^\d.]/g, '');
                    el.value = el.value.replace(/\.{2,}/g, '.');
                    el.value = el.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
                    el.value = el.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两位小数  
                    el.value.indexOf('.') < 0 && el.value != '' && (el.value = parseFloat(el.value));
                    el.value.indexOf('.') > -1 && el.value.length === 1 && (el.value = '');
                    break;
                // 自定义, 由data-rule提供规则
                case 'customize':
                    const rule = el.dataset.rule && eval(el.dataset.rule); // 字符串正则转正则表达式
                    el.value = el.value.replace(rule, '');
                    break;
            }
            trigger(el, 'input');
        }
        el.$handler(el);
    },
    updated(el) {
        el.$handler && el.$handler(el)
    }
}
export function setupInputDirective(app: App) {
    app.directive('input', inputDirective);
}
export default inputDirective;
