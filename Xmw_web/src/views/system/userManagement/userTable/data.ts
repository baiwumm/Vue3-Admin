import { BasicColumn, FormSchema } from '/@/components/Table';
import { getRoleList } from '/@/api/system/roleManagement'; // 引入角色管理接口
import { getOrganizationTree } from '/@/api/system/organizationManagement'; // 引入组织树接口
import { getPostTree } from '/@/api/system/postManagement'; // 引入岗位树接口
import cities from './cities.json' // 地址
// 表格列配置项
export const columns: BasicColumn[] = [
    {
        title: '用户名',
        dataIndex: 'user_name'
    },
    {
        title: '中文名',
        dataIndex: 'cn_name'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        slots: { customRender: 'sex' }
    },
    {
        title: '所属组织',
        dataIndex: 'org_name'
    },
    {
        title: '岗位',
        dataIndex: 'post_name'
    },
    {
        title: '手机号码',
        dataIndex: 'phone'
    },
    {
        title: '角色名称',
        dataIndex: 'role_name',
        slots: { customRender: 'role_name' }
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 80,
        slots: { customRender: 'status' },
    }
]
// 表格表单搜索
export const searchFormSchema: FormSchema[] = [
    {
        field: 'user_name',
        label: '用户名',
        component: 'Input',
        componentProps: {
            placeholder: '请输入用户名',
            maxLength: 12
        },
    },
    {
        field: 'status',
        label: '状态',
        component: 'Select',
    },
    {
        field: 'role_id',
        label: '角色名称',
        component: 'ApiSelect',
        componentProps: {
            api: getRoleList,
            params: { current: 1, pageSize: 9999 },
            placeholder: '请选择角色名称',
            resultField: 'records',
            labelField: 'role_name',
            valueField: 'role_id',
        }
    },
]

export const dataFormSchema: FormSchema[] = [
    {
        field: 'role_id',
        label: '角色名称',
        component: 'ApiSelect',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            api: getRoleList,
            mode: 'multiple',
            maxTagCount: 2,
            params: { current: 1, pageSize: 9999 },
            placeholder: '请选择角色名称',
            resultField: 'records',
            labelField: 'role_name',
            valueField: 'role_id',
        },
        rules: [
            {
                required: true,
                message: '请选择角色名称',
                type: 'array',
            },
        ],
    },
    {
        field: 'user_name',
        label: '用户名',
        required: true,
        component: 'Input',
        componentProps: {
            placeholder: '请输入用户名',
            maxLength: 12
        },
    },
    {
        field: 'cn_name',
        label: '中文名',
        required: true,
        component: 'Input',
        componentProps: {
            placeholder: '请输入中文名',
            maxLength: 20
        },
    },
    {
        field: 'en_name',
        label: '英文名',
        component: 'Input',
        componentProps: {
            placeholder: '请输入英文名',
            maxLength: 20
        },
    },
    {
        field: 'work_no',
        label: '工号',
        component: 'Input',
        componentProps: {
            placeholder: '请输入工号',
            maxLength: 10
        },
    },
    {
        field: 'password',
        label: '密码',
        component: 'StrengthMeter',
        componentProps: {
            placeholder: '请输入密码',
            maxLength: 12
        },
        rules: [
            {
                required: true,
                validator: async (rule, value) => {
                    if (!value) {
                        return Promise.reject('请输入密码!');
                    } else {
                        if (value.length < 6 || value.length > 12) {
                            return Promise.reject('密码的长度在6-12个字符!');
                        }
                    }
                    return Promise.resolve();
                },
                trigger: 'change',
            },
        ],
    },
    {
        field: 'confirmPassword',
        label: '确认密码',
        component: 'InputPassword',
        componentProps: {
            placeholder: '请确认密码',
            maxLength: 12
        },
        dynamicRules: ({ values }) => {
            return [
                {
                    required: true,
                    validator: (_, value) => {
                        if (!value) {
                            return Promise.reject('请确认密码');
                        }
                        if (value !== values.password) {
                            return Promise.reject('两次输入的密码不一致!');
                        }
                        return Promise.resolve();
                    },
                    trigger: 'change',
                },
            ];
        },
    },
    {
        field: 'address',
        label: '工作地址',
        component: 'Cascader',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请选择工作地址',
            options: cities.options
        },
    },
    {
        field: 'org_id',
        component: 'ApiTreeSelect',
        label: '所属组织',
        colProps: { lg: 24, md: 24 },
        componentProps: ({ formModel, formActionType }) => {
            return {
                api: getOrganizationTree,
                placeholder: '请选择所属组织',
                replaceFields: {
                    title: 'org_name',
                    key: 'org_id',
                    value: 'org_id',
                },
                onChange: async (e: any) => {
                    let citiesOptions = await getPostTree({ org_id: e })
                    if (e === undefined) {
                        citiesOptions = [];
                    }
                    formModel.post_id = undefined;
                    const { updateSchema } = formActionType;
                    updateSchema({
                        field: 'post_id',
                        componentProps: {
                            treeData: citiesOptions
                        },
                    });
                },
            };
        }
    },
    {
        field: 'post_id',
        component: 'TreeSelect',
        label: '所属岗位',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            placeholder: '请选择所属岗位',
            replaceFields: {
                title: 'post_name',
                key: 'post_id',
                value: 'post_id',
            }
        }
    },
    {
        field: 'phone',
        label: '手机号码',
        required: true,
        component: 'Input',
        componentProps: {
            placeholder: '请输入手机号码',
            maxLength: 11
        },
        rules: [
            {
                required: false,
                validator: async (rule, value) => {
                    if (value) {
                        const reg = /^[1][0-9]{10}$/
                        if (!reg.test(value)) {
                            return Promise.reject('手机号码格式不正确!');
                        }
                    }
                    return Promise.resolve();
                },
                trigger: 'change',
            },
        ],
    },
    {
        field: 'email',
        label: '电子邮箱',
        required: true,
        component: 'Input',
        componentProps: {
            placeholder: '请输入电子邮箱',
            maxLength: 50
        },
        rules: [{ type: 'email', message: '电子邮箱格式不对!', trigger: 'change', }],
    },
    {
        field: 'sex',
        label: '性别',
        component: 'RadioGroup',
        defaultValue: '1',
    },
    {
        field: 'status',
        label: '状态',
        component: 'RadioGroup',
        defaultValue: '1',
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
];