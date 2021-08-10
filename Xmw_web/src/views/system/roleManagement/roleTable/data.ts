import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/system/roleManagement';
import { useMessage } from '/@/hooks/web/useMessage';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n();
export const columns: BasicColumn[] = [
    {
        title: t('router.system.roleManagement.roleName'),
        dataIndex: 'role_name'
    },
    {
        title: t('router.system.roleManagement.roleCode'),
        dataIndex: 'role_code'
    },
    {
        title: t('router.common.status'),
        dataIndex: 'status',
        customRender: ({ record }) => {
            if (!Reflect.has(record, 'pendingStatus')) {
                record.pendingStatus = false;
            }
            return h(Switch, {
                checked: record.status === '1',
                checkedChildren: t('router.system.roleManagement.enabled'),
                unCheckedChildren: t('router.system.roleManagement.disabled'),
                loading: record.pendingStatus,
                onChange(checked: boolean) {
                    record.pendingStatus = true;
                    const newStatus = checked ? '1' : '0';
                    const { createMessage } = useMessage();
                    let params = {
                        role_id: record.role_id, status: newStatus, role_name: record.role_name
                    }
                    setRoleStatus(params)
                        .then(() => {
                            record.status = newStatus;
                            createMessage.success(t('router.system.roleManagement.statusSuccess'));
                        })
                        .catch(() => {
                            createMessage.error(t('router.system.roleManagement.statusFailed'));
                        })
                        .finally(() => {
                            record.pendingStatus = false;
                        });
                },
            });
        },
    },
    {
        title: t('router.common.createTime'),
        dataIndex: 'create_time'
    },
    {
        title: t('router.common.remark'),
        dataIndex: 'remark',
    },
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'roleNme',
        label: t('router.system.roleManagement.roleName'),
        component: 'Input',
        componentProps: {
            maxLength: 32
        },
    },
    {
        field: 'status',
        label: t('router.common.status'),
        component: 'Select',
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'role_name',
        label: t('router.system.roleManagement.roleName'),
        required: true,
        colProps: { lg: 24, md: 24 },
        component: 'Input',
        componentProps: {
            maxLength: 32
        },
    },
    {
        field: 'role_code',
        label: t('router.system.roleManagement.roleCode'),
        required: true,
        colProps: { lg: 24, md: 24 },
        component: 'Input',
        componentProps: {
            maxLength: 32
        },
    },
    {
        field: 'status',
        label: t('router.common.status'),
        component: 'RadioGroup',
        defaultValue: '1',
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
    {
        label: t('router.system.roleManagement.permission'),
        field: 'menu_role',
        slot: 'menu_role',
        colProps: { lg: 24, md: 24 },
        component: 'Input'
    },
];