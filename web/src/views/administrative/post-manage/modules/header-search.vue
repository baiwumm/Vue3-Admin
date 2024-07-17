<script setup lang="ts">
import { ref } from "vue";
import { $t } from "@/locales";
import { useAntdForm } from "@/hooks/common/form";
import dayjs from "dayjs";
import { RangePicker } from "ant-design-vue";

// 创建时间
const createdAt = ref<InstanceType<typeof RangePicker>["value"]>();

defineOptions({
  name: "HeaderSearch",
});

// 父组件传递的值
type Props = {
  organazationList: Api.Administrative.Organization[]; // 组织树
  updateSearchParams: (
    value: Api.Administrative.PostManageSearchParams,
  ) => void;
};
const props = defineProps<Props>();

interface Emits {
  (e: "reset"): void;
  (e: "search"): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, resetFields } = useAntdForm();

const model = defineModel<Api.Administrative.PostManageSearchParams>("model", {
  required: true,
  set(value) {
    console.log("value", value);
    console.log("createdAt", createdAt);
    return value;
  },
});

async function reset() {
  await resetFields();
  createdAt.value = undefined;
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
            :label="$t('page.administrative.postManage.orgId')"
            name="orgId"
          >
            <ATreeSelect
              v-model:value="model.orgId"
              show-search
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :placeholder="$t('form.select')"
              allow-clear
              tree-default-expand-all
              :tree-data="organazationList"
              tree-node-filter-prop="name"
              :fieldNames="{ value: 'id', label: 'name' }"
            >
              <template #title="{ icon, name }">
                <ASpace align="center">
                  <svg-icon
                    :icon="icon || 'ri:exchange-2-line'"
                    class="inline-block"
                    style="vertical-align: -2px"
                  />
                  {{ name }}
                </ASpace>
              </template>
            </ATreeSelect>
          </AFormItem>
        </ACol>
        <ACol :span="24" :md="12" :lg="6">
          <AFormItem
            :label="$t('page.administrative.postManage.name')"
            name="name"
            class="m-0"
          >
            <AInput
              v-model:value="model.name"
              allowClear
              :placeholder="
                $t('form.enter') + $t('page.administrative.postManage.name')
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
