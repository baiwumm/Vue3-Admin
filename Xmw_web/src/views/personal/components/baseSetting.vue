<template>
  <Card :bordered="false">
    <div :class="prefixCls">
      <Tabs tab-position="left" class="h-full">
        <TabPane v-for="pane in settingTabs" :key="pane.key" :tab="pane.name">
          <!-- 动态引入组件 -->
          <component :is="pane.component"></component>
        </TabPane>
      </Tabs>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Card, Tabs } from 'ant-design-vue';
import UserSetting from './userSetting.vue';
import ChangePsd from './changePsd.vue';
import { settingTabs } from './data';
export default defineComponent({
  name: 'baseSetting',
  components: {
    Card,
    Tabs,
    TabPane: Tabs.TabPane,
    UserSetting,
    ChangePsd,
  },
  setup() {
    return {
      prefixCls: 'account-setting',
      settingTabs,
    };
  },
});
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