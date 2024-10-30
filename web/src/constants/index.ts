import type { RadioGroupProps } from 'ant-design-vue/es/radio';
import type { LabeledValue } from 'ant-design-vue/es/select';
import { endsWith, keys, startsWith, toLower } from 'lodash-es';

import { MENU_TYPE, METHOD, SEX, STATUS } from '@/enum';
import { $t } from '@/locales';

/** @description: 性别 */
export const SexOptions: LabeledValue[] = [
  { label: $t('page.systemManage.userManage.sexMap.male'), value: SEX.MALE },
  { label: $t('page.systemManage.userManage.sexMap.female'), value: SEX.FEMALE },
];

/** @description: 状态 */
export const StatueOptions: LabeledValue[] = [
  { label: $t('form.statusMap.active'), value: STATUS.ACTIVE },
  { label: $t('form.statusMap.inactive'), value: STATUS.INACTIVE },
];

/** @description: 请求方法 */
export const MethodOptions: LabeledValue[] = [
  { label: METHOD.POST, value: METHOD.POST, key: 'green' },
  { label: METHOD.PUT, value: METHOD.PUT, key: 'orange' },
  { label: METHOD.PATCH, value: METHOD.PATCH, key: 'purple' },
  { label: METHOD.DELETE, value: METHOD.DELETE, key: 'red' },
];

/** @description: 菜单类型 */
export const MenuTypeOptions: LabeledValue[] = [
  { label: $t('page.systemManage.menuManage.typeMap.directory'), value: MENU_TYPE.DIRECTORY },
  { label: $t('page.systemManage.menuManage.typeMap.menu'), value: MENU_TYPE.MENU },
  { label: $t('page.systemManage.menuManage.typeMap.button'), value: MENU_TYPE.BUTTON },
];

/** @description: 是否 */
export const YesOrNoOptions: RadioGroupProps['options'] = [
  { label: $t('common.yesOrNo.yes'), value: true },
  { label: $t('common.yesOrNo.no'), value: false },
];

/** @description: 浏览器图标映射 */
export const BroswerIconMap = (text: string): string | undefined => {
  const iconMap: Record<string, string> = {
    Chrome: 'logos:chrome',
    Firefox: 'logos:firefox',
    Safari: 'logos:safari',
    Opera: 'logos:opera',
    Edge: 'logos:microsoft-edge',
    WebKit: 'logos:webkit',
    Android: 'logos:android-icon',
    Quark: 'local:quark',
    Wechat: 'local:wechat',
    UC: 'local:uc',
    Baidu: 'local:baidu',
    Huawei: 'local:huawei',
    Vivo: 'local:vivo',
    QQ: 'local:qq',
    MIUI: 'local:miui',
    Sogou: 'local:sogou',
  };
  for (let i = 0; i < keys(iconMap).length; i += 1) {
    const item = keys(iconMap)[i];
    if (startsWith(toLower(text), toLower(item)) || endsWith(toLower(text), toLower(item))) {
      return iconMap[item];
    }
  }
  return undefined;
};

/** @description: 操作系统图标映射 */
export const OsIconMap = (text: string): string | undefined => {
  const iconMap: Record<string, string> = {
    Windows: 'logos:microsoft-windows-icon',
    'Mac OS': 'logos:apple',
    Linux: 'logos:linux-tux',
    Android: 'logos:android-icon',
    iOS: 'logos:apple',
    Chrome: 'logos:chrome',
    Harmony: 'local:harmonyOS',
  };
  for (let i = 0; i < keys(iconMap).length; i += 1) {
    const item = keys(iconMap)[i];
    if (startsWith(toLower(text), toLower(item)) || endsWith(toLower(text), toLower(item))) {
      return iconMap[item];
    }
  }
  return undefined;
};

/** @description: 国际化语言 */
export const InternalizationLanguage: App.I18n.LangType[] = ['zh-CN', 'en-US', 'ja-JP', 'zh-TW'];
