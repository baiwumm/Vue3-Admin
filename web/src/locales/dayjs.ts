import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import 'dayjs/locale/zh-tw';

import { locale } from 'dayjs';

import { localStg } from '@/utils/storage';

/**
 * Set dayjs locale
 *
 * @param lang
 */
export function setDayjsLocale(lang: App.I18n.LangType = 'zh-CN') {
  const localMap = {
    'zh-CN': 'zh-cn',
    'en-US': 'en',
    'ja-JP': 'ja',
    'zh-TW': 'zh-tw',
  } satisfies Record<App.I18n.LangType, string>;

  const l = lang || localStg.get('lang') || 'zh-CN';

  locale(localMap[l]);
}
