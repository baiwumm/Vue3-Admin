<template>
    <div
        class="points-verify"
        :style="{ width: setSize.imgWidth + 'px' }"
        @mouseover="mode === 'pop' ? (state.showImage = true) : undefined"
        @mouseout="mode === 'pop' ? (state.showImage = false) : undefined"
    >
        <div
            class="verify-img-out"
            v-show="state.showImage"
            @mouseover="mode === 'pop' ? (state.showImage = true) : undefined"
            @mouseout="mode === 'pop' ? (state.showImage = false) : undefined"
            :style="
                mode === 'pop'
                    ? {
                        display: 'none',
                        position: 'absolute',
                        bottom: '42px',
                        height: parseInt(setSize.imgHeight) + 'px',
                    }
                    : { position: 'relative', height: parseInt(setSize.imgHeight) + 'px' }
            "
        >
            <div
                class="verify-img-panel"
                :style="{
                    width: setSize.imgWidth,
                    height: setSize.imgHeight,
                    backgroundSize: setSize.imgWidth + ' ' + setSize.imgHeight,
                }"
            >
                <div class="verify-refresh" style="z-index: 3" @click="refresh">
                    <ReloadOutlined class="icon-refresh" />
                </div>
                <canvas
                    :width="setSize.imgWidth"
                    :height="setSize.imgHeight"
                    ref="canvas"
                    @click="state.bindingClick ? canvasClick($event) : undefined"
                ></canvas>
                <div
                    v-for="(tempPoint, index) in state.tempPoints"
                    :key="index"
                    class="point-area"
                    :style="{
                        backgroundColor: '#1abd6c',
                        color: '#fff',
                        zIndex: 9999,
                        width: '30px',
                        height: '30px',
                        textAlign: 'center',
                        lineHeight: '30px',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: parseInt(tempPoint.y - 10) + 'px',
                        left: parseInt(tempPoint.x - 10) + 'px',
                    }"
                >{{ index + 1 }}</div>
            </div>
        </div>
        <div
            class="verify-bar-area"
            :style="{
                width: barSize.width,
                height: barSize.height,
                color: state.barAreaColor,
                borderColor: state.barAreaBorderColor,
                lineHeight: barSize.height,
            }"
        >
            <span class="verify-msg">{{ state.text }}</span>
        </div>
    </div>
</template>
<script type="text/babel" lang="ts" setup>
import { ref, reactive, defineEmits, defineProps, nextTick, onMounted } from 'vue'
import { randomColor, randomImg } from '/@/utils'
import { ReloadOutlined } from '@ant-design/icons-vue'

const props = defineProps({
    //弹出式pop，固定fixed
    mode: {
        type: String,
        default: 'fixed',
    },
    //默认的文字数量
    defaultNum: {
        type: Number,
        default: 4,
    },
    //校对的文字数量
    checkNum: {
        type: Number,
        default: 3,
    },
    imgArr: {
        type: Array,
        default() {
            return [randomImg]
        },
    },
    imgSize: {
        type: Object,
        default() {
            return {
                width: '400px',
                height: '200px',
            }
        },
    },
    barSize: {
        type: Object,
        default() {
            return {
                width: '300px',
                height: '40px',
            }
        },
    },
    setSize: {
        type: Object,
        default() {
            return {
                imgHeight: 200,
                imgWidth: 300,
            }
        },
    },
})

const emit = defineEmits(['ready', 'callback'])

const canvas = ref<HTMLElement | null>(null)

const state = reactive(
    {
        fontPos: [], // 选中的坐标信息
        checkPosArr: [], //用户点击的坐标
        num: 1, //点击的记数
        imgRand: 0, // //随机的背景图片
        showImage: true,
        tempPoints: [],
        text: '',
        barAreaColor: '',
        barAreaBorderColor: '',
        bindingClick: true,
    }
)

function canvasClick(e) {
    state.checkPosArr.push(getMousePos(e))
    if (state.num == props.checkNum) {
        state.num = createPoint(getMousePos(e))
        setTimeout(() => {
            var flag = comparePos(state.fontPos, state.checkPosArr)
            if (flag == false) {
                //验证失败
                state.barAreaColor = '#d9534f'
                state.barAreaBorderColor = '#d9534f'
                state.text = '验证失败'
                emit('callback', flag, state.text)
                setTimeout(() => {
                    refresh()
                }, 400)
            } else {
                //验证成功
                state.barAreaColor = '#4cae4c'
                state.barAreaBorderColor = '#5cb85c'
                state.text = '验证成功'
                state.bindingClick = false
                emit('callback', flag, state.text)
            }
        }, 400)
    }

    if (state.num < props.checkNum) {
        state.num = createPoint(getMousePos(e))
    }
}

