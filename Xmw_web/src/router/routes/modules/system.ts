import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
    path: '/system',
    name: 'System',
    component: LAYOUT,
    redirect: '/system/userManagement',
    meta: {
        icon: 'simple-icons:about-dot-me',
        title: t('routes.system.title'),
        orderNo: 100000,
    },
    children: [
        {
            path: 'userManagement',
            name: 'userManagement',
            component: () => import('/@/views/system/userManagement/index.vue'),
            meta: {
                title: t('routes.system.userManagement.title'),
                icon: 'simple-icons:about-dot-me',
            },
        },
        {
            path: 'postManagement',
            name: 'PostManagement',
            component: () => import('/@/views/system/postManagement/index.vue'),
            meta: {
                title: t('routes.system.postManagement.title'),
                icon: 'simple-icons:about-dot-me',
            },
        },
        {
            path: 'dictionaryManagement',
            name: 'DictionaryManagement',
            component: () => import('/@/views/system/dictionaryManagement/index.vue'),
            meta: {
                title: t('routes.system.dictionaryManagement.title'),
                icon: 'simple-icons:about-dot-me',
            },
        },
        {
            path: 'operationLogs',
            name: 'OperationLogs',
            component: () => import('/@/views/system/operationLogs/index.vue'),
            meta: {
                title: t('routes.system.operationLogs.title'),
                icon: 'simple-icons:about-dot-me',
            },
        },
    ],
};

export default system;
