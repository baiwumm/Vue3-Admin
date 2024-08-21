<script setup lang="ts">
import { $t } from "@/locales";
import { useAntdForm } from "@/hooks/common/form";

defineOptions({
  name: "HeaderSearch",
});

// 父组件传递的值
type Props = {
  locales: (field: string) => string;
};
defineProps<Props>();

interface Emits {
  (e: "reset"): void;
  (e: "search"): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, resetFields } = useAntdForm();

const model = defineModel<Api.Administrative.OrganizationSearchParams>(
  "model",
  { required: true },
);

async function reset() {
  await resetFields();
  emit("reset");
}

async function search() {
  await validate();
  emit("search");
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
          <AFormItem :label="locales('name')" name="name" class="m-0">
            <AInput
              v-model:value="model.name"
              allowClear
              :placeholder="$t('form.enter') + locales('name')"
            />
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem :label="locales('code')" name="code" class="m-0">
            <AInput
              v-model:value="model.code"
              allowClear
              :placeholder="$t('form.enter') + locales('code')"
            />
          </AFormItem>
        </ACol>
        <div class="flex-1">
          <AFormItem class="m-0">
            <div class="w-full flex-y-center justify-end gap-12px">
              <AButton @click="reset">
                <template #icon>
                  <icon-ic-round-refresh class="align-sub text-icon" />
                </template>
                <span class="ml-8px">{{ $t("common.reset") }}</span>
              </AButton>
              <AButton type="primary" ghost @click="search">
                <template #icon>
                  <icon-ic-round-search class="align-sub text-icon" />
                </template>
                <span class="ml-8px">{{ $t("common.search") }}</span>
              </AButton>
            </div>
          </AFormItem>
        </div>
      </ARow>
    </AForm>
  </ACard>
</template>
