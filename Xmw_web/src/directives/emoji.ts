// 需求：根据正则表达式，设计自定义处理表单输入规则的指令，下面以禁止输入表情和特殊字符为例。
import type { Directive, App } from 'vue';
let findEle = (parent, type) => {
    return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}

const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    el.dispatchEvent(e)
}

const emojiDirective: Directive = {
    beforeMount: function (el) {
        // 正则规则可根据需求自定义
        var regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g
        let $inp = findEle(el, 'input')
        el.$inp = $inp
        $inp.handle = function () {
            let val = $inp.value
            $inp.value = val.replace(regRule, '')

            trigger($inp, 'input')
        }
        $inp.addEventListener('keyup', $inp.handle)
    },
    unmounted: function (el) {
        el.$inp.removeEventListener('keyup', el.$inp.handle)
    },
}

export function setupEmojiDirective(app: App) {
    app.directive('emoji', emojiDirective);
}
export default emojiDirective;