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
    "https://api.github.com/repos/baiwumm/Vue3-Admin/commits?page=1&per_page=5",
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
    class="card-wrapper"
  >
    <template #extra>
      <a class="text-primary" :href="pkg.homepage" target="_blank">{{
        $t("page.home.projectNews.moreNews")
      }}</a>
    </template>
    <AList :data-source="commitList" :loading="loading">
      <template #renderItem="{ item }">
        <AListItem>
          <AListItemMeta
            :description="
              dayjs(item.commit.author.date).format('YYYY-MM-DD HH:mm:ss')
            "
          >
            <template #avatar>
              <SoybeanAvatar class="size-48px!" />
            </template>
            <template #title>
              <a class="text-primary" :href="item.html_url" target="_blank">{{
                item.commit.message
              }}</a>
            </template>
          </AListItemMeta>
        </AListItem>
      </template>
    </AList>
  </ACard>
</template>

<style scoped></style>
