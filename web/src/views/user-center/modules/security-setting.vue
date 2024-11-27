<script setup lang="ts">
import { I18nUserCenter } from '@/constants/i18n';
import { PERSONAL_SETTING } from '@/enum';
import { $t } from '@/locales';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'SecuritySetting',
});

type DaraSource = {
  title: string;
  description: string;
  key?: PERSONAL_SETTING;
};

// 父组件自定义事件
interface Emits {
  (e: 'changeTabs', key: string): void;
}
const emit = defineEmits<Emits>();

const authStore = useAuthStore();

// 获取登录用户信息
const { cnName, phone, email } = authStore.userInfo;

// 解构枚举
const { BASIC_SETTING, CHANGE_PASSWORD, SECURITY_SETTING } = PERSONAL_SETTING;

const dataSource: DaraSource[] = [
  {
    title: I18nUserCenter(`${SECURITY_SETTING}.authentication`),
    description: $t(`page.userCenter.${SECURITY_SETTING}.authentication-information`, { cnName }),
  },
  {
    title: I18nUserCenter(`${SECURITY_SETTING}.account-password`),
    description: I18nUserCenter(`${SECURITY_SETTING}.account-password-desc`),
    key: CHANGE_PASSWORD,
  },
  {
    title: I18nUserCenter(`${SECURITY_SETTING}.security-phone`),
    description: $t(`page.userCenter.${SECURITY_SETTING}.security-phone-desc`, {
      phone: phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2'),
    }),
    key: BASIC_SETTING,
  },
  {
    title: I18nUserCenter(`${SECURITY_SETTING}.security-email`),
    description: $t(`page.userCenter.${SECURITY_SETTING}.security-email-desc`, {
      email,
    }),
    key: BASIC_SETTING,
  },
];
</script>

<template>
  <AList :data-source="dataSource">
    <template #renderItem="{ item }">
      <AListItem>
        <template #actions>
          <AButton v-if="item.key" type="link" @click="emit('changeTabs', item.key)">{{ $t('common.edit') }}</AButton>
          <ATag v-else :bordered="false" color="success">
            {{ I18nUserCenter(`${SECURITY_SETTING}.authenticated`) }}
          </ATag>
        </template>
        <AListItemMeta :title="item.title" :description="item.description"></AListItemMeta>
      </AListItem>
    </template>
  </AList>
</template>
