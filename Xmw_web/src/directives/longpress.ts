// 需求：实现长按，用户需要按下并按住按钮几秒钟，触发相应的事件
// 思路：
// 1、创建一个计时器， 2 秒后执行函数
// 2、当用户按下按钮时触发 mousedown 事件，启动计时器；用户松开按钮时调用 mouseout 事件。
// 3、如果 mouseup 事件 2 秒内被触发，就清除计时器，当作一个普通的点击事件
// 4、如果计时器没有在 2 秒内清除，则判定为一次长按，可以执行关联的函数。
// 5、在移动端要考虑 touchstart，touchend 事件
import type { Directive, App } from 'vue';
const longpressDirective: Directive = {
    beforeMount(el, binding) {
        const cb = binding.value;
        el.$duration = binding.arg || 3000; // 获取长按时长, 默认3秒执行长按事件
        if (typeof cb !== 'function') return console.warn('v-longpress指令必须接收一个回调函数');
        let timer: any = null;
        const add = (e) => {
            // 排除点击与右键情况, event.button: 0-左键  2-右键
            if (e.type === 'click' && e.button !== 0) return;
            e.preventDefault();
            if (timer === null) {
                timer = setTimeout(() => {
                    cb();
                    timer = null;
                }, el.$duration)
            }
        }
        const cancel = () => {
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
            }
        }

        // 添加计时器
        el.addEventListener('mousedown', add);
        el.addEventListener('touchstart', add);
        // 取消计时器
        el.addEventListener('click', cancel);
        el.addEventListener('mouseout', cancel);
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
    },
    updated(el, binding) {
        // 可以实时更新时长
        el.$duration = binding.arg;
    },
    unmounted(el) {
        el.removeEventListener('mousedown', () => { });
        el.removeEventListener('touchstart', () => { });
        el.removeEventListener('click', () => { });
        el.removeEventListener('mouseout', () => { });
        el.removeEventListener('touchend', () => { });
        el.removeEventListener('touchcancel', () => { });
    }
}

export function setupLongpressDirective(app: App) {
    app.directive('longpress', longpressDirective);
}
export default longpressDirective;