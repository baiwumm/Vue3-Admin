<script setup lang="ts">
import { $t } from '@/locales';

import GraphicCode from './modules/graphic-code.vue';

// 国际化
const locales = (field: string) => $t(`page.features.captcha.${field}`);
</script>

<template>
  <ASpace direction="vertical" size="middle">
    <ACard :bordered="false" :body-style="{ padding: 0 }">
      <APageHeader :title="$t('route.features_captcha')">{{ locales('subTitle') }}</APageHeader>
    </ACard>
    <ARow :gutter="20">
      <!-- 图形验证码 -->
      <ACol :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
        <ACard :bordered="false" :title="locales('graphicCode')">
          <GraphicCode :locales="locales" />
        </ACard>
      </ACol>
    </ARow>
  </ASpace>
</template>
