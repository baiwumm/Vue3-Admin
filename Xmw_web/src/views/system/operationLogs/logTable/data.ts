import { BasicColumn } from '/@/components/Table';
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
        title: '操作',
        dataIndex: 'content'
    },
    {
        title: '客户端ip',
        dataIndex: 'ip'
    },
    {
        title: '路由',
        dataIndex: 'path'
    },
    {
        title: '请求地址',
        dataIndex: 'api_url'
    },
    {
        title: '代理',
        dataIndex: 'user_agent'
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
    }
]