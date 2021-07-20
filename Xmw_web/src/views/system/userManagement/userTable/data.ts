import { BasicColumn, FormSchema } from '/@/components/Table';
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