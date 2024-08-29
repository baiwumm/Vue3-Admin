import { useLoading } from '@sa/hooks';
import { forIn } from 'lodash-es';
import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import { SetupStoreId } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { $t, i18n } from '@/locales';
import { fetchGetUserInfo, fetchLogin, getLocales } from '@/service/api';
import { localStg } from '@/utils/storage';

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
    buttons: [],
    roles: [],
  });

  // 多语言数据
  const locales: Partial<Record<App.I18n.LangType, any>> = reactive({});

  // 静态路由模式下是否是超级管理员
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles?.includes(VITE_STATIC_SUPER_ROLE);
  });

  // 判断是否登录
  const isLogin = computed(() => Boolean(token.value));

  /** @description: 重置 auth 仓库 */
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
   * @param {Api.Auth.LoginParams} params
   * @param {any} redirect: 重定向地址
   * @description: 用户登录
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
            description: $t('page.login.welcomeBack', { cnName: userInfo.cnName }),
          });
        }
      }
    } else {
      resetStore();
    }

    endLoading();
  };

  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 先保存 token 到 localStorage，后续请求需要放在 headers 中
    localStg.set('token', loginToken.token);

    // 获取用户信息
    const pass = await getUserInfo();

    if (pass) {
      token.value = loginToken.token;

      return true;
    }

    return false;
  }

  /** @description: 获取登录用户信息 */
  async function getUserInfo() {
    const { data: info, error } = await fetchGetUserInfo();

    if (!error) {
      // 更新仓库用户信息
      Object.assign(userInfo, info);

      return true;
    }

    return false;
  }

  /** @description: 初始化用户信息 */
  async function initUserInfo() {
    const hasToken = getToken();
    if (hasToken) {
      const pass = await getUserInfo();

      if (!pass) {
        resetStore();
      }
    }
  }

  /** @description: 初始化多语言数据 */
  const initLocales = async () => {
    const { data, error } = await getLocales();
    if (!error) {
      Object.assign(locales, data);
      forIn(data, (value, key) => {
        i18n.global.setLocaleMessage(key, value);
      });
    }
  };

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
    locales,
  };
});
