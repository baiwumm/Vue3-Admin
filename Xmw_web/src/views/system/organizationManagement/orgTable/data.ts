import { BasicColumn, FormSchema } from '/@/components/Table';
import { getOrganizationTree } from '/@/api/system/organizationManagement'; // 引入组织树接口

export const columns: BasicColumn[] = [
    {
        title: '组织名称',
        dataIndex: 'orgName',
    },
    {
        title: '组织编码',
        dataIndex: 'orgCode',
    },
    {
        title: '组织类型',
        dataIndex: 'orgType',
        slots: { customRender: 'orgType' },
    },
    {
        title: '状态',
        dataIndex: 'status',
        slots: { customRender: 'status' },
    },
    {
        title: '描述',
        dataIndex: 'remark',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        sorter: true,
    }

];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'orgName',
        label: '组织名称',
        component: 'Input',
        colProps: { span: 12 },
        labelWidth: 100,
        componentProps: {
            placeholder: '请输入组织名称',
        },
    },
    {
        field: 'orgCode',
        label: '组织编码',
        component: 'Input',
        colProps: { span: 12 },
        labelWidth: 100,
        componentProps: {
            placeholder: '请输入组织编码',
        },
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'parentId',
        component: 'ApiTreeSelect',
        label: '上级组织',
        componentProps: {
            api: getOrganizationTree,
            params: {},
            placeholder: '请选择上级组织',
            replaceFields: {
                title: 'orgName',
                key: 'orgId',
                value: 'orgId',
            },
        },
        colProps: { lg: 24, md: 24 },
    },
    {
        field: 'orgName',
        label: '组织名称',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            placeholder: '请输入组织名称',
            maxLength: 32,
            showCount: true
        },
    },
    {
        field: 'orgCode',
        label: '组织编码',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            placeholder: '请输入组织编码',
            maxLength: 32
        },
    },
    {
        field: 'orgType',
        label: '组织类型',
        component: 'RadioButtonGroup',
        defaultValue: '1',
        required: true,
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
        label: '描述',
        field: 'remark',
        component: 'InputTextArea',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请输入描述',
            rows: 4,
            maxLength: 200
        },
    },
];
