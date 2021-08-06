import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';

import { createI18n } from 'vue-i18n';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import { localeSetting } from '/@/settings/localeSetting';
import { useLocaleStoreWithOut } from '/@/store/modules/locale';
import { getInternationalLang } from '/@/api/system/internationalManagement'; // 国际化接口
const { fallback, availableLocales } = localeSetting;

export let i18n: ReturnType<typeof createI18n>;

async function createI18nOptions(): Promise<I18nOptions> {
    const localeStore = useLocaleStoreWithOut();
    const locale = localeStore.getLocale;
    // const defaultLocal = await import(`./lang/${locale}.ts`);
    // const message = defaultLocal.default?.message ?? {};
    const defaultLocal = await getInternationalLang({ lang: locale });
    const message = defaultLocal || {};
    setHtmlPageLang(locale);
    setLoadLocalePool((loadLocalePool) => {
        loadLocalePool.push(locale);
    });

    return {
        legacy: false,
        locale,
        fallbackLocale: fallback,
        messages: {
            [locale]: message,
        },
        availableLocales: availableLocales,
        sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
        silentTranslationWarn: true, // true - warning off
        missingWarn: false,
        silentFallbackWarn: true,
    };
}

// setup i18n instance with glob
export async function setupI18n(app: App) {
    const options = await createI18nOptions();
    i18n = createI18n(options) as I18n;
    app.use(i18n);
}
