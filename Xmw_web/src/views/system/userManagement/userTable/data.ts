import { BasicColumn, FormSchema } from '/@/components/Table';
import { getRoleList } from '/@/api/system/roleManagement'; // 引入角色管理接口
import { getOrganizationTree } from '/@/api/system/organizationManagement'; // 引入组织树接口
import { getPostTree } from '/@/api/system/postManagement'; // 引入岗位树接口
import cities from './cities.json' // 地址
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n();
// 表格列配置项
export const columns: BasicColumn[] = [
    {
        title: t('router.common.userName'),
        dataIndex: 'user_name'
    },
    {
        title: t('router.common.cnName'),
        dataIndex: 'cn_name'
    },
    {
        title: t('router.common.sex'),
        dataIndex: 'sex',
        slots: { customRender: 'sex' }
    },
    {
        title: t('router.system.userManagement.org'),
        dataIndex: 'org_name'
    },
    {
        title: t('router.system.userManagement.post'),
        dataIndex: 'post_name'
    },
    {
        title: t('router.system.userManagement.phone'),
        dataIndex: 'phone'
    },
    {
        title: t('router.system.roleManagement.roleName'),
        dataIndex: 'role_name',
        slots: { customRender: 'role_name' }
    },
    {
        title: t('router.common.status'),
        dataIndex: 'status',
        width: 80,
        slots: { customRender: 'status' },
    }
]
// 表格表单搜索
export const searchFormSchema: FormSchema[] = [
    {
        field: 'user_name',
        label: t('router.common.userName'),
        component: 'Input',
        componentProps: {
            maxLength: 12
        },
    },
    {
        field: 'status',
        label: t('router.common.status'),
        component: 'Select',
    },
    {
        field: 'role_id',
        label: t('router.system.roleManagement.roleName'),
        component: 'ApiSelect',
        componentProps: {
            api: getRoleList,
            params: { current: 1, pageSize: 9999 },
            resultField: 'records',
            labelField: 'role_name',
            valueField: 'role_id',
        }
    },
]

export const dataFormSchema: FormSchema[] = [
    {
        field: 'role_id',
        label: t('router.system.roleManagement.roleName'),
        component: 'ApiSelect',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            api: getRoleList,
            mode: 'multiple',
            maxTagCount: 2,
            params: { current: 1, pageSize: 9999 },
            resultField: 'records',
            labelField: 'role_name',
            valueField: 'role_id',
        },
        rules: [
            {
                required: true,
                type: 'array',
            },
        ],
    },
    {
        field: 'user_name',
        label: t('router.common.userName'),
        required: true,
        component: 'Input',
        componentProps: {
            maxLength: 12
        },
    },
    {
        field: 'cn_name',
        label: t('router.common.cnName'),
        required: true,
        component: 'Input',
        componentProps: {
            maxLength: 20
        },
    },
    {
        field: 'en_name',
        label: t('router.common.enName'),
        component: 'Input',
        componentProps: {
            maxLength: 20
        },
    },
    {
        field: 'work_no',
        label: t('router.system.userManagement.workNo'),
        component: 'Input',
        componentProps: {
            maxLength: 10
        },
    },
    {
        field: 'password',
        label: t('router.common.passWord'),
        component: 'StrengthMeter',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            maxLength: 12,
            placeholder: t('common.inputText')
        },
        rules: [
            {
                required: true,
                validator: async (rule, value) => {
                    if (!value) {
                        return Promise.reject(t('sys.login.password'));
                    } else {
                        if (value.length < 6 || value.length > 12) {
                            return Promise.reject('router.system.userManagement.pwdLen');
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
        label: t('router.system.userManagement.confirmPsd'),
        component: 'InputPassword',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            maxLength: 12
        },
        dynamicRules: ({ values }) => {
            return [
                {
                    required: true,
                    validator: (_, value) => {
                        if (!value) {
                            return Promise.reject(t('router.system.userManagement.PleaseConfirmPsd'));
                        }
                        if (value !== values.password) {
                            return Promise.reject(t('router.system.userManagement.regConfirmPsd'));
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
        label: t('router.system.userManagement.address'),
        component: 'Cascader',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            options: cities.options
        },
    },
    {
        field: 'org_id',
        component: 'ApiTreeSelect',
        label: t('router.system.userManagement.org'),
        colProps: { lg: 24, md: 24 },
        componentProps: ({ formModel, formActionType }) => {
            return {
                api: getOrganizationTree,
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
        label: t('router.system.userManagement.post'),
        colProps: { lg: 24, md: 24 },
        componentProps: {
            replaceFields: {
                title: 'post_name',
                key: 'post_id',
                value: 'post_id',
            }
        }
    },
    {
        field: 'phone',
        label: t('router.system.userManagement.phone'),
        required: true,
        component: 'Input',
        componentProps: {
            maxLength: 11
        },
        rules: [
            {
                required: false,
                validator: async (rule, value) => {
                    if (value) {
                        const reg = /^[1][0-9]{10}$/
                        if (!reg.test(value)) {
                            return Promise.reject(t('router.system.userManagement.regPhone'));
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
        label: t('router.system.userManagement.email'),
        required: true,
        component: 'Input',
        componentProps: {
            maxLength: 50
        },
        rules: [{ type: 'email', message: t('router.system.userManagement.regEmail'), trigger: 'change', }],
    },
    {
        field: 'sex',
        label: t('router.common.sex'),
        component: 'RadioGroup',
        defaultValue: '1',
    },
    {
        field: 'status',
        label: t('router.common.status'),
        component: 'RadioGroup',
        defaultValue: '1',
    },
    {
        field: 'sort',
        label: t('router.common.sort'),
        component: 'InputNumber',
        required: true,
        defaultValue: '1',
        componentProps: {
            min: 1,
            style: { width: '100%' }
        },
    },
];