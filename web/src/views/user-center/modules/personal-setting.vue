<script setup lang="ts">
import { ref } from 'vue';

import { I18nUserCenter } from '@/constants/i18n';
import { PERSONAL_SETTING } from '@/enum';

import BasicSetting from './basic-setting.vue';
import ChangePassword from './change-password.vue';
import SecuritySetting from './security-setting.vue';

defineOptions({
  name: 'PersonalSetting',
});

// 解构枚举
const { BASIC_SETTING, SECURITY_SETTING, CHANGE_PASSWORD } = PERSONAL_SETTING;

const activeKey = ref<string | number>(BASIC_SETTING);

// 切换面板回调
const changeTabs = (key: string | number) => (activeKey.value = key);
</script>

<template>
  <ACard>
    <ATabs v-model:activeKey="activeKey" tab-position="left" @change="changeTabs">
      <ATabPane :key="BASIC_SETTING" :tab="I18nUserCenter(`title.${BASIC_SETTING}`)">
        <BasicSetting />
      </ATabPane>
      <ATabPane :key="SECURITY_SETTING" :tab="I18nUserCenter(`title.${SECURITY_SETTING}`)">
        <SecuritySetting @change-tabs="changeTabs" />
      </ATabPane>
      <ATabPane :key="CHANGE_PASSWORD" :tab="I18nUserCenter(`title.${CHANGE_PASSWORD}`)">
        <ChangePassword />
      </ATabPane>
    </ATabs>
  </ACard>
</template>
