<script setup lang="ts">
import { computed } from 'vue';

import { SexOptions, StatueOptions } from '@/constants';

defineOptions({
  name: 'PersonalInfo',
});

// 父组件传递的值
type Props = {
  formData: Api.SystemManage.SaveUserManage;
  locales: (field: string) => string;
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
      <AFormItem :label="locales('userName')" name="userName">
        <AInput
          v-model:value="model.userName"
          show-count
          :maxlength="20"
          :placeholder="$t('form.enter') + locales('userName')"
        />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="locales('cnName')" name="cnName">
        <AInput
          v-model:value="model.cnName"
          show-count
          :maxlength="20"
          :placeholder="$t('form.enter') + locales('cnName')"
        />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="locales('phone')" name="phone">
        <AInput
          v-model:value="model.phone"
          show-count
          :maxlength="11"
          :placeholder="$t('form.enter') + locales('phone')"
        />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="locales('email')" name="email">
        <AInput v-model:value="model.email" :placeholder="$t('form.enter') + locales('email')" />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="locales('sex')" name="sex">
        <ARadioGroup v-model:value="model.sex" :options="SexOptions" />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="$t('form.status')" name="status">
        <ARadioGroup v-model:value="model.status" :options="StatueOptions" />
      </AFormItem>
    </ACol>
    <ACol :span="24">
      <AFormItem :label="$t('form.sort')" name="sort" :tooltip="$t('form.sortTip')">
        <AInputNumber
          v-model:value="model.sort"
          :min="1"
          :max="999"
          :placeholder="$t('form.enter') + $t('form.sort')"
          class="w-full"
        />
      </AFormItem>
    </ACol>
  </ARow>
</template>
