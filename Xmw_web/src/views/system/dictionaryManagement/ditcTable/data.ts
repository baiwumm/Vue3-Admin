import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n();
export const columns: BasicColumn[] = [
    {
        title: t('router.system.dictionaryManagement.dictName'),
        dataIndex: 'dict_name',
    },
    {
        title: t('router.system.dictionaryManagement.dictCoding'),
        dataIndex: 'dict_coding',
        slots: { customRender: 'dict_coding' },
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
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'dict_name',
        label: t('router.system.dictionaryManagement.dictName'),
        component: 'Input',
        componentProps: {
            maxLength: 32
        },
    },
    {
        field: 'dict_coding',
        label: t('router.system.dictionaryManagement.dictCoding'),
        component: 'Input',
        componentProps: {
            maxLength: 32
        },
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'dict_name',
        label: t('router.system.dictionaryManagement.dictName'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            maxLength: 32,

        },
    },
    {
        field: 'dict_coding',
        label: t('router.system.dictionaryManagement.dictCoding'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: {
            maxLength: 32
        },
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
