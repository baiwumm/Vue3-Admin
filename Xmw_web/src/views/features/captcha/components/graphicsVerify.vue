<template>
    <div class="drag-verify-container">
        <div :style="dragVerifyImgStyle" style="margin: 0 auto">
            <img
                ref="checkImg"
                crossorigin="anonymous"
                :src="imgsrc"
                @load="checkimgLoaded"
                style="width: 100%"
                alt
            />
            <canvas ref="maincanvas" class="main-canvas"></canvas>
            <canvas
                ref="movecanvas"
                :class="{ goFirst: state.isOk, goKeep: state.isKeep }"
                class="move-canvas"
            ></canvas>
            <div class="refresh" v-if="showRefresh" @click="refreshimg">
                <ReloadOutlined />
            </div>
            <div class="tips success" v-if="showTips && isPassing">{{ successTip }}</div>
            <div
                class="tips danger"
                v-if="showTips && !isPassing && state.showErrorTip"
            >{{ failTip }}</div>
        </div>
        <div
            ref="dragVerify"
            class="drag_verify"
            :style="dragVerifyStyle"
            @mousemove="dragMoving"
            @mouseup="dragFinish"
            @mouseleave="dragFinish"
            @touchmove="dragMoving"
            @touchend="dragFinish"
        >
            <div
                class="dv_progress_bar"
                :class="{ goFirst2: state.isOk }"
                ref="progressBar"
                :style="progressBarStyle"
            >{{ successMessage }}</div>
            <div class="dv_text" :style="textStyle" ref="dvMessage">{{ message }}</div>

            <div
                class="dv_handler dv_handler_bg"
                :class="{ goFirst: state.isOk }"
                @mousedown="dragStart"
                @touchstart="dragStart"
                ref="handler"
                :style="handlerStyle"
            >
                <DoubleRightOutlined v-if="!isPassing" />
                <CheckCircleOutlined v-else style="color: #6c6" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, reactive, watch, defineEmits, defineProps } from 'vue'
import { DoubleRightOutlined, CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { randomImg } from '/@/utils'
const props = defineProps({
    isPassing: {
        type: Boolean,
        default: false,
    },
    width: {
        type: Number,
        default: 250,
    },
    height: {
        type: Number,
        default: 40,
    },
    text: {
        type: String,
        default: '请按住滑块拖动',
    },
    successText: {
        type: String,
        default: '验证通过',
    },
    background: {
        type: String,
        default: '#eee',
    },
    progressBarBg: {
        type: String,
        default: '#76c61d',
    },
    completedBg: {
        type: String,
        default: '#76c61d',
    },
    circle: {
        type: Boolean,
        default: false,
    },
    radius: {
        type: String,
        default: '4px',
    },
    handlerBg: {
        type: String,
        default: '#fff',
    },
    textSize: {
        type: String,
        default: '14px',
    },
    textColor: {
        type: String,
        default: '#333',
    },
    imgsrc: {
        type: String,
        default: randomImg
    },
    barWidth: {
        type: Number,
        default: 40,
    },
    barRadius: {
        type: Number,
        default: 8,
    },
    showRefresh: {
        type: Boolean,
        default: true,
    },
    showTips: {
        type: Boolean,
        default: true,
    },
    successTip: {
        type: String,
        default: '验证通过，超过80%用户',
    },
    failTip: {
        type: String,
        default: '验证未通过，拖动滑块将悬浮图像正确合并',
    },
    diffWidth: {
        type: Number,
        default: 20,
    },
})
const emit = defineEmits(['handlerMove', 'passfail', 'passcallback', 'refresh', 'changePassing']) // 声明emit
const dragVerify = ref<HTMLElement | null>(null)
const checkImg = ref<HTMLElement | null>(null)
const maincanvas = ref<HTMLElement | null>(null)
const movecanvas = ref<HTMLElement | null>(null)
const handler = ref<HTMLElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)
const dvMessage = ref<HTMLElement | null>(null)
const state = reactive({
    isMoving: false,
    x: 0,
    isOk: false,
    isKeep: false,
    clipBarx: 0,
    showErrorTip: false
})

