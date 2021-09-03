import { FormSchema } from '/@/components/Form'; // 引入form 组件
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n(); // 国际化函数
import cities from '/@/views/system/userManagement/userTable/cities.json' // 地址
import { getOrganizationTree } from '/@/api/system/organizationManagement'; // 引入组织树接口
import { getPostTree } from '/@/api/system/postManagement'; // 引入岗位树接口
/**
 * @description: tabs配置项
 * @param {*}
 * @return {*}
 */
export const settingTabs = [
    {
        key: '1',
        name: t('router.common.baseSetting'),
        component: 'UserSetting',
    },
    {
        key: '2',
        name: t('router.common.changePsd'),
        component: 'ChangePsd',
    }
];

/**
 * @description: 修改密码表单
 * @param {*}
 * @return {*}
 */
export const pwdForm: FormSchema[] = [
    {
        field: 'passwordOld',
        label: t('router.system.userManagement.currentPsd'),
        component: 'InputPassword',
        required: true,
        rules: [
            {
                required: true,
                validator: async (rule, value) => {
                    if (!value) {
                        return Promise.reject(t('sys.login.password'));
                    } else {
                        if (value.length < 6 || value.length > 12) {
                            return Promise.reject(t('router.system.userManagement.pwdLen'));
                        }
                    }
                    return Promise.resolve();
                },
                trigger: 'change',
            },
        ],
    },
    {
        field: 'passwordNew',
        label: t('router.system.userManagement.newPsd'),
        component: 'StrengthMeter',
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
                            return Promise.reject(t('router.system.userManagement.pwdLen'));
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
                        if (value !== values.passwordNew) {
                            return Promise.reject(t('router.system.userManagement.regConfirmPsd'));
                        }
                        return Promise.resolve();
                    },
                    trigger: 'change',
                },
            ];
        },
    },
];

export const baseSetschemas: FormSchema[] = [
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
                labelInValue: true,
                replaceFields: {
                    title: 'org_name',
                    key: 'org_id',
                    value: 'org_id',
                },
                onChange: async (e: any) => {
                    let citiesOptions = await getPostTree({ org_id: e.value })
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
            labelInValue: true,
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
        label: t('router.system.userManagement.motto'),
        field: 'motto',
        component: 'InputTextArea',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            rows: 4,
            maxLength: 200
        },
    },
];
