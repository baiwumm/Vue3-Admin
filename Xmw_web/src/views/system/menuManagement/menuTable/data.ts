import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { getMenuTree } from '/@/api/system/menuManagement';

const isDir = (menu_type: string) => menu_type === 'dir';
const isMenu = (menu_type: string) => menu_type === 'menu';
const isButton = (menu_type: string) => menu_type === 'button';
export const columns: BasicColumn[] = [
    {
        title: '菜单名称',
        dataIndex: 'title',
        width: 200
    },
    {
        title: '菜单类型',
        dataIndex: 'menu_type',
        slots: { customRender: 'menu_type' },
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
        dataIndex: 'hide_menu',
        slots: { customRender: 'hide_menu' },
    },
    {
        title: '忽略缓存',
        dataIndex: 'ignore_keep_alive',
        slots: { customRender: 'ignore_keep_alive' },
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
        dataIndex: 'frame_src',
        defaultHidden: true
    },
    {
        title: '重定向',
        dataIndex: 'redirect',
    },
    {
        title: '隐藏子菜单',
        dataIndex: 'hide_childrenIn_menu',
        slots: { customRender: 'hide_childrenIn_menu' }
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
        dataIndex: 'create_time',
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
        field: 'menu_type',
        label: '菜单类型',
        component: 'RadioButtonGroup',
        defaultValue: 'dir',
        colProps: { lg: 24, md: 24 },
        required: true,
    },
    {
        field: 'parent_id',
        label: '上级菜单',
        component: 'ApiTreeSelect',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请选择上级菜单',
            params: {},
            replaceFields: {
                title: 'title',
                key: 'menu_d',
                value: 'menu_id',
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
        ifShow: ({ values }) => !isButton(values.menu_type),
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
        ifShow: ({ values }) => isDir(values.menu_type),
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
        ifShow: ({ values }) => !isButton(values.menu_type),
    },
    {
        field: 'permission',
        label: '权限标识',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请输入权限标识',
        },
        ifShow: ({ values }) => !isDir(values.menu_type),
    },
    {
        field: 'frame_src',
        label: '内嵌地址',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请输入内嵌地址',
        },
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'transition_name',
        label: '路由动画',
        component: 'Select',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请选择路由动画',
        },
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'icon',
        label: '图标',
        component: 'IconPicker',
        ifShow: ({ values }) => !isButton(values.menu_type),
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
        field: 'hide_childrenIn_menu',
        label: '隐藏子菜单',
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'ignore_keep_alive',
        label: '是否忽略缓存',
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'affix',
        label: '是否固定标签',
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'hide_tab',
        label: '不在标签显示',
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isMenu(values.menu_type),
    },
    {
        field: 'hide_menu',
        label: '是否隐藏',
        component: 'RadioGroup',
        defaultValue: '0',
        required: true,
        ifShow: ({ values }) => isDir(values.menu_type) || isMenu(values.menu_type),
    },
    {
        field: 'status',
        label: '状态',
        component: 'RadioGroup',
        required: true,
        defaultValue: '1',
    }
];
