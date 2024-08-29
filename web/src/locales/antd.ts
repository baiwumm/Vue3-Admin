import type { Locale } from 'ant-design-vue/es/locale';
import enUS from 'ant-design-vue/es/locale/en_US';
import jaJP from 'ant-design-vue/es/locale/ja_JP';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import zhTW from 'ant-design-vue/es/locale/zh_TW';

export const antdLocales: Record<App.I18n.LangType, Locale> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,
  'zh-TW': zhTW,
};
