// 需求：根据正则表达式，设计自定义处理表单输入规则的指令，下面以禁止输入表情和特殊字符为例。
import type { App, Directive } from 'vue';

const findElement = (parent: HTMLElement, type: string): HTMLElement | null => {
  if (parent.tagName.toLowerCase() === type) {
    return parent;
  }
  return parent.querySelector(type) as HTMLElement | null;
};

const triggerEvent = (el: HTMLElement, type: string): void => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  el.dispatchEvent(event);
};

const emojiDirective: Directive = {
  beforeMount(el: HTMLElement) {
    // 正则规则可根据需求自定义
    const regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g; // 禁止Unicode表情符号
    const inputElement = findElement(el, 'input')!;
    el.inputElement = inputElement;
    inputElement.handleInput = (): void => {
      const value = inputElement.value;
      inputElement.value = value.replace(regRule, '');

      triggerEvent(inputElement, 'input');
    };
    inputElement.addEventListener('keyup', inputElement.handleInput);
  },
  unmounted(el: HTMLElement) {
    const inputElement = el.inputElement;
    if (inputElement && inputElement.handleInput) {
      inputElement.removeEventListener('keyup', inputElement.handleInput);
    }
  },
};

export function setupEmojiDirective(app: App) {
  app.directive('emoji', emojiDirective);
}

export default emojiDirective;
