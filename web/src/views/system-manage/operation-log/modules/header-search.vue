<script setup lang="ts">
import { ref } from "vue";
import { $t } from "@/locales";
import { useAntdForm } from "@/hooks/common/form";
import { RangePicker } from "ant-design-vue";
import dayjs from "dayjs";
import { MethodOptions } from "@/constants";

// 创建时间
const createdAt = ref<InstanceType<typeof RangePicker>["value"]>();

defineOptions({
  name: "HeaderSearch",
});

// 父组件传递的值
type Props = {
  updateSearchParams: (
    value: Api.SystemManage.OperationLogSearchParams,
  ) => void;
};
const props = defineProps<Props>();

interface Emits {
  (e: "reset"): void;
  (e: "search"): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, resetFields } = useAntdForm();

const model = defineModel<Api.SystemManage.OperationLogSearchParams>("model", {
  required: true,
});

async function reset() {
  await resetFields();
  emit("reset");
}

async function search() {
  await validate();
  if (createdAt.value?.length) {
    props.updateSearchParams({
      startTime: dayjs(createdAt.value[0]).startOf("day").valueOf(),
      endTime: dayjs(createdAt.value[1]).endOf("day").valueOf(),
    });
  }
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
          <AFormItem
            :label="$t('page.systemManage.operationLog.method')"
            name="method"
            class="m-0"
          >
            <ASelect
              v-model:value="model.method"
              allowClear
              :options="MethodOptions"
              :placeholder="
                $t('form.enter') + $t('page.systemManage.operationLog.method')
              "
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

<style scoped></style>
