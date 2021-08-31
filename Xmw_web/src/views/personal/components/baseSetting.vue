<template>
    <Card :bordered="false">
        <div :class="prefixCls">
            <Tabs tab-position="left" class="h-full">
                <TabPane v-for="pane in settingTabs" :key="pane.key" :tab="pane.name">
                    <!-- 动态引入组件 -->
                    <UserSetting v-if="pane.key === '1'" />
                    <ChangePsd v-if="pane.key === '2'" />
                    <!-- <component :is="pane.component"></component> -->
                </TabPane>
            </Tabs>
        </div>
    </Card>
</template>

<script lang="ts" setup>
import { Card, Tabs, TabPane } from 'ant-design-vue';
import UserSetting from './userSetting.vue';
import ChangePsd from './changePsd.vue';
import { settingTabs } from './data';
const prefixCls = 'account-setting'
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