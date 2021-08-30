// 需求：一段时间内首次触发时立即执行，此时间段内再次触发不再执行。
// 思路：
// 1、记录上次触发事件,每次触发与指定的时间段比较。
// 2、将事件绑定在 click 方法上。
import type { Directive, App } from 'vue';
const throllteDirective: Directive = {
    mounted: function (el, binding) {
        const { callback, time } = binding.value
        el.addEventListener('click', () => {
            const nowTime = new Date().getTime()
            if (!el.preTime || nowTime - el.preTime > time) {
                el.preTime = nowTime
                callback()
            }
        })
    }
}
export function setupThrollteDirective(app: App) {
    app.directive('throllte', throllteDirective);
}
export default throllteDirective;