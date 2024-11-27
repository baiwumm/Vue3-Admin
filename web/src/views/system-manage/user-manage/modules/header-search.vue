<script setup lang="ts">
import { StatueOptions } from '@/constants';
import { I18nEntry, I18nSelect, I18nUser } from '@/constants/i18n';
import { I18N_COMMON, I18N_FORM } from '@/enum/i18n';
import { useAntdForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'HeaderSearch',
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, resetFields } = useAntdForm();

const model = defineModel<Api.SystemManage.UserManageSearchParams>('model', {
  required: true,
});

async function reset() {
  await resetFields();
  emit('reset');
}

async function search() {
  await validate();
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
          <AFormItem :label="I18nUser('userName')" name="userName" class="m-0">
            <AInput v-model:value="model.userName" allow-clear :placeholder="I18nEntry(I18nUser('userName'))" />
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="$t(I18N_FORM.STATUS)" name="status" class="m-0">
            <ASelect
              v-model:value="model.status"
              allow-clear
              :options="StatueOptions"
              :placeholder="I18nSelect($t(I18N_FORM.STATUS))"
            />
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6"></ACol>
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
