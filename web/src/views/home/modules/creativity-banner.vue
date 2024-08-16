<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { $t } from "@/locales";
import { getJuejinList } from "@/service/api";
import { toString, take, get } from "lodash-es";

defineOptions({
  name: "CreativityBanner",
});

const loading = ref(false);
const total = ref(0);
let articleList = ref([]);

// 请求掘金列表
const fetchJuejinList = async (cursor = "0") => {
  loading.value = true;
  const { data, error } = await getJuejinList({
    sort_type: 2,
    user_id: "1917147257534279",
    cursor,
  });
  if (!error) {
    total.value = get(data, "total", 0);
    articleList.value = take(get(data, "list", []), 5);
    Object.assign(articleList, data);
  }
  loading.value = false;
};

// 切换分页回调
const pagination = {
  align: "start",
  pageSize: 5,
  showSizeChanger: false,
  total: total.value,
  onChange: (page: number, pageSize: number) => {
    fetchJuejinList(toString(pageSize * (page - 1)));
  },
};

watch(total, (newVal) => {
  pagination.total = newVal;
});

onMounted(() => {
  fetchJuejinList();
});
</script>

<template>
  <ACard
    :title="$t('page.home.creativity')"
    :bordered="false"
    class="h-full flex-col-stretch card-wrapper"
    :body-style="{ flex: 1, overflow: 'hidden' }"
  >
    <AList
      item-layout="vertical"
      size="large"
      :pagination="pagination"
      :data-source="articleList"
      :loading="loading"
    >
      <template #renderItem="{ item }">
        <AListItem :key="item.article_id">
          <AListItemMeta>
            <template #title>
              <a
                :href="`https://juejin.cn/post/${item.article_id}`"
                target="_blank"
                >{{ item.article_info.title }}</a
              >
            </template>
            <template #avatar>
              <SoybeanAvatar class="size-48px!" />
            </template>
            <template #description>
              <ASpace wrap>
                <ATag :bordered="false" v-for="tag in item.tags">{{
                  tag.tag_name
                }}</ATag>
              </ASpace>
            </template>
          </AListItemMeta>
          <ATypographyText type="secondary">
            {{ item.article_info.brief_content }}
          </ATypographyText>
        </AListItem>
      </template>
    </AList>
  </ACard>
</template>
