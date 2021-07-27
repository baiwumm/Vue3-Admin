import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/system/roleManagement';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
    {
        title: '角色名称',
        dataIndex: 'role_name'
    },
    {
        title: '角色编码',
        dataIndex: 'role_code'
    },
    {
        title: '状态',
        dataIndex: 'status',
        customRender: ({ record }) => {
            if (!Reflect.has(record, 'pendingStatus')) {
                record.pendingStatus = false;
            }
            return h(Switch, {
                checked: record.status === '1',
                checkedChildren: '已启用',
                unCheckedChildren: '已禁用',
                loading: record.pendingStatus,
                onChange(checked: boolean) {
                    record.pendingStatus = true;
                    const newStatus = checked ? '1' : '0';
                    const { createMessage } = useMessage();
                    let params = {
                        role_id: record.role_id, status: newStatus
                    }
                    setRoleStatus(params)
                        .then(() => {
                            record.status = newStatus;
                            createMessage.success(`已成功修改角色状态`);
                        })
                        .catch(() => {
                            createMessage.error('修改角色状态失败');
                        })
                        .finally(() => {
                            record.pendingStatus = false;
                        });
                },
            });
        },
    },
    {
        title: '创建时间',
        dataIndex: 'create_time'
    },
    {
        title: '备注',
        dataIndex: 'remark',
    },
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'roleNme',
        label: '角色名称',
        component: 'Input',
        colProps: { span: 8 },
        componentProps: {
            placeholder: '请输入角色名称',
            maxLength: 32
        },
    },
    {
        field: 'status',
        label: '状态',
        component: 'Select',
        colProps: { span: 8 },
    },
];

export const dataFormSchema: FormSchema[] = [
    {
        field: 'role_name',
        label: '角色名称',
        required: true,
        colProps: { lg: 24, md: 24 },
        component: 'Input',
        componentProps: {
            placeholder: '请输入角色名称',
            maxLength: 32
        },
    },
    {
        field: 'role_code',
        label: '角色编码',
        required: true,
        colProps: { lg: 24, md: 24 },
        component: 'Input',
        componentProps: {
            placeholder: '请输入角色编码',
            maxLength: 32
        },
    },
    {
        field: 'status',
        label: '状态',
        component: 'RadioGroup',
        defaultValue: '1',
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
    {
        label: '菜单权限',
        field: 'menu_role',
        slot: 'menu_role',
        colProps: { lg: 24, md: 24 },
        component: 'Input'
    },
];