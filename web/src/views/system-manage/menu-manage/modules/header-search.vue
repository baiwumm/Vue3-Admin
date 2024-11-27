<script setup lang="ts">
import type { RangePicker } from 'ant-design-vue';
import dayjs from 'dayjs';
import { ref } from 'vue';

import { I18nEntry, I18nMenu } from '@/constants/i18n';
import { I18N_COMMON } from '@/enum/i18n';
import { useAntdForm } from '@/hooks/common/form';
import { $t } from '@/locales';

// 创建时间
const createdAt = ref<InstanceType<typeof RangePicker>['value']>();

defineOptions({
  name: 'HeaderSearch',
});

// 父组件传递的值
type Props = {
  updateSearchParams: (value: Api.SystemManage.MenuManageSearchParams) => void;
};
const props = defineProps<Props>();

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, resetFields } = useAntdForm();

const model = defineModel<Api.SystemManage.MenuManageSearchParams>('model', {
  required: true,
});

async function reset() {
  await resetFields();
  createdAt.value = undefined;
  emit('reset');
}

async function search() {
  await validate();
  if (createdAt.value?.length) {
    props.updateSearchParams({
      startTime: dayjs(createdAt.value[0]).startOf('day').valueOf(),
      endTime: dayjs(createdAt.value[1]).endOf('day').valueOf(),
    });
  } else {
    props.updateSearchParams({
      startTime: undefined,
      endTime: undefined,
    });
  }
  emit('search');
}
</script>

<template>
  <ACard :title="$t(I18N_COMMON.SEARCH)" :bordered="false" class="card-wrapper">
    <AForm
      ref="formRef"
      :model="model"
      :label-col="{
        span: 5,
        md: 7,
      }"
    >
      <ARow :gutter="[16, 16]" wrap>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="I18nMenu('title')" name="title" class="m-0">
            <AInput v-model:value="model.title" allow-clear :placeholder="I18nEntry(I18nMenu('title'))" />
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="I18nMenu('name')" name="name" class="m-0">
            <AInput v-model:value="model.name" allow-clear :placeholder="I18nEntry(I18nMenu('name'))" />
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="$t(I18N_COMMON.CREATEDAT)" class="m-0">
            <ARangePicker v-model:value="createdAt" />
          </AFormItem>
        </ACol>
        <div class="flex-1">
          <AFormItem class="m-0">
            <div class="w-full flex-y-center justify-end gap-12px">
              <AButton @click="reset">
                <template #icon>
                  <icon-ic-round-refresh class="align-sub text-icon" />
                </template>
                <span class="ml-8px">{{ $t(I18N_COMMON.RESET) }}</span>
              </AButton>
              <AButton type="primary" ghost @click="search">
                <template #icon>
                  <icon-ic-round-search class="align-sub text-icon" />
                </template>
                <span class="ml-8px">{{ $t(I18N_COMMON.SEARCH) }}</span>
              </AButton>
            </div>
          </AFormItem>
        </div>
      </ARow>
    </AForm>
  </ACard>
</template>
