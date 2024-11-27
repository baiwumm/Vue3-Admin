<script setup lang="ts">
import { cloneDeep, pick } from 'lodash-es';
import { computed, onMounted, reactive, ref } from 'vue';

import { I18nUser } from '@/constants/i18n';
import { useAntdForm, useFormRules } from '@/hooks/common/form';
import { $t } from '@/locales';
import { getOrganazationList, getPostList, getRoleList, updateUser } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import PersonalInfo from '@/views/system-manage/user-manage/modules/personal-info.vue';
import UserInfo from '@/views/system-manage/user-manage/modules/user-info.vue';

defineOptions({
  name: 'BasicSetting',
});

// 是否请求中
const loading = ref(false);

// 获取角色列表
const roleList = ref<Api.SystemManage.RoleManage[]>([]);
const fetchRoleList = async () => {
  const { error, data } = await getRoleList({ current: 1, size: 999 });

  if (!error) {
    roleList.value = data.records;
  }
};

// 获取组织列表
const organazationList = ref<Api.Administrative.Organization[]>([]);
const fetchOrganazationList = async () => {
  const { error, data } = await getOrganazationList();

  if (!error) {
    organazationList.value = data.records;
  }
};

// 获取岗位列表
const postList = ref<Api.Administrative.PostManage[]>([]);
const fetchPostList = async () => {
  const { error, data } = await getPostList();

  if (!error) {
    postList.value = data.records;
  }
};

const appStore = useAppStore();
const authStore = useAuthStore();

const { formRef } = useAntdForm();

const model: Api.SystemManage.SaveUserManage = reactive(
  cloneDeep(authStore.userInfo) as Api.SystemManage.SaveUserManage,
);

// 表单校验的 key
type RuleKey = Extract<
  keyof Api.SystemManage.SaveUserManage,
  'userName' | 'cnName' | 'phone' | 'email' | 'roleId' | 'orgId' | 'postId' | 'city' | 'tags' | 'avatar'
>;

const rules = computed<Record<RuleKey, App.Global.FormRule | App.Global.FormRule[]>>(() => {
  const { defaultRequiredRule, formRules } = useFormRules();

  return {
    userName: formRules.userName,
    cnName: defaultRequiredRule,
    phone: formRules.phone,
    email: formRules.email,
    roleId: defaultRequiredRule,
    orgId: defaultRequiredRule,
    postId: defaultRequiredRule,
    city: defaultRequiredRule,
    tags: { ...defaultRequiredRule, trigger: 'change' },
    avatar: defaultRequiredRule,
  };
});

// 更新 model 的值
const updateModel = (args: Partial<Api.SystemManage.SaveUserManage>) => {
  Object.assign(model, args);
};

// 提交数据
async function handleSubmit(values: Api.SystemManage.SaveUserManage) {
  loading.value = true;
  // 获取参数
  const params = {
    ...pick(authStore.userInfo, ['id', 'tags']),
    ...values,
  };
  await updateUser(params)
    .then(async ({ error }) => {
      if (!error) {
        // 重新拉取用户信息
        await authStore.initUserInfo();
        appStore.reloadPage(500);
        window.$message?.success($t(`common.editSuccess`));
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  fetchRoleList();
  fetchOrganazationList();
  fetchPostList();
});
</script>

<template>
  <AForm ref="formRef" layout="vertical" :model="model" :rules="rules" @finish="handleSubmit">
    <ARow :gutter="16">
      <ADivider orientation="left">{{ I18nUser('settingAvatar') }}</ADivider>
      <!-- 设置头像 -->
      <ImgCorpper v-model="model.avatar" />
      <ADivider orientation="left">{{ I18nUser('personalInfo') }}</ADivider>
      <!-- 个人信息 -->
      <PersonalInfo v-model:form-data="model" @update:model="updateModel" />
      <ADivider orientation="left">{{ I18nUser('userInfo') }}</ADivider>
      <!-- 用户信息 -->
      <UserInfo
        v-model:form-data="model"
        :role-list="roleList"
        :organazation-list="organazationList"
        :post-list="postList"
        :show-tag="false"
        @update:model="updateModel"
      />
    </ARow>
    <ARow justify="center">
      <AButton type="primary" html-type="submit" :loading="loading">
        {{ $t('common.commit') }}
      </AButton>
    </ARow>
  </AForm>
</template>
