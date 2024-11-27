<script setup lang="ts">
import { computed } from 'vue';

import { SexOptions, StatueOptions } from '@/constants';
import { I18nEntry, I18nUser } from '@/constants/i18n';
import { I18N_FORM } from '@/enum/i18n';

defineOptions({
  name: 'PersonalInfo',
});

// 父组件传递的值
type Props = {
  formData: Api.SystemManage.SaveUserManage;
};
const props = defineProps<Props>();

// 父组件自定义事件
interface Emits {
  (e: 'update:model', value: Partial<Api.SystemManage.SaveUserManage>): void;
}
const emit = defineEmits<Emits>();

const model = computed(() => {
  return new Proxy(props.formData, {
    set(_, prop, newValue) {
      emit('update:model', {
        [prop]: newValue,
      });
      return true;
    },
  });
});
</script>

<template>
  <ARow :gutter="16">
    <ACol :span="12">
      <AFormItem :label="I18nUser('userName')" name="userName">
        <AInput
          v-model:value="model.userName"
          show-count
          :maxlength="20"
          :placeholder="I18nEntry(I18nUser('userName'))"
        />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="I18nUser('cnName')" name="cnName">
        <AInput v-model:value="model.cnName" show-count :maxlength="20" :placeholder="I18nEntry(I18nUser('cnName'))" />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="I18nUser('phone')" name="phone">
        <AInput v-model:value="model.phone" show-count :maxlength="11" :placeholder="I18nEntry(I18nUser('phone'))" />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="I18nUser('email')" name="email">
        <AInput v-model:value="model.email" :placeholder="I18nEntry(I18nUser('email'))" />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="I18nUser('sex')" name="sex">
        <ARadioGroup v-model:value="model.sex" :options="SexOptions" />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="$t(I18N_FORM.STATUS)" name="status">
        <ARadioGroup v-model:value="model.status" :options="StatueOptions" />
      </AFormItem>
    </ACol>
    <ACol :span="24">
      <AFormItem :label="$t(I18N_FORM.SORT)" name="sort" :tooltip="$t(I18N_FORM.SORT_TIP)">
        <AInputNumber
          v-model:value="model.sort"
          :min="1"
          :max="999"
          :placeholder="I18nEntry($t(I18N_FORM.SORT))"
          class="w-full"
        />
      </AFormItem>
    </ACol>
  </ARow>
</template>
