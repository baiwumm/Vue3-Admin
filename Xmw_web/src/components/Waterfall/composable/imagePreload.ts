import { Ref, ref, nextTick } from 'vue'
import { _image } from '../utils/errorImgBase64'

export type ListItem = Record<string, any>
type ImagePreload = {
    actualList: Ref<ListItem[]>;
    setLastPreloadImgIdx: (idx: number) => void;
    setActualList: (newList: ListItem[]) => void;
    imagePreloadHandle: (
        noPreloadList: ListItem[],
        actualColWidth: Ref<number>,
        preloadedFn: () => unknown | undefined,
        srcKey: string,
        errorImgSrc: string
    ) => void;
}

export default function imagePreload(): ImagePreload {
    const actualList = ref<ListItem[]>([])  // 实际用来渲染的列表
    const setActualList = (newList: ListItem[]): void => {
        actualList.value = newList
    }


    let lastPreloadImgIdx = -1  // 上一次最后预加载的图片的下标

    const setLastPreloadImgIdx = (idx: number): void => {
        lastPreloadImgIdx = idx
    }


    /**
     * @description: 图片预加载
     * @param {ListItem[]} noPreloadList 未进行预加载的列表
     * @param {Ref<number>} actualColWidth 实际列宽
     * @param {Function | undefined} preloadedFn 预加载完成后的回调
     * @param {string} srcKey 存放图片链接的键名
     * @param {ComputedRef<number>} errorImgHeight 错误图片展示高度
     * @param {string} errorImgSrc 图片加载失败时默认图片地址
     * @return {void}
     */
    function imagePreloadHandle(
        noPreloadList: ListItem[],
        actualColWidth: Ref<number>,
        preloadedFn: () => unknown | undefined,
        srcKey: string,
        errorImgSrc: string
    ): void {
        const errorItems: ListItem[] = []  // 存放图片加载失败的项，等待最后加载错误图片

        let tmpIdx = lastPreloadImgIdx + 1
        const tmpArr: ListItem[] = []
        while (tmpIdx < noPreloadList.length) {
            const item = noPreloadList[tmpIdx]
            tmpArr.push(item)
            tmpIdx++
            if (!item[srcKey]) {
                lastPreloadImgIdx++
                item._height = 0
                continue
            }

            const oImg = new Image()
            oImg.src = item[srcKey]
            oImg.onload = oImg.onerror = (e): void => {
                if ((e as Event).type === 'error') {
                    errorItems.push(item)
                } else if ((e as Event).type === 'load') {
                    item._height = Math.round(actualColWidth.value / (oImg.width / oImg.height))
                }
                lastPreloadImgIdx++
                if (lastPreloadImgIdx + 1 === noPreloadList.length) {
                    const render = () => {
                        // 预加载完成，开始渲染
                        actualList.value = actualList.value.concat(tmpArr)
                        nextTick(() => {
                            // 图片预加载完成后的回调
                            preloadedFn && preloadedFn()
                        })
                    }

                    loadErrorImgOrRender(actualColWidth, srcKey, errorImgSrc, errorItems, render)
                }
            }
        }
    }

    function loadErrorImgOrRender(
        colWidth: Ref<number>,
        srcKey: string,
        errorImgSrc: string,
        errorItems: ListItem[],
        render?: () => void
    ): void {
        if (errorItems.length === 0) {
            // 没有加载失败的图片
            render && render()
            return
        }

        const setErrorImg = (src: string, height: number): void => {
            errorItems.forEach(item => {
                item[srcKey] = src
                item._height = height
            })
        }
        // 用户没有添加错误图片
        if (!errorImgSrc) {
            setErrorImg(_image, colWidth.value)
            render && render()
            return
        }
        // 尝试加载用户提供的错误图片，如果有的话
        const errImg = new Image()
        errImg.src = errorImgSrc
        errImg.onload = errImg.onerror = (e): void => {
            if ((e as Event).type === 'error') {
                // 用户的图片加载失败，使用内置错误图片
                setErrorImg(_image, colWidth.value)
                render && render()
            } else if ((e as Event).type === 'load') {
                const height = Math.round(colWidth.value / (errImg.width / errImg.height))
                setErrorImg(errorImgSrc, height)
                render && render()
            }
        }
    }


    return {
        actualList,
        setActualList,
        setLastPreloadImgIdx,
        imagePreloadHandle
    }
}