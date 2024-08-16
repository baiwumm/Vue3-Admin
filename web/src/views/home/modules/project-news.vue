<script setup lang="ts">
import { onMounted, ref } from "vue";
import { $t } from "@/locales";
import dayjs from "dayjs";
import pkg from "~/package.json";

defineOptions({
  name: "ProjectNews",
});

const loading = ref(false);
let commitList = ref([]);

// 请求 github 日志
const fetchGithubLog = async () => {
  loading.value = true;
  const response = await fetch(
    "https://api.github.com/repos/baiwumm/Vue3-Admin/commits?page=1&per_page=10",
  );
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
  <ACard
    :title="$t('page.home.projectNews.title')"
    :bordered="false"
    :loading="loading"
  >
    <template #extra>
      <a class="text-primary" :href="pkg.homepage" target="_blank">{{
        $t("page.home.projectNews.moreNews")
      }}</a>
    </template>
    <ATimeline>
      <ATimelineItem v-for="item in commitList">
        <ASpace direction="vertical">
          <a class="text-primary" :href="item.html_url" target="_blank">{{
            item.commit.message
          }}</a>
          <ATypographyText type="secondary">
            {{ dayjs(item.commit.author.date).format("YYYY-MM-DD HH:mm:ss") }}
          </ATypographyText>
        </ASpace>
      </ATimelineItem>
    </ATimeline>
  </ACard>
</template>
