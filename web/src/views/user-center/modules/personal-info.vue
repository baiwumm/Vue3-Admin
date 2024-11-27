<script setup lang="ts">
import { codeToText } from 'element-china-area-data';
import { assign, forEach } from 'lodash-es';
import { ref, watch } from 'vue';

import FigureLabels from '@/components/custom/figure-labels.vue';
import { I18nUser } from '@/constants/i18n';
import { $t } from '@/locales';
import { updateUserTags } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';

import PublishMessage from './publish-message.vue';

defineOptions({
  name: 'PersonalInfo',
});

type Identity = {
  icon: string;
  field: string;
  value?: string;
};

const authStore = useAuthStore();

// 获取登录用户信息
const { avatar, cnName, city, role, organization, post, address, tags } = authStore.userInfo;

// 人物标签
const userTags = ref<string[]>(tags || []);

// 获取省市区名称
const getAreaName = () => {
  let result: string = '';
  forEach(city, (code: string) => {
    result += codeToText[code];
  });
  return result + address;
};

// 身份信息
const identityOptions: Identity[] = [
  {
    icon: 'carbon:user-role',
    field: 'roleId',
    value: role?.name,
  },
  {
    icon: organization?.icon || 'ri:exchange-2-line',
    field: 'orgId',
    value: organization?.name,
  },
  {
    icon: 'ri:contacts-book-3-line',
    field: 'postId',
    value: post?.name,
  },
  {
    icon: 'ri:map-pin-2-line',
    field: 'address',
    value: getAreaName(),
  },
];

// 更新用户标签
const fetchUpdateUserTags = async () => {
  const { error } = await updateUserTags({
    tags: userTags.value,
  });

  if (!error) {
    // 更新仓库信息
    assign(authStore.userInfo, { tags: userTags.value });
    window.$message?.success($t(`common.editSuccess`));
  } else {
    userTags.value.pop();
  }
};

watch(userTags, () => {
  fetchUpdateUserTags();
});
</script>

<template>
  <ASpace direction="vertical" class="w-full" :size="16">
    <ACard>
      <ASpace direction="vertical" align="center" class="w-full">
        <AAvatar :size="128" :src="avatar" />
        <ATypographyTitle :level="3">{{ cnName }}</ATypographyTitle>
      </ASpace>
      <ADescriptions :column="1" size="small" bordered>
        <ADescriptionsItem v-for="{ icon, field, value } in identityOptions" :key="field">
          <template #label>
            <ASpace align="center">
              <SvgIcon :icon="icon" class="text-base" />
              {{ I18nUser(field) }}
            </ASpace>
          </template>
          <ATag :bordered="false">
            <ATypographyText>{{ value }}</ATypographyText>
          </ATag>
        </ADescriptionsItem>
      </ADescriptions>
      <ADivider orientation="left">{{ I18nUser('tags') }}</ADivider>
      <FigureLabels v-model:value="userTags" />
    </ACard>
    <!-- 发布文章列表 -->
    <PublishMessage />
  </ASpace>
</template>
