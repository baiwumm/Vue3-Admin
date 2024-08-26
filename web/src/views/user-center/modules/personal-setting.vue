<script setup lang="ts">
import { ref } from "vue";
import BasicSetting from "./basic-setting.vue";
import { $t } from "@/locales";
import SecuritySetting from "./security-setting.vue";
import { PERSONAL_SETTING } from "@/enum";

defineOptions({
  name: "PersonalSetting",
});

// 解构枚举
const { BASIC_SETTING, SECURITY_SETTING } = PERSONAL_SETTING;

const activeKey = ref<string | number>(BASIC_SETTING);

// 切换面板回调
const changeTabs = (key: string | number) => (activeKey.value = key);
</script>

<template>
  <ACard>
    <ATabs
      v-model:activeKey="activeKey"
      tab-position="left"
      @change="changeTabs"
    >
      <ATabPane
        :tab="$t(`page.userCenter.title.${BASIC_SETTING}`)"
        :key="BASIC_SETTING"
      >
        <BasicSetting />
      </ATabPane>
      <ATabPane
        :tab="$t(`page.userCenter.title.${SECURITY_SETTING}`)"
        :key="SECURITY_SETTING"
      >
        <SecuritySetting @changeTabs="changeTabs" />
      </ATabPane>
    </ATabs>
  </ACard>
</template>
