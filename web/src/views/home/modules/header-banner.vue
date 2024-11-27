<script setup lang="ts">
import { get, isEmpty, toString } from 'lodash-es';
import { computed, onMounted, ref } from 'vue';

import { I18nHome } from '@/constants/i18n';
import { useAuthStore } from '@/store/modules/auth';
import { timeFix, welcomeWords } from '@/utils';

defineOptions({
  name: 'HeaderBanner',
});

const authStore = useAuthStore();

const weatherInfo = ref({});

interface StatisticData {
  id: number;
  title: string;
  value: string;
}

const statisticData = computed<StatisticData[]>(() => [
  {
    id: 0,
    title: I18nHome('projectCount'),
    value: '25',
  },
  {
    id: 1,
    title: I18nHome('todo'),
    value: '4/16',
  },
  {
    id: 2,
    title: I18nHome('message'),
    value: '12',
  },
]);

// 获取实时天气信息
const fetchWeatherInfo = async () => {
  // https://www.seniverse.com/
  const apiKey = 'Sdcp14pKMKm0XNAMY'; // 心知天气 密钥
  const response = await fetch(`https://api.seniverse.com/v3/weather/now.json?key=${apiKey}&location=ip`);
  if (toString(response.status) === import.meta.env.VITE_SERVICE_SUCCESS_CODE) {
    const result = get(await response.json(), 'results.[0]');
    weatherInfo.value = result;
  }
};

onMounted(() => {
  fetchWeatherInfo();
});
</script>

<template>
  <ACard :bordered="false" class="card-wrapper">
    <ARow :gutter="[16, 16]">
      <ACol :span="24" :md="18">
        <div class="flex-y-center">
          <SoybeanAvatar />
          <div class="pl-12px">
            <h3 class="text-18px font-semibold">
              {{ `${timeFix()}，${authStore.userInfo.cnName}，${welcomeWords()}！` }}
            </h3>
            <p v-if="!isEmpty(weatherInfo)" class="text-#999 leading-30px">
              {{ get(weatherInfo, 'location.name', '') }}，今日天气{{ get(weatherInfo, 'now.text', '') }}，{{
                get(weatherInfo, 'now.temperature', 0)
              }}℃！
            </p>
          </div>
        </div>
      </ACol>
      <ACol :span="24" :md="6">
        <ASpace class="w-full justify-end" :size="24">
          <AStatistic v-for="item in statisticData" :key="item.id" class="whitespace-nowrap" v-bind="item" />
        </ASpace>
      </ACol>
    </ARow>
  </ACard>
</template>

<style scoped></style>
