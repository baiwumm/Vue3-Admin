/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-09-19 18:14:02
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-20 15:11:01
 * @Description:
 */
import type { App, Directive } from 'vue';
const copyDirective: Directive = {
  beforeMount(el, binding) {
    el.targetContent = binding.value;
    el.addEventListener('click', async () => {
      if (!el.targetContent) return window.$message?.warning('没有需要复制的目标内容');
      // 把目标内容复制进剪贴板
      await navigator.clipboard.writeText(el.targetContent).then(() => {
        window.$message?.success(`复制成功，剪贴板内容：${el.targetContent}`);
      });
      return el.targetContent;
    });
  },
  updated(el, binding) {
    // 实时更新最新的目标内容
    el.targetContent = binding.value;
  },
  unmounted(el) {
    el.removeEventListener('click', () => { });
  },
};

export function setupCopyDirective(app: App) {
  app.directive('copy', copyDirective);
}
export default copyDirective;
