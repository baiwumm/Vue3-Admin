import { BasicColumn, FormSchema } from '/@/components/Table';
import { getRoleList } from '/@/api/system/roleManagement'; // 引入角色管理接口
// 表格列配置项
export const columns: BasicColumn[] = [
    {
        title: '用户名',
        dataIndex: 'userName'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        slots: { customRender: 'sex' }
    },
]
// 表格表单搜索
export const searchFormSchema: FormSchema[] = [
    {
        field: 'userName',
        label: '用户名',
        component: 'Input',
        colProps: { span: 8 },
        componentProps: {
            placeholder: '请输入用户名',
        },
    },
    {
        field: 'status',
        component: 'Select',
        label: '状态',
        colProps: {
            span: 8,
        },
        componentProps: {
            options: [
                {
                    label: '启用',
                    value: 0
                },
                {
                    label: '禁用',
                    value: 1
                },
            ],
        },
    },
]

export const dataFormSchema: FormSchema[] = [
    {
        field: 'role_id',
        label: '角色名称',
        required: true,
        component: 'ApiSelect',
        componentProps: {
            api: getRoleList,
            params: { current: 1, pageSize: 9999 },
            placeholder: '请选择角色名称',
            resultField: 'records',
            labelField: 'role_name',
            valueField: 'role_id',
        },
    },
    {
        field: 'user_name',
        label: '用户名',
        required: true,
        component: 'Input',
        componentProps: {
            placeholder: '请输入用户名',
            maxLength: 32
        },
    },
    {
        field: 'cn_name',
        label: '中文名',
        required: true,
        component: 'Input',
        componentProps: {
            placeholder: '请输入中文名',
            maxLength: 32
        },
    },
    {
        field: 'en_name',
        label: '英文名',
        component: 'Input',
        componentProps: {
            placeholder: '请输入英文名',
            maxLength: 32
        },
    },
];