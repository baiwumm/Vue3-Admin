import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
    {
        title: '字典名称',
        dataIndex: 'dictName',
    },
    {
        title: '字典编码',
        dataIndex: 'dictCoding',
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 80,
        slots: { customRender: 'status' },
    },
    {
        title: '排序',
        dataIndex: 'sort',
        width: 80,
        defaultHidden: true
    },
    {
        title: '备注',
        dataIndex: 'remark'
    },
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'dictName',
        label: '字典名称',
        component: 'Input',
        colProps: { span: 12 },
        labelWidth: 80,
        componentProps: {
            placeholder: '请输入字典名称',
        },
    },
    {
        field: 'dictCoding',
        label: '字典编码',
        component: 'Input',
        colProps: { span: 12 },
        labelWidth: 80,
        componentProps: {
            placeholder: '请输入字典编码',
        },
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'dictName',
        label: '字典名称',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            placeholder: '请输入字典名称',
        },
    },
    {
        field: 'dictCoding',
        label: '字典编码',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            placeholder: '请输入字典编码',
        },
    },
    {
        field: 'status',
        label: '状态',
        component: 'RadioGroup',
        required: true,
        defaultValue: '1'
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
            style: { width: '100%' }
        },
    },
    {
        label: '备注',
        field: 'remark',
        component: 'InputTextArea',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请输入备注',
            rows: 4,
            maxLength: 200
        },
    },
];
