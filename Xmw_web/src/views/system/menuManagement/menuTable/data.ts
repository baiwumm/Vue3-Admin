import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { getMenuTree } from '/@/api/system/menuManagement';

const isDir = (menu_type: string) => menu_type === 'dir';
const isMenu = (menu_type: string) => menu_type === 'menu';
const isButton = (menu_type: string) => menu_type === 'button';

import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n();
export const columns: BasicColumn[] = [
    {
        title: t('router.system.menuManagement.lang'),
        dataIndex: 'lang',
        width: 200
    },
    {
        title: t('router.system.menuManagement.menu_type'),
        dataIndex: 'menu_type',
        slots: { customRender: 'menu_type' },
    },
    {
        title: t('router.system.menuManagement.icon'),
        dataIndex: 'icon',
        customRender: ({ record }) => {
            return h(Icon, {
                icon: record.icon || '', style: {
                    color: 'rgb(24, 144, 255)',
                    fontSize: '20px'
                }
            });
        },
    },
    {
        title: t('router.system.menuManagement.hide'),
        dataIndex: 'hide_menu',
        slots: { customRender: 'hide_menu' },
    },
    {
        title: t('router.system.menuManagement.cache'),
        dataIndex: 'ignore_keep_alive',
        slots: { customRender: 'ignore_keep_alive' },
    },
    {
        title: t('router.system.menuManagement.path'),
        dataIndex: 'path',
    },
    {
        title: t('router.system.menuManagement.component'),
        dataIndex: 'component',
    },
    {
        title: t('router.system.menuManagement.permission'),
        dataIndex: 'permission',
        width: 320,
        slots: { customRender: 'permission' }
    },
    {
        title: t('router.system.menuManagement.frame'),
        dataIndex: 'frame_src',
        defaultHidden: true
    },
    {
        title: t('router.system.menuManagement.redirect'),
        dataIndex: 'redirect',
    },
    {
        title: t('router.system.menuManagement.hideChildMenu'),
        dataIndex: 'hide_childrenIn_menu',
        slots: { customRender: 'hide_childrenIn_menu' }
    },
    {
        title: t('router.common.sort'),
        dataIndex: 'sort',
    },
    {
        title: t('router.common.status'),
        dataIndex: 'status',
        slots: { customRender: 'status' },
    },
    {
        title: t('router.common.createTime'),
        dataIndex: 'create_time',
        defaultHidden: true
    }
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'title',
        label: t('router.system.menuManagement.lang'),
        component: 'Input',
        componentProps: {
            maxLength: 32
        },
    },
    {
        field: 'status',
        label: t('router.common.status'),
        component: 'Select',
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'menu_type',
        label: t('router.system.menuManagement.menu_type'),
        component: 'RadioButtonGroup',
        defaultValue: 'dir',
        colProps: { lg: 24, md: 24 },
        required: true,
    },
    {
        field: 'parent_id',
        label: t('router.system.menuManagement.higherMenu'),
        component: 'ApiTreeSelect',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            params: {},
            replaceFields: {
                title: 'lang',
                key: 'menu_d',
                value: 'menu_id',
            },
            api: getMenuTree,
        },
    },
    {
        field: 'title',
        label: t('router.system.menuManagement.lang'),
        component: 'Input',
        required: true,
        colProps: { lg: 24, md: 24 },
        helpMessage: [t('router.system.menuManagement.field'), t('router.system.menuManagement.correspondingField')],
        componentProps: {
            maxLength: 100
        },
    },
    {
        field: 'path',
        label: t('router.system.menuManagement.path'),
        component: 'Input',
        required: true,
        colProps: { lg: 24, md: 24 },
        componentProps: {
            maxLength: 100
        },
        ifShow: ({ values }) => !isButton(values.menu_type),
    },
    {
        field: 'redirect',
        label: t('router.system.menuManagement.redirect'),
        component: 'Input',
        required: true,
        colProps: { lg: 24, md: 24 },
        componentProps: {
            maxLength: 100
        },
        ifShow: ({ values }) => isDir(values.menu_type),
    },
    {
        field: 'component',
        label: t('router.system.menuManagement.component'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            maxLength: 200
        },
        ifShow: ({ values }) => !isButton(values.menu_type),
    },
    {
        field: 'permission',
        label: t('router.system.menuManagement.permission'),
        required: true,
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            maxLength: 50
        }
    },
    {
        field: 'frame_src',
        label: t('router.system.menuManagement.frame'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            maxLength: 200
        },
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'transition_name',
        label: t('router.system.menuManagement.transition'),
        component: 'Select',
        colProps: { lg: 24, md: 24 },
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'icon',
        label: t('router.system.menuManagement.icon'),
        component: 'IconPicker',
        ifShow: ({ values }) => !isButton(values.menu_type),
    },
    {
        field: 'sort',
        label: t('router.common.sort'),
        component: 'InputNumber',
        required: true,
        defaultValue: '1',
        componentProps: {
            min: 1,
        },
    },
    {
        field: 'hide_childrenIn_menu',
        label: t('router.system.menuManagement.hideChildMenu'),
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'ignore_keep_alive',
        label: t('router.system.menuManagement.cache'),
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'affix',
        label: t('router.system.menuManagement.affix'),
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'hide_tab',
        label: t('router.system.menuManagement.hideTab'),
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'hide_menu',
        label: t('router.system.menuManagement.hide'),
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isDir(values.menu_type) || isMenu(values.menu_type),
    },
    {
        field: 'status',
        label: t('router.common.status'),
        component: 'RadioGroup',
        required: true,
        defaultValue: '1',
    }
];
