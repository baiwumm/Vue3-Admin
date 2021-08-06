import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n();
import { getUserList } from '/@/api/system/userManagement'; // 用户接口
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
        title: t('router.common.action'),
        dataIndex: 'content'
    },
    {
        title: t('router.system.operationLogs.clientIp'),
        dataIndex: 'ip'
    },
    {
        title: t('router.system.operationLogs.path'),
        dataIndex: 'path'
    },
    {
        title: t('router.system.operationLogs.requestUrl'),
        dataIndex: 'api_url'
    },
    {
        title: t('router.system.operationLogs.userAgent'),
        dataIndex: 'user_agent'
    },
    {
        title: t('router.common.createTime'),
        dataIndex: 'create_time',
    }
]

export const searchFormSchema: FormSchema[] = [
    {
        field: 'user_id',
        label: t('router.common.userName'),
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
        field: 'create_time',
        label: t('router.common.createTime'),
        component: 'RangePicker'
    },
];