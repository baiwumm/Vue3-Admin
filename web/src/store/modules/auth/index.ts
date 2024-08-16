import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { forIn } from 'lodash-es'
import { useLoading } from '@sa/hooks';
import { SetupStoreId } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { fetchGetUserInfo, fetchLogin, getLocales } from '@/service/api';
import { localStg } from '@/utils/storage';
import { $t, i18n } from '@/locales';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { clearAuthStorage, getToken } from './shared';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const route = useRoute();
  const routeStore = useRouteStore();
  const tabStore = useTabStore();
  const { toLogin, redirectFromLogin } = useRouterPush(false);
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token = ref(getToken());

  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    userName: '',
    roles: [],
    buttons: []
  });

  // 多语言数据
  const locales: Partial<Record<App.I18n.LangType, any>> = reactive({})

  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
  });

  // 判断是否登录
  const isLogin = computed(() => Boolean(token.value));

  /** Reset auth store */
  async function resetStore() {
    const authStore = useAuthStore();

    clearAuthStorage();

    authStore.$reset();

    if (!route.meta.constant) {
      await toLogin();
    }

    tabStore.cacheTabs();
    routeStore.resetStore();
  }

  /**
   * @description: 用户登录
   * @param {Api.Auth.LoginParams} params
   * @param {*} redirect: 重定向地址
   */
  const login = async (params: Api.Auth.LoginParams, redirect = true) => {
    startLoading();

    const { data: loginToken, error } = await fetchLogin(params);

    if (!error) {
      const pass = await loginByToken(loginToken);

      if (pass) {
        await routeStore.initAuthRoute();

        if (redirect) {
          await redirectFromLogin();
        }

        if (routeStore.isInitAuthRoute) {
          window.$notification?.success({
            message: $t('page.login.loginSuccess'),
            description: $t('page.login.welcomeBack', { cnName: userInfo.cnName })
          });
        }
      }
    } else {
      resetStore();
    }

    endLoading();
  }

  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    localStg.set('token', loginToken.token);

    // 2. get user info
    const pass = await getUserInfo();

    if (pass) {
      token.value = loginToken.token;

      return true;
    }

    return false;
  }

  async function getUserInfo() {
    const { data: info, error } = await fetchGetUserInfo();

    if (!error) {
      // update store
      Object.assign(userInfo, info);

      return true;
    }

    return false;
  }

  /**
   * @description: 初始化用户信息
   */
  async function initUserInfo() {
    const hasToken = getToken();
    if (hasToken) {
      const pass = await getUserInfo();

      if (!pass) {
        resetStore();
      }
    }
  }

  /**
   * @description: 初始化多语言数据
   */
  const initLocales = async () => {
    const { data, error } = await getLocales();
    if (!error) {
      Object.assign(locales, data);
      forIn(data, (value, key) => {
        i18n.global.setLocaleMessage(key, value)
      })
    }
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    initUserInfo,
    initLocales,
    locales
  };
});
