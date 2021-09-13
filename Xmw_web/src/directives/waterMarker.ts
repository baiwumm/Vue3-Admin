// 思路：
// 1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
// 2、将其设置为背景图片，从而实现页面或组件水印效果
import type { Directive, App } from 'vue';

function addWaterMarker(str, parentNode, font, textColor) {
    // 水印文字，父元素，字体，文字颜色
    var can = document.createElement('canvas')
    parentNode.appendChild(can)
    can.width = 200
    can.height = 150
    can.style.display = 'none'
    var cans = can.getContext('2d')
    cans.rotate((-20 * Math.PI) / 180)
    cans.font = font || '16px Microsoft JhengHei'
    cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 10, can.height / 2)
    parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}

const waterMarkerDirective: Directive = {
    beforeMount: function (el, binding) {
        addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
    },
}

export function setupWaterMarkerDirective(app: App) {
    app.directive('waterMarker', waterMarkerDirective);
}
export default waterMarkerDirective;