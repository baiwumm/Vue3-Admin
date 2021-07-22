import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const workbench: AppRouteModule = {
    path: '/workbench',
    name: 'Workbench',
    component: LAYOUT,
    redirect: '/workbench/index',
    meta: {
        hideChildrenInMenu: true,
        icon: 'simple-icons:about-dot-me',
        title: t('routes.workbench.title')
    },
    children: [
        {
            path: 'index',
            name: 'WorkbenchPage',
            component: () => import('/@/views/workbench/index.vue'),
            meta: {
                title: t('routes.workbench.title'),
                icon: 'simple-icons:about-dot-me',
                hideMenu: true,
                affix:true
            },
        },
    ],
};

export default workbench;
