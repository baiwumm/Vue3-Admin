<script setup lang="ts">
import type { RangePicker } from 'ant-design-vue';
import dayjs from 'dayjs';
import { ref } from 'vue';

import { useAntdForm } from '@/hooks/common/form';
import { $t } from '@/locales';

// 创建时间
const createdAt = ref<InstanceType<typeof RangePicker>['value']>();

defineOptions({
  name: 'HeaderSearch',
});

// 父组件传递的值
type Props = {
  organazationList: Api.Administrative.Organization[]; // 组织树
  updateSearchParams: (value: Partial<Api.Administrative.PostManageSearchParams>) => void;
  locales: (field: string) => string;
};
const props = defineProps<Props>();

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, resetFields } = useAntdForm();

const model = defineModel<Api.Administrative.PostManageSearchParams>('model', {
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
  }
  emit('search');
}
</script>

<template>
  <ACard :title="$t('common.search')" :bordered="false" class="card-wrapper">
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
          <AFormItem :label="locales('orgId')" name="orgId">
            <ATreeSelect
              v-model:value="model.orgId"
              show-search
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :placeholder="$t('form.select')"
              allow-clear
              tree-default-expand-all
              :tree-data="organazationList"
              tree-node-filter-prop="name"
              :field-names="{ value: 'id', label: 'name' }"
              class="w-full"
            >
              <template #title="{ icon, name }">
                <ASpace align="center">
                  <SvgIcon
                    :icon="icon || 'ri:exchange-2-line'"
                    class="inline-block"
                    :style="{ verticalAlign: '-2px' }"
                  />
                  {{ name }}
                </ASpace>
              </template>
            </ATreeSelect>
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="locales('name')" name="name" class="m-0">
            <AInput v-model:value="model.name" allow-clear :placeholder="$t('form.enter') + locales('name')" />
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="$t('common.createdAt')" class="m-0">
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
                <span class="ml-8px">{{ $t('common.reset') }}</span>
              </AButton>
              <AButton type="primary" ghost @click="search">
                <template #icon>
                  <icon-ic-round-search class="align-sub text-icon" />
                </template>
                <span class="ml-8px">{{ $t('common.search') }}</span>
              </AButton>
            </div>
          </AFormItem>
        </div>
      </ARow>
    </AForm>
  </ACard>
</template>