// 计算属性
const handlerStyle = computed(() => {
    return {
        left: '0px',
        width: props.height + 'px',
        height: props.height + 'px',
        background: props.handlerBg,
    }
})
const message = computed(() => {
    return props.isPassing ? '' : props.text
})
const successMessage = computed(() => {
    return props.isPassing ? props.successText : ''
})
const dragVerifyStyle = computed(() => {
    return {
        width: props.width + 'px',
        height: props.height + 'px',
        lineHeight: props.height + 'px',
        background: props.background,
        borderRadius: props.circle ? props.height / 2 + 'px' : props.radius,
    }
})
const dragVerifyImgStyle = computed(() => {
    return {
        width: props.width + 'px',
        position: 'relative',
        overflow: 'hidden',
    }
})
const progressBarStyle = computed(() => {
    return {
        background: props.progressBarBg,
        height: props.height + 'px',
        borderRadius: props.circle ? props.height / 2 + 'px 0 0 ' + props.height / 2 + 'px' : props.radius,
    }
})
const textStyle = computed(() => {
    return {
        height: props.height + 'px',
        width: props.width + 'px',
        fontSize: props.textSize,
    }
})

function draw(ctx, x, y, operation) {
    var l = props.barWidth
    var r = props.barRadius
    const PI = Math.PI
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
    ctx.lineTo(x + l, y)
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
    ctx.lineTo(x + l, y + l)
    ctx.lineTo(x, y + l)
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
    ctx.lineTo(x, y)
    ctx.lineWidth = 2
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.stroke()
    ctx[operation]()
    ctx.globalCompositeOperation = 'destination-over'
}
// 生成图片缺失位置
function checkimgLoaded() {
    var barWidth = props.barWidth
    var imgHeight = checkImg.value.height
    var imgWidth = checkImg.value.width
    var halfWidth = Math.floor(props.width / 2)
    var refreshHeigth = 25
    var tipHeight = 20
    var x = halfWidth + Math.ceil(Math.random() * (halfWidth - barWidth - props.barRadius - 5))
    var y = refreshHeigth + Math.floor(Math.random() * (imgHeight - barWidth - refreshHeigth - tipHeight))
    maincanvas.value.setAttribute('width', imgWidth)
    maincanvas.value.setAttribute('height', imgHeight)
    maincanvas.value.style.display = 'block'
    var canvasCtx = maincanvas.value.getContext('2d')
    draw(canvasCtx, x, y, 'fill')
    state.clipBarx = x

    var moveCanvas = movecanvas.value
    moveCanvas.setAttribute('width', imgWidth)
    moveCanvas.setAttribute('height', imgHeight)
    movecanvas.value.style.display = 'block'
    const L = barWidth + props.barRadius * 2 + 3 //实际宽度
    var moveCtx = movecanvas.value.getContext('2d')
    moveCtx.clearRect(0, 0, imgWidth, imgHeight)
    draw(moveCtx, x, y, 'clip')
    moveCtx.drawImage(checkImg.value, 0, 0, imgWidth, imgHeight)
    var y = y - props.barRadius * 2 - 1
    const ImageData = moveCtx.getImageData(x, y, L, L)
    moveCanvas.setAttribute('width', L)
    moveCanvas.setAttribute('height', imgHeight)
    moveCtx.putImageData(ImageData, 0, y)
}

function dragStart(e) {
    if (!props.isPassing) {
        state.isMoving = true
        state.x = (e.pageX || e.touches[0].pageX) - parseInt(handler.value.style.left.replace('px', ''), 10)
    }
    state.showErrorTip = false
    emit('handlerMove')
}

function dragMoving(e) {
    if (state.isMoving && !props.isPassing) {
        var _x = (e.pageX || e.touches[0].pageX) - state.x
        handler.value.style.left = _x + 'px'
        progressBar.value.style.width = _x + props.height / 2 + 'px'
        movecanvas.value.style.left = _x + 'px'
    }
}

function dragFinish(e) {
    if (state.isMoving && !props.isPassing) {
        var _x = (e.pageX || e.changedTouches[0].pageX) - state.x
        if (Math.abs(_x - state.clipBarx) > props.diffWidth) {
            state.isOk = true
            setTimeout(function () {
                handler.value.style.left = '0'
                progressBar.value.style.width = '0'
                movecanvas.value.style.left = '0'
                state.isOk = false
            }, 500)
            emit('passfail')
            state.showErrorTip = true
        } else {
            passVerify()
        }
        state.isMoving = false
    }
}

