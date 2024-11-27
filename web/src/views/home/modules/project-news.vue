<script setup lang="ts">
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';

import { I18nHome } from '@/constants/i18n';
import pkg from '~/package.json';

defineOptions({
  name: 'ProjectNews',
});

type Commit = {
  node_id: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
};

const loading = ref(false);
const commitList = ref<Commit[]>([]);

// 请求 github 日志
const fetchGithubLog = async () => {
  loading.value = true;
  const response = await fetch('https://api.github.com/repos/baiwumm/Vue3-Admin/commits?page=1&per_page=10');
  if (response.status === 200) {
    commitList.value = await response.json();
  }
  loading.value = false;
};

onMounted(() => {
  fetchGithubLog();
});
</script>

<template>
  <ACard :title="I18nHome('projectNews.title')" :bordered="false" :loading="loading">
    <template #extra>
      <a class="text-primary" :href="pkg.homepage" target="_blank" rel="noopener noreferrer">
        {{ I18nHome('projectNews.moreNews') }}
      </a>
    </template>
    <ATimeline>
      <ATimelineItem v-for="item in commitList" :key="item.node_id">
        <ASpace direction="vertical">
          <a class="text-primary" :href="item.html_url" target="_blank" rel="noopener noreferrer">
            {{ item.commit.message }}
          </a>
          <ATypographyText type="secondary">
            {{ dayjs(item.commit.author.date).format('YYYY-MM-DD HH:mm:ss') }}
          </ATypographyText>
        </ASpace>
      </ATimelineItem>
    </ATimeline>
  </ACard>
</template>
