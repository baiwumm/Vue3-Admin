<script setup lang="ts">
import { get, take, toString } from 'lodash-es';
import { onMounted, ref, watch } from 'vue';

import { I18nHome } from '@/constants/i18n';
import { getJuejinList } from '@/service/api';

defineOptions({
  name: 'BlogLog',
});

const loading = ref(false);
const total = ref(0);
const articleList = ref([]);

// 请求掘金列表
const fetchJuejinList = async (cursor = '0') => {
  loading.value = true;
  const { data, error } = await getJuejinList({
    sort_type: 2,
    user_id: '1917147257534279',
    cursor,
  });
  if (!error) {
    total.value = get(data, 'total', 0);
    articleList.value = take(get(data, 'list', []), 5);
    Object.assign(articleList, data);
  }
  loading.value = false;
};

// 切换分页回调
const pagination = {
  align: 'start',
  pageSize: 5,
  showSizeChanger: false,
  total: total.value,
  onChange: (page: number, pageSize: number) => {
    fetchJuejinList(toString(pageSize * (page - 1)));
  },
};

watch(total, newVal => {
  pagination.total = newVal;
});

onMounted(() => {
  fetchJuejinList();
});
</script>

<template>
  <ACard
    :title="I18nHome('blogLog')"
    :bordered="false"
    class="h-full flex-col-stretch card-wrapper"
    :body-style="{ flex: 1, overflow: 'hidden' }"
  >
    <AList item-layout="vertical" size="large" :pagination="pagination" :data-source="articleList" :loading="loading">
      <template #renderItem="{ item }">
        <AListItem :key="item.article_id">
          <AListItemMeta>
            <template #title>
              <a :href="`https://juejin.cn/post/${item.article_id}`" target="_blank" rel="noopener noreferrer">
                {{ item.article_info.title }}
              </a>
            </template>
            <template #avatar>
              <AAvatar :src="item.author_user_info.avatar_large" class="size-48px!" />
            </template>
            <template #description>
              <ASpace wrap>
                <ATag v-for="tag in item.tags" :key="tag" :bordered="false">{{ tag.tag_name }}</ATag>
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
