<script setup lang="ts">
import { I18nEntry, I18nOrg } from '@/constants/i18n';
import { I18N_COMMON } from '@/enum/i18n';
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

const model = defineModel<Api.Administrative.OrganizationSearchParams>('model', { required: true });

function reset() {
  resetFields();
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
          <AFormItem :label="I18nOrg('name')" name="name" class="m-0">
            <AInput v-model:value="model.name" allow-clear :placeholder="I18nEntry(I18nOrg('name'))" />
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="I18nOrg('code')" name="code" class="m-0">
            <AInput v-model:value="model.code" allow-clear :placeholder="I18nEntry(I18nOrg('code'))" />
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