function passVerify() {
    emit('changePassing', true)
    state.isMoving = false
    progressBar.value.style.background = props.completedBg
    dvMessage.value.style['-webkit-text-fill-color'] = 'unset'
    dvMessage.value.style.animation = 'slidetounlock2 3s infinite'
    progressBar.value.style.color = '#fff'
    progressBar.value.style.fontSize = props.textSize
    state.isKeep = true
    setTimeout(() => {
        movecanvas.value.style.left = state.clipBarx + 'px'
        setTimeout(() => {
            state.isKeep = false
            maincanvas.value.style.display = 'none'
            movecanvas.value.style.display = 'none'
        }, 200)
    }, 100)
    emit('passcallback')
}

function reset() {
    reImg()
    checkimgLoaded()
}

function reImg() {
    emit('changePassing', false)
    const oriData = state
    for (const key in oriData) {
        if (Object.prototype.hasOwnProperty.call(oriData, key)) {
            state[key] = oriData[key]
        }
    }
    handler.value.style.left = '0'
    progressBar.value.style.width = '0'
    dvMessage.value.style['-webkit-text-fill-color'] = 'transparent'
    dvMessage.value.style.animation = 'slidetounlock 3s infinite'
    dvMessage.value.style.color = props.background
    movecanvas.value.style.left = '0px'
}

function refreshimg() {
    emit('refresh')
}

onMounted(() => {
    dragVerify.value.style.setProperty('--textColor', props.textColor)
    dragVerify.value.style.setProperty('--width', Math.floor(props.width / 2) + 'px')
    dragVerify.value.style.setProperty('--pwidth', -Math.floor(props.width / 2) + 'px')
})

watch(() => props.imgsrc, () => {
    reImg()
}, { immediate: false })
</script>
<style lang="less" scoped>
.drag_verify {
    position: relative;
    background-color: #e8e8e8;
    text-align: center;
    overflow: hidden;
    border: 1px solid #e4e7eb;
    margin: 0 auto;
}
.drag_verify .dv_handler {
    position: absolute;
    top: 0px;
    left: 0px;
    cursor: move;
}
.drag_verify .dv_handler i {
    color: #666;
    padding-left: 0;
    font-size: 16px;
}
.drag_verify .dv_handler .el-icon-circle-check {
    color: #6c6;
    margin-top: 9px;
}
.drag_verify .dv_progress_bar {
    position: absolute;
    height: 34px;
    width: 0px;
}
.drag_verify .dv_text {
    position: absolute;
    top: 0px;
    color: transparent;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    background: -webkit-gradient(
        linear,
        left top,
        right top,
        color-stop(0, var(--textColor)),
        color-stop(0.4, var(--textColor)),
        color-stop(0.5, #fff),
        color-stop(0.6, var(--textColor)),
        color-stop(1, var(--textColor))
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-size-adjust: none;
    animation: slidetounlock 3s infinite;
}
.drag_verify .dv_text * {
    -webkit-text-fill-color: var(--textColor);
}
.goFirst {
    left: 0px !important;
    transition: left 0.5s;
}
.goKeep {
    transition: left 0.2s;
}
.goFirst2 {
    width: 0px !important;
    transition: width 0.5s;
}
.drag-verify-container {
    position: relative;
    line-height: 0;
}
.refresh {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    font-size: 20px;
    z-index: 200;
}
.tips {
    position: absolute;
    bottom: 0;
    height: 20px;
    line-height: 20px;
    text-align: center;
    width: 100%;
    font-size: 12px;
    z-index: 200;
}
.tips.success {
    background: rgba(255, 255, 255, 0.6);
    color: green;
}
.tips.danger {
    background: rgba(0, 0, 0, 0.6);
    color: yellow;
}
.main-canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.move-canvas {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
<style>
@-webkit-keyframes slidetounlock {
    0% {
        background-position: var(--pwidth) 0;
    }
    100% {
        background-position: var(--width) 0;
    }
}
@-webkit-keyframes slidetounlock2 {
    0% {
        background-position: var(--pwidth) 0;
    }
    100% {
        background-position: var(--pwidth) 0;
    }
}
</style>