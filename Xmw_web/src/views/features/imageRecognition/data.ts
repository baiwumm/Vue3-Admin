import { BasicColumn } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const { t } = useI18n();
// 表格列配置项
export const columns: BasicColumn[] = [
    {
        title: t('router.features.imageRecognition.category'),
        dataIndex: 'root'
    },
    {
        title: t('router.features.imageRecognition.keyword'),
        dataIndex: 'keyword'
    },
    {
        title: t('router.features.imageRecognition.recognition'),
        dataIndex: 'score'
    }
]

