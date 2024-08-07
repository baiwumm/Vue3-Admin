import { SEX, STATUS, METHOD } from '@/enum';
import { LabeledValue } from 'ant-design-vue/es/select';
import { $t } from "@/locales";
import { startsWith, keys } from 'lodash-es'

/**
 * @description: 性别
 */
export const SexOptions: LabeledValue[] = [
  { label: $t("page.systemManage.userManage.sexMap.male"), value: SEX.MALE },
  { label: $t("page.systemManage.userManage.sexMap.female"), value: SEX.FEMALE },
]

/**
 * @description: 状态
 */
export const StatueOptions: LabeledValue[] = [
  { label: $t("form.statusMap.active"), value: STATUS.ACTIVE },
  { label: $t("form.statusMap.inactive"), value: STATUS.INACTIVE },
]

/**
 * @description: 请求方法
 */
export const MethodOptions: LabeledValue[] = [
  { label: METHOD.POST, value: METHOD.POST },
  { label: METHOD.PATCH, value: METHOD.PATCH },
  { label: METHOD.DELETE, value: METHOD.DELETE },
]

/**
 * @description: 浏览器图标映射
 */
export const broswerIconMap: Record<string, string> = {
  'Chrome': 'logos:chrome',
  'Firefox': 'logos:firefox',
  'Safari': 'logos:safari',
  'Opera': 'logos:opera',
  'Edge': 'logos:microsoft-edge',
}

/**
 * @description: 操作系统图标映射
 */
export const osIconMap = (text: string): string | undefined => {
  const iconMap: Record<string, string> = {
    Windows: 'logos:microsoft-windows-icon',
    macOS: 'logos:apple',
    Linux: 'logos:linux-tux',
    Android: 'logos:android-icon',
    iOS: 'logos:apple',
    Chrome: 'logos:chrome'
  }
  for (let i = 0; i < keys(iconMap).length; i++) {
    const item = keys(iconMap)[i]
    if (startsWith(text, item)) {
      return iconMap[item]
    }
  }
  return undefined
}
