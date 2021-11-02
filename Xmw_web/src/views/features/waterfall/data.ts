import { randomNum, beautyList } from '/@/utils'

let waterFallData: any = [
]

for (let i = 0; i < 20; i++) {
    waterFallData.push({
        imgSrc: beautyList[randomNum(1, 6)]
    })
}

export async function getData(): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
        const ret = [...waterFallData, ...waterFallData]
        setTimeout(() => {
            resolve(ret)
        }, 1000)
    })
}