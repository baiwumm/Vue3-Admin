import type { Directive, App } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();
const copyDirective: Directive = {
    beforeMount(el, binding) {
        el.targetContent = binding.value;
        el.addEventListener('click', () => {
            if (!el.targetContent) return createMessage.warn('没有需要复制的目标内容');
            // 创建textarea标签
            const textarea = document.createElement('textarea');
            // 设置相关属性
            textarea.readOnly = true;
            textarea.style.position = 'fixed';
            textarea.style.top = '-99999px';
            // 把目标内容赋值给它的value属性
            textarea.value = el.targetContent;
            // 插入到页面
            document.body.appendChild(textarea);
            // 调用onselect()方法
            textarea.select();
            // 把目标内容复制进剪贴板, 该API会返回一个Boolean
            const res = document.execCommand('Copy');
            res && createMessage.success('复制成功，剪贴板内容：' + el.targetContent)
            // 移除textarea标签
            document.body.removeChild(textarea);
        })
    },
    updated(el, binding) {
        // 实时更新最新的目标内容
        el.targetContent = binding.value;
    },
    unmounted(el) {
        el.removeEventListener('click', () => { })
    }
}

export function setupCopyDirective(app: App) {
    app.directive('copy', copyDirective);
}
export default copyDirective;