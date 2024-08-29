import type { App } from 'vue';
import { createI18n } from 'vue-i18n';

import { localStg } from '@/utils/storage';

export const i18n = createI18n({
  locale: localStg.get('lang') || 'zh-CN',
  fallbackLocale: 'en',
  legacy: false,
});

/**
 * Setup plugin i18n
 *
 * @param app
 */
export async function setupI18n(app: App) {
  app.use(i18n);
}

export const $t = i18n.global.t;

export function setLocale(locale: App.I18n.LangType) {
  i18n.global.locale.value = locale;
}
