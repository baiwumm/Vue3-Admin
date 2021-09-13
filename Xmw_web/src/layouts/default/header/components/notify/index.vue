<template>
    <div :class="prefixCls">
        <Popover
            trigger="click"
            :overlayClassName="`${prefixCls}__overlay`"
            v-model:visible="showNotify"
        >
            <!-- 铃铛未读 -->
            <Badge :count="unreadyCount" :offset="[-3, 12]">
                <BellOutlined />
            </Badge>
            <!-- popover框内容 -->
            <template #content>
                <Tabs v-model:activeKey="activeKey">
                    <template v-for="item in tabListResult" :key="item.tabKey">
                        <TabPane>
                            <template #tab>{{ item.name }}（{{ item.total }}）</template>
                            <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
                            <NoticeList
                                :list="item.list"
                                :total="item.total"
                                :pageSize="pageConfig[item.tabKey].pageSize"
                                :currentPage="pageConfig[item.tabKey].current"
                                @title-click="onNoticeClick"
                                @loading-more="handlerPage"
                                :loading="loading"
                            />
                        </TabPane>
                    </template>
                </Tabs>
            </template>
        </Popover>
        <!-- 新闻公告详情页 -->
        <DetailsModal @register="registerModal" />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, unref, onBeforeMount, onBeforeUnmount } from 'vue'; // 引入 Composition-API
import { Popover, Tabs, Badge } from 'ant-design-vue'; // 引入antd组件
import { BellOutlined } from '@ant-design/icons-vue';// 引入antd图标
import NoticeList from './NoticeList.vue'; // 引入NoticeList子组件
import { useDesign } from '/@/hooks/web/useDesign';
import { getNewsList, saveAlreadyNews, getNewsUnreadyCount } from '/@/api/integrated/news'; // 新闻公告接口
import { tabListData } from './data' // 引入配置数据
import DetailsModal from './detailsModal.vue'; // 详情页面
import { useModal } from '/@/components/Modal'; // 模态框组件
import mybus from '/@/utils/eventBus'; // 引入mitt工具类
const TabPane = Tabs.TabPane

const { prefixCls } = useDesign('header-notify');
const [registerModal, { openModal }] = useModal(); // 注册模态框
const showNotify = ref<boolean>(false) // 是否显示铃铛下拉框
// 分页配置
const pageConfig = reactive({
    news: { pageSize: 5, current: 1 },
    announcement: { pageSize: 5, current: 1 }
})
const tabListResult = reactive(tabListData) // tabs配置数据
const loading = ref<boolean>(false) // 数据加载loading
const activeKey = ref<string>('news') // tabs默认项
const unreadyCount = ref<number>(0)
// 点击新闻公告标题触发回调
async function onNoticeClick(record) {
    console.log(record)
    // 打开详情页
    showNotify.value = false
    openModal(true, { record })
    // 判断消息是否已读
    if (!record.already) {
        let params = {
            news_id: record.news_id,
            title: record.title
        }
        await saveAlreadyNews(params).then(() => {
            record.already = 1
            unreadyCount.value -= 1
        })
    }
}
// 请求新闻和公告两种不同数据类型
async function initNotifyData() {
    let newsResult: any = await getNewsList(Object.assign(pageConfig.news, { type: 'news' }))
    let announcementResult: any = await getNewsList(Object.assign(pageConfig.news, { type: 'announcement' }))
    tabListResult[0].total = newsResult.totalNum
    tabListResult[0].list = newsResult.records
    tabListResult[1].total = announcementResult.totalNum
    tabListResult[1].list = announcementResult.records
}
// 切换分页触发回调
async function handlerPage(page) {
    loading.value = true
    pageConfig[activeKey.value].current = page
    let moreResult: any = await getNewsList(Object.assign(pageConfig.news, { type: activeKey.value }))
    tabListResult[unref(activeKey) === 'news' ? 0 : 1].list = moreResult.records
    loading.value = false
}
// 获取未读数量
async function initUnreadyCount() {
    await getNewsUnreadyCount().then(res => {
        unreadyCount.value = res.unreadyCount
    })
}
// 初始化数据
onMounted(() => {
    initNotifyData()
    initUnreadyCount()
})
// 监听新闻公告列表页标题点击事件
onBeforeMount(() => {
    mybus.on('notify-details', record => {
        openModal(true, { record })
    });
})
// 销毁mitt
onBeforeUnmount(() => {
    mybus.off('notify-details')
})
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-header-notify";

.@{prefix-cls} {
    padding-top: 2px;

    &__overlay {
        max-width: 360px;
    }

    .ant-tabs-content {
        width: 300px;
    }

    .ant-badge {
        font-size: 18px;

        .ant-badge-multiple-words {
            padding: 0 4px;
        }

        svg {
            width: 0.9em;
        }
    }
}
</style>
