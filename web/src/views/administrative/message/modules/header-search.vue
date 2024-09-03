<script setup lang="ts">
import type { RangePicker } from 'ant-design-vue';
import dayjs from 'dayjs';
import { ref } from 'vue';

import { StatueOptions } from '@/constants';
import { useAntdForm } from '@/hooks/common/form';
import { $t } from '@/locales';

// 创建时间
const createdAt = ref<InstanceType<typeof RangePicker>['value']>();

defineOptions({
  name: 'HeaderSearch',
});

// 父组件传递的值
type Props = {
  updateSearchParams: (value: Partial<Api.Administrative.MessageSearchParams>) => void;
  userList: Api.SystemManage.UserManage[];
  locales: (field: string) => string;
};
const props = defineProps<Props>();

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, resetFields } = useAntdForm();

const model = defineModel<Api.Administrative.MessageSearchParams>('model', {
  required: true,
});

async function reset() {
  await resetFields();
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
    <AForm ref="formRef" :model="model">
      <ARow :gutter="[16, 16]" wrap>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="locales('userId')" name="userId" class="m-0">
            <ASelect
              v-model:value="model.userId"
              allow-clear
              :options="userList"
              :placeholder="$t('form.select') + locales('userId')"
              :field-names="{ value: 'id', label: 'cnName' }"
            >
              <template #option="{ cnName, avatar }">
                <ASpace>
                  <AAvatar :src="avatar" />
                  {{ cnName }}
                </ASpace>
              </template>
            </ASelect>
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="locales('title')" name="title" class="m-0">
            <AInput v-model:value="model.title" allow-clear :placeholder="$t('form.enter') + locales('title')" />
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="$t('form.status')" name="status" class="m-0">
            <ASelect
              v-model:value="model.status"
              allow-clear
              :options="StatueOptions"
              :placeholder="$t('form.select') + $t('form.status')"
            />
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
