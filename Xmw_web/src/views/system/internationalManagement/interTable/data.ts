import { BasicColumn, FormSchema } from '/@/components/Table';
// 表格列配置项
export const columns: BasicColumn[] = [
    {
        title: '国际化字段',
        dataIndex: 'internation_name'
    },
    {
        title: '中文',
        dataIndex: 'zh_CN'
    },
    {
        title: '英文',
        dataIndex: 'en'
    },
    {
        title: '创建人',
        dataIndex: 'cn_name'
    },
    {
        title: '创建时间',
        dataIndex: 'create_time'
    }
]

export const dataFormSchema: FormSchema[] = [
    {
        field: 'internation_name',
        label: '国际化字段',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            placeholder: '请输入国际化字段',
            maxLength: 100
        },
    },
    {
        field: 'zh_CN',
        label: '中文',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            placeholder: '请输入中文',
            maxLength: 100
        },
    },
    {
        field: 'en',
        label: '英文',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            placeholder: '请输入英文',
            maxLength: 500
        },
    },
]