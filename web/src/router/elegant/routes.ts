/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { GeneratedRoute } from '@elegant-router/types';

export const generatedRoutes: GeneratedRoute[] = [
  {
    name: '403',
    path: '/403',
    component: 'layout.blank$view.403',
    meta: {
      title: '403',
      i18nKey: 'route.403',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '404',
    path: '/404',
    component: 'layout.blank$view.404',
    meta: {
      title: '404',
      i18nKey: 'route.404',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '500',
    path: '/500',
    component: 'layout.blank$view.500',
    meta: {
      title: '500',
      i18nKey: 'route.500',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: 'about',
    path: '/about',
    component: 'layout.base$view.about',
    meta: {
      title: 'about',
      i18nKey: 'route.about',
      icon: 'fluent:book-information-24-regular',
      order: 10
    }
  },
  {
    name: 'administrative',
    path: '/administrative',
    component: 'layout.base',
    meta: {
      title: 'administrative',
      i18nKey: 'route.administrative',
      icon: 'ri:quill-pen-line',
      order: 2
    },
    children: [
      {
        name: 'administrative_organization',
        path: '/administrative/organization',
        component: 'view.administrative_organization',
        meta: {
          title: 'administrative_organization',
          i18nKey: 'route.administrative_organization',
          icon: 'ri:exchange-2-line'
        }
      },
      {
        name: 'administrative_post-manage',
        path: '/administrative/post-manage',
        component: 'view.administrative_post-manage',
        meta: {
          title: 'administrative_post-manage',
          i18nKey: 'route.administrative_post-manage',
          icon: 'ri:contacts-book-3-line'
        }
      }
    ]
  },
  {
    name: 'home',
    path: '/home',
    component: 'layout.base$view.home',
    meta: {
      title: 'home',
      i18nKey: 'route.home',
      icon: 'mdi:monitor-dashboard',
      order: 1
    }
  },
  {
    name: 'iframe-page',
    path: '/iframe-page/:url',
    component: 'layout.base$view.iframe-page',
    props: true,
    meta: {
      title: 'iframe-page',
      i18nKey: 'route.iframe-page',
      constant: true,
      hideInMenu: true,
      keepAlive: true
    }
  },
  {
    name: 'login',
    path: '/login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?',
    component: 'layout.blank$view.login',
    props: true,
    meta: {
      title: 'login',
      i18nKey: 'route.login',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: 'system-manage',
    path: '/system-manage',
    component: 'layout.base',
    meta: {
      title: 'system-manage',
      i18nKey: 'route.system-manage',
      order: 3,
      icon: 'ri:settings-2-line'
    },
    children: [
      {
        name: 'system-manage_internalization',
        path: '/system-manage/internalization',
        component: 'view.system-manage_internalization',
        meta: {
          title: 'system-manage_internalization',
          i18nKey: 'route.system-manage_internalization',
          icon: 'ri:global-line',
          order: 2
        }
      },
      {
        name: 'system-manage_menu-manage',
        path: '/system-manage/menu-manage',
        component: 'view.system-manage_menu-manage',
        meta: {
          title: 'system-manage_menu-manage',
          i18nKey: 'route.system-manage_menu-manage',
          icon: 'ri:route-fill',
          order: 1
        }
      },
      {
        name: 'system-manage_operation-log',
        path: '/system-manage/operation-log',
        component: 'view.system-manage_operation-log',
        meta: {
          title: 'system-manage_operation-log',
          i18nKey: 'route.system-manage_operation-log',
          icon: 'ri:draft-line',
          order: 3
        }
      },
      {
        name: 'system-manage_user-manage',
        path: '/system-manage/user-manage',
        component: 'view.system-manage_user-manage',
        meta: {
          title: 'system-manage_user-manage',
          i18nKey: 'route.system-manage_user-manage',
          icon: 'ri:user-settings-line'
        }
      }
    ]
  },
  {
    name: 'user-center',
    path: '/user-center',
    component: 'layout.base$view.user-center',
    meta: {
      title: 'user-center',
      i18nKey: 'route.user-center',
      hideInMenu: true
    }
  }
];
