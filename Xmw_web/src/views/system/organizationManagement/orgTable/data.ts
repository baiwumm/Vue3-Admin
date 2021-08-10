import { BasicColumn, FormSchema } from '/@/components/Table';
import { getOrganizationTree } from '/@/api/system/organizationManagement'; // 引入组织树接口
import { getUserList } from '/@/api/system/userManagement'; // 用户接口
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n();
export const columns: BasicColumn[] = [
    {
        title: t('router.system.organizationManagement.orgName'),
        dataIndex: 'org_name',
    },
    {
        title: t('router.system.organizationManagement.orgCode'),
        dataIndex: 'org_code',
    },
    {
        title: t('router.system.organizationManagement.orgType'),
        dataIndex: 'org_type',
        slots: { customRender: 'org_type' },
    },
    {
        title: t('router.system.organizationManagement.leader'),
        dataIndex: 'leader',
        customRender: ({ text }) => {
            return text || '--'
        },
    },
    {
        title: t('router.common.status'),
        dataIndex: 'status',
        slots: { customRender: 'status' },
    },
    {
        title: t('router.common.remark'),
        dataIndex: 'remark',
    },
    {
        title: t('router.common.createTime'),
        dataIndex: 'create_time',
        sorter: true,
    }

];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'org_name',
        label: t('router.system.organizationManagement.orgName'),
        component: 'Input',
        componentProps: {
            maxLength: 32
        },
    },
    {
        field: 'org_code',
        label: t('router.system.organizationManagement.orgCode'),
        component: 'Input',
        componentProps: {
            maxLength: 32
        },
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'parent_id',
        component: 'ApiTreeSelect',
        label: t('router.system.organizationManagement.orgSuperior'),
        componentProps: {
            api: getOrganizationTree,
            params: {},
            replaceFields: {
                title: 'org_name',
                key: 'org_id',
                value: 'org_id',
            },
        },
        colProps: { lg: 24, md: 24 },
    },
    {
        field: 'leader',
        label: t('router.system.organizationManagement.leader'),
        component: 'ApiSelect',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            api: getUserList,
            params: { current: 1, pageSize: 9999 },
            resultField: 'records',
            labelField: 'cn_name',
            valueField: 'user_id',
        }
    },
    {
        field: 'org_name',
        label: t('router.system.organizationManagement.orgName'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            maxLength: 32,
            showCount: true
        },
    },
    {
        field: 'org_code',
        label: t('router.system.organizationManagement.orgCode'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            maxLength: 32
        },
    },
    {
        field: 'org_type',
        label: t('router.system.organizationManagement.orgType'),
        component: 'RadioButtonGroup',
        colProps: { lg: 14, md: 14 },
        defaultValue: '1',
        required: true,
    },
    {
        field: 'status',
        label: t('router.common.status'),
        component: 'RadioGroup',
        colProps: { lg: 10, md: 10 },
        required: true,
        defaultValue: '1'
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
    {
        label: t('router.common.remark'),
        field: 'remark',
        component: 'InputTextArea',
        colProps: { lg: 24, md: 24 },
        componentProps: {
            rows: 4,
            maxLength: 200
        },
    },
];