//绘制合成的图片
function drawImg(img) {
    //准备canvas环境
    var ctx = canvas.value.getContext('2d')

    // 绘制图片
    ctx.drawImage(img, 0, 0, parseInt(props.setSize.imgWidth), parseInt(props.setSize.imgHeight))

    // 绘制水印
    var fontSizeArr = [
        'italic small-caps bold 20px microsoft yahei',
        'small-caps normal 25px arial',
        '34px microsoft yahei',
    ]
    var fontStr =
        '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐吊民伐罪周发殷汤坐朝问道垂拱平章爱育黎首臣伏戎羌遐迩体率宾归王' //不重复的汉字

    var fontChars: any = []

    var avg = Math.floor(parseInt(props.setSize.imgWidth) / (parseInt(props.defaultNum) + 1))
    var tmp_index = 0

    for (var i = 1; i <= props.defaultNum; i++) {
        fontChars[i - 1] = getChars(fontStr, fontChars)

        tmp_index = Math.floor(Math.random() * 3)
        ctx.font = fontSizeArr[tmp_index]
        ctx.fillStyle = randomColor(0, 255)

        if (Math.floor(Math.random() * 2) == 1) {
            var tmp_y = Math.floor(parseInt(props.setSize.imgHeight) / 2) + tmp_index * 20 + 20
        } else {
            var tmp_y = Math.floor(parseInt(props.setSize.imgHeight) / 2) - tmp_index * 20
        }

        ctx.fillText(fontChars[i - 1], avg * i, tmp_y)
        state.fontPos[i - 1] = { char: fontChars[i - 1], x: avg * i, y: tmp_y }
    }

    for (var i = 0; i < props.defaultNum - props.checkNum; i++) {
        shuffle(state.fontPos).pop()
    }

    var msgStr = ''
    for (var i = 0; i < state.fontPos.length; i++) {
        msgStr += state.fontPos[i].char + ','
    }

    state.text = '请顺序点击【' + msgStr.substring(0, msgStr.length - 1) + '】'

    return state.fontPos
}
//获取坐标
function getMousePos(e) {
    var x = e.offsetX - 5
    var y = e.offsetY - 5

    return { x, y }
}

//递归去重
function getChars(fontStr, fontChars) {
    var tmp_rand = parseInt(Math.floor(Math.random() * fontStr.length))
    if (tmp_rand > 0) {
        tmp_rand = tmp_rand - 1
    }

    var tmp_char = fontStr.charAt(tmp_rand)
    if (fontChars.indexOf(tmp_char) == -1) {
        return tmp_char
    } else {
        return getChars(fontStr, fontChars)
    }
}

//洗牌数组
function shuffle(arr) {
    var m = arr.length,
        i
    var tmpF
    while (m) {
        i = (Math.random() * m--) >>> 0
        tmpF = arr[m]
        arr[m] = arr[i]
        arr[i] = tmpF
        //[arr[m], arr[i]] = [arr[i], arr[m]];	//低版本浏览器不支持此写法
    }
    return arr
}

//创建坐标点
function createPoint(pos) {
    state.tempPoints.push(Object.assign({}, pos))
    return ++state.num
}
function comparePos(fontPos, checkPosArr) {
    var flag = true
    for (var i = 0; i < fontPos.length; i++) {
        if (
            !(
                parseInt(checkPosArr[i].x) + 40 > fontPos[i].x &&
                parseInt(checkPosArr[i].x) - 40 < fontPos[i].x &&
                parseInt(checkPosArr[i].y) + 40 > fontPos[i].y &&
                parseInt(checkPosArr[i].y) - 40 < fontPos[i].y
            )
        ) {
            flag = false
            break
        }
    }

    return flag
}

function refresh() {
    state.tempPoints.splice(0, state.tempPoints.length)
    state.barAreaColor = '#000'
    state.barAreaBorderColor = '#ddd'
    state.bindingClick = true

    state.fontPos.splice(0, state.fontPos.length)
    state.checkPosArr.splice(0, state.checkPosArr.length)
    state.num = 1

    state.imgRand = Math.floor(Math.random() * props.imgArr.length) //随机的背景图片
    var img = new Image()
    img.src = props.imgArr[state.imgRand]
    // 加载完成开始绘制
    img.onload = function () {
        nextTick(() => {
            state.fontPos = drawImg(img)
        })
    }
    state.text = '验证失败'
}

onMounted(() => {
    refresh()
})

</script>
<style lang="less" scoped>
.points-verify {
    position: relative;
    margin: 0 auto;
    /*滑动验证码*/
    .verify-bar-area {
        position: relative;
        margin-top: 10px;
        background: #ffffff;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    .verify-img-panel {
        border: 1px solid #ddd;
        border-radius: 3px;
        position: relative;
    }
    .verify-img-panel .verify-refresh {
        width: 25px;
        height: 25px;
        text-align: center;
        padding: 5px;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
    }
    .verify-img-panel .icon-refresh {
        font-size: 20px;
    }
}
</style>
