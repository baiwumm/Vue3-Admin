/**
 * @description: 获取设备的型号
 * @param {string} userAgent window.userAgent
 * @return {string} mobile/ipad/pc
 */
export function getDevice(userAgent: string): string {
    return /(Android|iPhone|iPod|iOS|SymbianOS|Windows Phone)/ig.test(userAgent) ? 'mobile' : /iPad/ig.test(userAgent) ? 'ipad' : 'pc'
}

/**
 * @description: 判断屏幕最大宽度不超过
 * @param {number} width 要判断的最大宽度
 * @return {boolean} 屏幕宽度是否小于等于 width
 */
export function screenMaxIs(width: number): boolean {
    return window.screen.width <= width
}