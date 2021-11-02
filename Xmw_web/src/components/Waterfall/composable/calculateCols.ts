import { ref, Ref } from 'vue'


type CalculateActualCols = {
    actualColWidth: Ref<number>;
    actualCols: Ref<number>;
    colsTop: Ref<number[]>;
    calculateActualCols: (isMobile: boolean) => void;
}

/**
 * @description: 计算排布多少列
 * @param {Ref<number>} colWidth 列宽
 * @param {Ref<number>} gap 两列的间距
 * @param {Ref<number>} mobileGap 移动端两列的间距
 * @return {CalculateActualCols}
 */
export default function calculateCols(
    colWidth: Ref<number>,
    gap: Ref<number>,
    mobileGap: Ref<number>
): CalculateActualCols {
    const actualColWidth = ref(0)  // 实际列宽
    const actualCols = ref(1)  // 实际列数
    const colsTop = ref<number[]>([])  // 记录每列的 top 值

    // 计算列数以及手机端的宽度
    const calculateActualCols = (isMobile: boolean): void => {
        actualColWidth.value = colWidth.value
        actualCols.value = 1
        const parentWidth = document.querySelector('.vue3-waterfall-wrapper')?.parentElement?.offsetWidth || 0
        if (isMobile && parentWidth < (colWidth.value * 2) + mobileGap.value) {
            actualColWidth.value = parentWidth - (2 * mobileGap.value)
            colsTop.value = Array(actualCols.value).fill(0)
            return
        }

        const g = isMobile ? mobileGap.value : gap.value
        actualCols.value = Math.floor((parentWidth + g) / (colWidth.value + g))
        colsTop.value = Array(actualCols.value).fill(0)
    }

    return {
        actualColWidth,
        actualCols,
        colsTop,
        calculateActualCols
    }
}