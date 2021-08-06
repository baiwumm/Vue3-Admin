import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n();
// 表格列配置项
export const columns: BasicColumn[] = [
    {
        title: t('router.system.internationalManagement.internation_name'),
        dataIndex: 'internation_name'
    },
    {
        title: t('router.system.internationalManagement.zh_CN'),
        dataIndex: 'zh_CN'
    },
    {
        title: t('router.system.internationalManagement.en'),
        dataIndex: 'en'
    },
    {
        title: t('router.common.founder'),
        dataIndex: 'cn_name'
    },
    {
        title: t('router.common.createTime'),
        dataIndex: 'create_time'
    }
]

// 表格表单搜索
export const searchFormSchema: FormSchema[] = [
    {
        field: 'internation_name',
        label: t('router.system.internationalManagement.internation_name'),
        component: 'Input',
        componentProps: {
            maxLength: 100
        },
    },
    {
        field: 'zh_CN',
        label: t('router.system.internationalManagement.zh_CN'),
        component: 'Input',
        componentProps: {
            maxLength: 100
        },
    }
]

export const dataFormSchema: FormSchema[] = [
    {
        field: 'internation_name',
        label: t('router.system.internationalManagement.internation_name'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            maxLength: 100
        },
    },
    {
        field: 'zh_CN',
        label: t('router.system.internationalManagement.zh_CN'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            maxLength: 100
        },
    },
    {
        field: 'en',
        label: t('router.system.internationalManagement.en'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            maxLength: 500
        },
    },
]