/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import { setupPermissionDirective } from './permission'; // 权限指令
import { setupLoadingDirective } from './loading'; // 加载指令
import { setupCopyDirective } from './copy'; // 复制指令
import { setupDebounceDirective } from './debounce'; // 防抖指令
import { setupLongpressDirective } from './longpress'; // 长按指令
import { setupThrollteDirective } from './throllte'; // 节流指令
import { setupEmojiDirective } from './emoji'; // 限制特殊字符指令
import { setupInputDirective } from './input'; // 输入框规则指令
import { setupDraggableDirective } from './draggable'; // 拖拽指令
import { setupLazyLoadDirective } from './lazyLoad'; // 懒加载指令
import { setupWaterMarkerDirective } from './waterMarker'; // 水印指令

export function setupGlobDirectives(app: App) {
    setupPermissionDirective(app);
    setupLoadingDirective(app);
    setupCopyDirective(app)
    setupDebounceDirective(app)
    setupLongpressDirective(app)
    setupThrollteDirective(app)
    setupEmojiDirective(app)
    setupInputDirective(app)
    setupDraggableDirective(app)
    setupLazyLoadDirective(app)
    setupWaterMarkerDirective(app)
}
