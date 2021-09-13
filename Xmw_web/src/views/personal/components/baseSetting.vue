<template>
    <Card :bordered="false">
        <div :class="prefixCls">
            <Tabs tab-position="left" class="h-full">
                <TabPane v-for="pane in settingTabs" :key="pane.key" :tab="pane.name">
                    <!-- 动态引入组件 -->
                    <UserSetting v-if="pane.key === '1'" />
                    <ChangePsd v-if="pane.key === '2'" />
                    <!-- 动态组件不生效，原因暂不明 -->
                    <!-- <component :is="pane.component"></component> -->
                </TabPane>
            </Tabs>
        </div>
    </Card>
</template>

<script lang="ts" setup>
import { Card, Tabs } from 'ant-design-vue'; // 引入antd组件
import UserSetting from './userSetting.vue'; // 引入userSetting组件
import ChangePsd from './changePsd.vue'; // 引入changePsd组件
import { settingTabs } from './data'; // 引入tabs配置
const prefixCls = 'account-setting' // 类名前缀
const TabPane = Tabs.TabPane
</script>
<style lang="less">
.account-setting {
    margin: 12px;
    background-color: @component-background;

    .base-title {
        padding-left: 0;
    }

    .ant-tabs-tab-active {
        background-color: @item-active-bg;
    }
}
</style>