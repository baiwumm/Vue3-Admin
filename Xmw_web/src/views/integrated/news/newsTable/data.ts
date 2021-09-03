import { BasicColumn, FormSchema } from '/@/components/Table'; // 表格组件
import { h } from 'vue';  // 引入 Composition-API
import { Tinymce } from '/@/components/Tinymce/index'; // 引入Tinymce编辑器
import { setNewsPlacedTop } from '/@/api/integrated/news'
import { useMessage } from '/@/hooks/web/useMessage';
import { Switch } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n(); // 国际化函数
// 表格列配置项
export const columns: BasicColumn[] = [
    {
        title: t('router.integrated.news.author'),
        dataIndex: 'author_name'
    },
    {
        title: t('router.common.title'),
        dataIndex: 'title',
        slots: { customRender: 'title' },
    },
    {
        title: t('router.common.status'),
        dataIndex: 'status',
        slots: { customRender: 'status' },
    },
    {
        title: t('router.integrated.news.type'),
        dataIndex: 'type',
        slots: { customRender: 'type' },
    },
    {
        title: t('router.integrated.news.top'),
        dataIndex: 'placed_top',
        customRender: ({ record }) => {
            if (!Reflect.has(record, 'pendingStatus')) {
                record.pendingStatus = false;
            }
            return h(Switch, {
                checked: record.placed_top === '1',
                checkedChildren: t('router.integrated.news.isTop'),
                unCheckedChildren: t('router.integrated.news.unTop'),
                loading: record.pendingStatus,
                onChange(checked: boolean) {
                    record.pendingStatus = true;
                    const newStatus = checked ? '1' : '0';
                    const { createMessage } = useMessage();
                    let params = {
                        news_id: record.news_id, placed_top: newStatus, title: record.title
                    }
                    setNewsPlacedTop(params)
                        .then(() => {
                            record.placed_top = newStatus;
                            createMessage.success(t('router.integrated.news.topSuccess'));
                        })
                        .catch(() => {
                            createMessage.error(t('router.integrated.news.topFaild'));
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
    }
]

// 表格表单搜索
export const searchFormSchema: FormSchema[] = [
    {
        field: 'title',
        label: t('router.common.title'),
        component: 'Input',
        componentProps: { maxLength: 32 },
    },
    {
        field: 'type',
        label: t('router.integrated.news.type'),
        component: 'Select',
    },
]

export const dataFormSchema: FormSchema[] = [
    {
        field: 'title',
        label: t('router.common.title'),
        component: 'Input',
        colProps: { lg: 24, md: 24 },
        required: true,
        componentProps: { maxLength: 32 },
    },
    {
        field: 'type',
        label: t('router.system.menuManagement.menu_type'),
        component: 'RadioButtonGroup',
        defaultValue: 'news',
        colProps: { lg: 8, md: 8 },
        required: true,
    },
    {
        field: 'status',
        label: t('router.common.status'),
        colProps: { lg: 8, md: 8 },
        component: 'RadioGroup',
        defaultValue: '1',
    },
    {
        field: 'placed_top',
        label: t('router.integrated.news.top'),
        colProps: { lg: 8, md: 8 },
        component: 'RadioGroup',
        defaultValue: '0',
    },
    {
        field: 'content',
        component: 'Input',
        label: t('router.integrated.news.content'),
        colProps: { lg: 24, md: 24 },
        rules: [{ required: true }],
        render: ({ model, field }) => {
            return h(Tinymce, {
                value: model[field],
                showImageUpload: false,
                onChange: (value: string) => {
                    model[field] = value;
                },
            });
        },
    },
]