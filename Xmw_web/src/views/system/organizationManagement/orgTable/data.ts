import { BasicColumn, FormSchema } from '/@/components/Table';
import { getOrganizationTree } from '/@/api/system/organizationManagement'; // 引入组织树接口
import { getUserList } from '/@/api/system/userManagement'; // 用户接口
export const columns: BasicColumn[] = [
    {
        title: '组织名称',
        dataIndex: 'org_name',
    },
    {
        title: '组织编码',
        dataIndex: 'org_code',
    },
    {
        title: '组织类型',
        dataIndex: 'org_type',
        slots: { customRender: 'org_type' },
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
        dataIndex: 'create_time',
        sorter: true,
    }

];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'org_name',
        label: '组织名称',
        component: 'Input',
        componentProps: {
            placeholder: '请输入组织名称',
            maxLength: 32
        },
    },
    {
        field: 'org_code',
        label: '组织编码',
        component: 'Input',
        componentProps: {
            placeholder: '请输入组织编码',
            maxLength: 32
        },
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'parent_id',
        component: 'ApiTreeSelect',
        label: '上级组织',
        componentProps: {
            api: getOrganizationTree,
            params: {},
            placeholder: '请选择上级组织',
            replaceFields: {
                title: 'org_name',
                key: 'org_id',
                value: 'org_id',
            },
        },
        colProps: { lg: 24, md: 24 },
    },
    // {
    //     field: 'leader',
    //     label: '组织负责人',
    //     component: 'ApiSelect',
    //     colProps: { lg: 24, md: 24 },
    //     componentProps: {
    //         api: getUserList,
    //         params: { current: 1, pageSize: 9999 },
    //         placeholder: '请选择组织负责人',
    //         resultField: 'records',
    //         labelField: 'cn_name',
    //         valueField: 'user_id',
    //     }
    // },
    {
        field: 'org_name',
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
        field: 'org_code',
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
        field: 'org_type',
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
