<script setup lang="ts">
import { $t } from "@/locales";
import { YesOrNoOptions } from "@/constants";

// 父组件传递的值
type Props = {
  model: Required<Api.SystemManage.SaveMenuManage>; // 表单数据
  locales: (field: string) => string;
  placeholder: (field: string) => string;
};
defineProps<Props>();
</script>

<template>
  <ACol :lg="12" :xs="24">
    <AFormItem :label="locales('meta.title')" :name="['meta', 'title']">
      <AInput
        v-model:value="model.meta.title"
        :placeholder="placeholder('meta.title')"
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem :label="locales('meta.i18nKey')" :name="['meta', 'i18nKey']">
      <AInput
        v-model:value="model.meta.i18nKey"
        :placeholder="placeholder('meta.i18nKey')"
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem :label="locales('meta.icon')" :name="['meta', 'icon']">
      <AInput
        v-model:value="model.meta.icon"
        :placeholder="placeholder('meta.icon')"
      >
        <template #suffix>
          <SvgIcon
            v-if="model.meta.icon"
            :icon="model.meta.icon"
            class="text-icon"
          />
        </template>
      </AInput>
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem :label="locales('meta.href')" :name="['meta', 'href']">
      <AInput
        v-model:value="model.meta.href as string"
        :placeholder="placeholder('meta.href')"
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem :label="locales('meta.keepAlive')" :name="['meta', 'keepAlive']">
      <ARadioGroup
        v-model:value="model.meta.keepAlive"
        :options="YesOrNoOptions"
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem :label="locales('meta.constant')" :name="['meta', 'constant']">
      <ARadioGroup
        v-model:value="model.meta.constant"
        :options="YesOrNoOptions"
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.hideInMenu')"
      :name="['meta', 'hideInMenu']"
    >
      <ARadioGroup
        v-model:value="model.meta.hideInMenu"
        :options="YesOrNoOptions"
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.multiTab')"
      :name="['meta', 'multiTab']"
    >
      <ARadioGroup
        v-model:value="model.meta.multiTab"
        :options="YesOrNoOptions"
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem :label="locales('meta.order')" :name="['meta', 'order']">
      <AInputNumber
        v-model:value="model.meta.order as number"
        :min="0"
        :max="999"
        :placeholder="placeholder('meta.order')"
        style="width: 100%"
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="locales('meta.fixedIndexInTab')"
      :name="['meta', 'fixedIndexInTab']"
    >
      <AInputNumber
        v-model:value="model.meta.fixedIndexInTab as number"
        :min="0"
        :max="999"
        :placeholder="placeholder('meta.fixedIndexInTab')"
        style="width: 100%"
      />
    </AFormItem>
  </ACol>
</template>
