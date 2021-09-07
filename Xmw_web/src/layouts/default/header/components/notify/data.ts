import { getNewsResultModel } from '/@/api/integrated/model/newsModel'

export interface TabItem {
    tabKey: string;
    name: string;
    total: number;
    list: getNewsResultModel[];
}

export const tabListData: TabItem[] = [
    {
        tabKey: 'news',
        name: '新闻',
        total: 0,
        list: [],
    },
    {
        tabKey: 'announcement',
        name: '公告',
        total: 0,
        list: [],
    }
];
