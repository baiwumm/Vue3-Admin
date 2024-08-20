<script setup lang="ts">
import { $t } from "@/locales";

// 父组件传递的值
type Props = {
  model: Required<Api.SystemManage.MenuManage>; // 表单数据
};
defineProps<Props>();
</script>

<template>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.title')"
      :name="['meta', 'title']"
    >
      <AInput
        v-model:value="model.meta.title"
        :placeholder="
          $t('form.enter') + $t('page.systemManage.menuManage.meta.title')
        "
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.i18nKey')"
      :name="['meta', 'i18nKey']"
    >
      <AInput
        v-model:value="model.meta.i18nKey"
        :placeholder="
          $t('form.enter') + $t('page.systemManage.menuManage.meta.i18nKey')
        "
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.icon')"
      :name="['meta', 'icon']"
    >
      <AInput
        v-model:value="model.meta.icon"
        :placeholder="
          $t('form.enter') + $t('page.systemManage.menuManage.meta.icon')
        "
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
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.href')"
      :name="['meta', 'href']"
    >
      <AInput
        v-model:value="model.meta.href as string"
        :placeholder="
          $t('form.enter') + $t('page.systemManage.menuManage.meta.href')
        "
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.keepAlive')"
      :name="['meta', 'keepAlive']"
    >
      <ARadioGroup v-model:value="model.meta.keepAlive">
        <ARadio :value="true">{{ $t("common.yesOrNo.yes") }}</ARadio>
        <ARadio :value="false">{{ $t("common.yesOrNo.no") }}</ARadio>
      </ARadioGroup>
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.constant')"
      :name="['meta', 'constant']"
    >
      <ARadioGroup v-model:value="model.meta.constant">
        <ARadio :value="true">{{ $t("common.yesOrNo.yes") }}</ARadio>
        <ARadio :value="false">{{ $t("common.yesOrNo.no") }}</ARadio>
      </ARadioGroup>
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.hideInMenu')"
      :name="['meta', 'hideInMenu']"
    >
      <ARadioGroup v-model:value="model.meta.hideInMenu">
        <ARadio :value="true">{{ $t("common.yesOrNo.yes") }}</ARadio>
        <ARadio :value="false">{{ $t("common.yesOrNo.no") }}</ARadio>
      </ARadioGroup>
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.multiTab')"
      :name="['meta', 'multiTab']"
    >
      <ARadioGroup v-model:value="model.meta.multiTab">
        <ARadio :value="true">{{ $t("common.yesOrNo.yes") }}</ARadio>
        <ARadio :value="false">{{ $t("common.yesOrNo.no") }}</ARadio>
      </ARadioGroup>
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.order')"
      :name="['meta', 'order']"
    >
      <AInputNumber
        v-model:value="model.meta.order as number"
        :min="0"
        :max="999"
        :placeholder="
          $t('form.enter') + $t('page.systemManage.menuManage.meta.order')
        "
        style="width: 100%"
      />
    </AFormItem>
  </ACol>
  <ACol :lg="12" :xs="24">
    <AFormItem
      :label="$t('page.systemManage.menuManage.meta.fixedIndexInTab')"
      :name="['meta', 'fixedIndexInTab']"
    >
      <AInputNumber
        v-model:value="model.meta.fixedIndexInTab as number"
        :min="0"
        :max="999"
        :placeholder="
          $t('form.enter') +
          $t('page.systemManage.menuManage.meta.fixedIndexInTab')
        "
        style="width: 100%"
      />
    </AFormItem>
  </ACol>
</template>
