// 需求：防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次。
// 思路：
// 1、定义一个延迟执行的方法，如果在延迟时间内再调用该方法，则重新计算执行时间。
// 2、将事件绑定在 click 方法上。
import type { Directive, App } from 'vue';
const debounceDirective: Directive = {
    mounted: function (el, binding) {
        const { callback, time } = binding.value
        let timer
        el.addEventListener('click', () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                callback()
            }, time)
        })
    },
}

export function setupDebounceDirective(app: App) {
    app.directive('debounce', debounceDirective);
}
export default debounceDirective;