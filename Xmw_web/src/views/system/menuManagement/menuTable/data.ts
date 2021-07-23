import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { getMenuTree } from '/@/api/system/menuManagement';

const isDir = (menuType: string) => menuType === 'dir';
const isMenu = (menuType: string) => menuType === 'menu';
const isButton = (menuType: string) => menuType === 'button';
export const columns: BasicColumn[] = [
    {
        title: '菜单名称',
        dataIndex: 'title',
        width: 200
    },
    {
        title: '菜单类型',
        dataIndex: 'menuType',
        slots: { customRender: 'menuType' },
    },
    {
        title: '图标',
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
        title: '是否隐藏',
        dataIndex: 'hideMenu',
        slots: { customRender: 'hideMenu' },
    },
    {
        title: '忽略缓存',
        dataIndex: 'ignoreKeepAlive',
        slots: { customRender: 'ignoreKeepAlive' },
    },
    {
        title: '路由地址',
        dataIndex: 'path',
    },
    {
        title: '组件路径',
        dataIndex: 'component',
    },
    {
        title: '权限标识',
        dataIndex: 'permission',
        width: 200,
        slots: { customRender: 'permission' }
    },
    {
        title: '内嵌地址',
        dataIndex: 'frameSrc',
        defaultHidden: true
    },
    {
        title: '重定向',
        dataIndex: 'redirect',
    },
    {
        title: '隐藏子菜单',
        dataIndex: 'hideChildrenInMenu',
        slots: { customRender: 'hideChildrenInMenu' }
    },
    {
        title: '排序',
        dataIndex: 'sort',
    },
    {
        title: '状态',
        dataIndex: 'status',
        slots: { customRender: 'status' },
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        defaultHidden: true
    }
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'title',
        label: '菜单名称',
        component: 'Input',
        componentProps: {
            placeholder: '请输入菜单名称',
        },
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'menuType',
        label: '菜单类型',
        component: 'RadioButtonGroup',
        defaultValue: 'dir',
        colProps: { lg: 24, md: 24 },
        required: true,
    },
    {
        field: 'parentId',
        label: '上级菜单',
        component: 'ApiTreeSelect',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请选择上级菜单',
            params: {},
            replaceFields: {
                title: 'title',
                key: 'menuId',
                value: 'menuId',
            },
            api: getMenuTree,
        },
    },
    {
        field: 'title',
        label: '菜单名称',
        component: 'Input',
        required: true,
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请输入菜单名称',
        },
    },
    {
        field: 'path',
        label: '路由地址',
        component: 'Input',
        required: true,
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请输入路由地址',
        },
        ifShow: ({ values }) => !isButton(values.menuType),
    },
    {
        field: 'redirect',
        label: '重定向地址',
        component: 'Input',
        required: true,
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请输入重定向地址',
        },
        ifShow: ({ values }) => isDir(values.menuType),
    },
    {
        field: 'component',
        label: '组件路径',
        component: 'Input',
        required: true,
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请输入组件路径',
        },
        ifShow: ({ values }) => !isButton(values.menuType),
    },
    {
        field: 'permission',
        label: '权限标识',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请输入权限标识',
        },
        ifShow: ({ values }) => !isDir(values.menuType),
    },
    {
        field: 'frameSrc',
        label: '内嵌地址',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请输入内嵌地址',
        },
        ifShow: ({ values }) => isMenu(values.menuType),
    },
    {
        field: 'transitionName',
        label: '路由动画',
        component: 'Select',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请选择路由动画',
        },
        ifShow: ({ values }) => isMenu(values.menuType),
    },
    {
        field: 'icon',
        label: '图标',
        component: 'IconPicker',
        ifShow: ({ values }) => !isButton(values.menuType),
    },
    {
        field: 'sort',
        label: '排序',
        component: 'InputNumber',
        required: true,
        defaultValue: '1',
        componentProps: {
            placeholder: '请输入排序',
            min: 1,
        },
    },
    {
        field: 'hideChildrenInMenu',
        label: '隐藏子菜单',
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menuType),
    },
    {
        field: 'ignoreKeepAlive',
        label: '是否忽略缓存',
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menuType),
    },
    {
        field: 'affix',
        label: '是否固定标签',
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menuType),
    },
    {
        field: 'hideTab',
        label: '不在标签显示',
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menuType),
    },
    {
        field: 'hideMenu',
        label: '是否隐藏',
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isDir(values.menuType) || isMenu(values.menuType),
    },
    {
        field: 'status',
        label: '状态',
        component: 'RadioGroup',
        required: true,
        defaultValue: '1',
    }
];
