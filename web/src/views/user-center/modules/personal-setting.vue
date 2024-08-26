<script setup lang="ts">
import { ref } from "vue";
import BasicSetting from "./basic-setting.vue";
import { $t } from "@/locales";

defineOptions({
  name: "PersonalSetting",
});

const activeKey = ref("1");
</script>

<template>
  <ACard>
    <ATabs v-model:activeKey="activeKey" tab-position="left" animat>
      <ATabPane :tab="$t('page.userCenter.basicSetting')" key="1">
        <BasicSetting />
      </ATabPane>
    </ATabs>
  </ACard>
</template>
