import { BasicColumn, FormSchema } from '/@/components/Table';
import { getOrganizationTree } from '/@/api/system/organizationManagement'; // 引入组织树接口
import { getPostTree } from '/@/api/system/postManagement'; // 引入岗位树接口

export const columns: BasicColumn[] = [
    {
        title: '岗位名称',
        dataIndex: 'postName',
    },
    {
        title: '所属组织',
        dataIndex: 'orgName'
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
    {
        title: '创建时间',
        dataIndex: 'createTime'
    },
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'postName',
        label: '岗位名称',
        component: 'Input',
        colProps: { span: 8 },
        labelWidth: 80,
        componentProps: {
            placeholder: '请输入岗位名称',
        },
    },
    {
        field: 'orgId',
        component: 'ApiTreeSelect',
        label: '所属组织',
        componentProps: {
            api: getOrganizationTree,
            placeholder: '请选择所属组织',
            replaceFields: {
                title: 'orgName',
                key: 'orgId',
                value: 'orgId',
            },
        },
        colProps: { span: 8 },
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'postName',
        label: '岗位名称',
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            placeholder: '请输入岗位名称',
            maxLength: 32,
            showCount: true
        },
    },
    {
        field: 'parentId',
        component: 'ApiTreeSelect',
        label: '上级岗位',
        componentProps: {
            api: getPostTree,
            placeholder: '请选择上级岗位',
            params: {},
            replaceFields: {
                title: 'postName',
                key: 'postId',
                value: 'postId',
            },
        },
        colProps: { lg: 24, md: 24 },
    },
    {
        field: 'orgId',
        component: 'ApiTreeSelect',
        label: '所属组织',
        required: true,
        componentProps: {
            api: getOrganizationTree,
            placeholder: '请选择所属组织',
            replaceFields: {
                title: 'orgName',
                key: 'orgId',
                value: 'orgId',
            },
        },
        colProps: { lg: 24, md: 24 },
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
