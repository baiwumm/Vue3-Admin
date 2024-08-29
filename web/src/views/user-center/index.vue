<script setup lang="ts">
import PersonalInfo from './modules/personal-info.vue';
import PersonalSetting from './modules/personal-setting.vue';
</script>

<template>
  <div>
    <ARow :gutter="[16, 16]">
      <ACol :lg="24" :xl="10" :xxl="8">
        <PersonalInfo />
      </ACol>
      <ACol :lg="24" :xl="14" :xxl="16">
        <PersonalSetting />
      </ACol>
    </ARow>
  </div>
</template>
