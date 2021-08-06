import { BasicColumn, FormSchema } from '/@/components/Table';
import { getOrganizationTree } from '/@/api/system/organizationManagement'; // 引入组织树接口
import { getPostTree } from '/@/api/system/postManagement'; // 引入岗位树接口
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n();
export const columns: BasicColumn[] = [
    {
        title: t('router.system.postManagement.name'),
        dataIndex: 'post_name',
    },
    {
        title: t('router.system.postManagement.org'),
        dataIndex: 'org_name'
    },
    {
        title: t('router.common.status'),
        dataIndex: 'status',
        width: 80,
        slots: { customRender: 'status' },
    },
    {
        title: t('router.common.sort'),
        dataIndex: 'sort',
        width: 80,
        defaultHidden: true
    },
    {
        title: t('router.common.remark'),
        dataIndex: 'remark'
    },
    {
        title: t('router.common.createTime'),
        dataIndex: 'create_time'
    },
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'post_name',
        label: t('router.system.postManagement.name'),
        component: 'Input',
        componentProps: {
            maxLength: 32
        },
    },
    {
        field: 'org_id',
        component: 'ApiTreeSelect',
        label: t('router.system.postManagement.org'),
        componentProps: {
            api: getOrganizationTree,
            replaceFields: {
                title: 'org_name',
                key: 'org_id',
                value: 'org_id',
            },
        },
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'post_name',
        label: t('router.system.postManagement.name'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            maxLength: 32
        },
    },
    {
        field: 'parent_id',
        component: 'ApiTreeSelect',
        label: t('router.system.postManagement.higher'),
        componentProps: {
            api: getPostTree,
            params: {},
            replaceFields: {
                title: 'post_name',
                key: 'post_id',
                value: 'post_id',
            },
        },
        colProps: { lg: 24, md: 24 },
    },
    {
        field: 'org_id',
        component: 'ApiTreeSelect',
        label: t('router.system.postManagement.org'),
        required: true,
        componentProps: {
            api: getOrganizationTree,
            replaceFields: {
                title: 'org_name',
                key: 'org_id',
                value: 'org_id',
            },
        },
        colProps: { lg: 24, md: 24 },
    },
    {
        field: 'status',
        label: t('router.common.status'),
        component: 'RadioGroup',
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
