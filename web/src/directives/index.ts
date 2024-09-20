import type { App } from 'vue';

import { setupCopyDirective } from './copy'; // 复制指令 v-copy
import { setupDebounceDirective } from './debounce'; // 防抖指令 v-debounce
import { setupEmojiDirective } from './emoji'; // 禁止表情和特殊字符 v-emoji
import { setupInputDirective } from './input'; // 输入框规则指令 v-input
import { setupLazyLoadDirective } from './lazyLoad'; // 懒加载指令 v-lazyload
import { setupLongpressDirective } from './longpress'; // 长按指令 v-longpress
import { setupRippleDirective } from './ripple'; // 水波纹指令 v-ripple
import { setupThrollteDirective } from './throllte'; // 节流指令 v-throllte

export function setupGlobDirectives(app: App) {
  setupCopyDirective(app);
  setupLongpressDirective(app);
  setupDebounceDirective(app);
  setupThrollteDirective(app);
  setupEmojiDirective(app);
  setupInputDirective(app);
  setupRippleDirective(app);
  setupLazyLoadDirective(app);
}
