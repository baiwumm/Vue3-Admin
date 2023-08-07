import type { Directive, App } from 'vue';

const lazyLoadDirective: Directive = {
    beforeMount(el, binding) {
        // 设置图片加载失败的默认图片
        el.onerror = () => {
            el.src = 'https://cdn.baiwumm.com/project/vue3-admin/error.png!baiwu'
        }
        el.$data_src = binding.value.src;
    },
    mounted(el, binding) {
        IntersectionObserver ? ioEvent(el, binding) : scrollEvent(el, binding);
    },
    updated(el, binding) {
        el.$data_src = binding.value.src;
    },
    unmounted(el) {
        IntersectionObserver && el.$io.disconnect();
    }
}

function ioEvent(el, binding) {
    const io = new IntersectionObserver(entries => {
        const realSrc = el.$data_src;
        if (entries[0].isIntersecting) {
            realSrc && (el.src = realSrc);
            binding.value.callback(el)
        }
    });
    el.$io = io;
    io.observe(el);
}

/**
* 判断元素是否进入可视区域
*/
const isElementInViewport = el => {
    if (typeof el.getBoundingClientRect !== 'function') {
        return true
    }

    const clientHeight = getClientHeight()
    const rect = el.getBoundingClientRect()
    return rect.top < clientHeight
}

function scrollEvent(el, binding) {
    const handler = throttle(() => {
        loadImg(el, binding)
    }, 250);
    loadImg(el, binding)
    window.addEventListener('scroll', () => {
        handler();
    }, true)
}

function loadImg(el, binding) {
    const realSrc = el.$data_src;
    if (isElementInViewport(el)) {
        realSrc && (el.src = realSrc);
        binding.value.callback(el)
    }
}

function getClientHeight() {
    const dClientHeight = document.documentElement.clientHeight;
    const bodyClientHeight = document.body.clientHeight;
    let clientHeight = 0;
    if (bodyClientHeight && dClientHeight) {
        clientHeight = bodyClientHeight < dClientHeight ? bodyClientHeight : dClientHeight;
    } else {
        clientHeight = bodyClientHeight > dClientHeight ? bodyClientHeight : dClientHeight;
    }
    return clientHeight;
}

const throttle = (callback, delay) => {
    let timer
    return function wrapper() {
        const _this = this
        const args = arguments
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            callback.apply(_this, args)
            clearTimeout(timer)
            timer = null
        }, delay)
    }
}

export function setupLazyLoadDirective(app: App) {
    app.directive('lazyLoad', lazyLoadDirective);
}
export default lazyLoadDirective;
