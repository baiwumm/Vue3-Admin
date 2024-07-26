<template>
  <ACol :span="12">
    <AFormItem
      :label="$t('page.systemManage.userManage.userName')"
      name="userName"
    >
      <AInput
        v-model:value="model.userName"
        show-count
        :maxlength="20"
        :placeholder="
          $t('form.enter') + $t('page.systemManage.userManage.userName')
        "
      />
    </AFormItem>
  </ACol>
  <ACol :span="12">
    <AFormItem :label="$t('page.systemManage.userManage.cnName')" name="cnName">
      <AInput
        v-model:value="model.cnName"
        show-count
        :maxlength="20"
        :placeholder="
          $t('form.enter') + $t('page.systemManage.userManage.cnName')
        "
      />
    </AFormItem>
  </ACol>
  <ACol :span="12">
    <AFormItem :label="$t('page.systemManage.userManage.phone')" name="phone">
      <AInput
        v-model:value="model.phone"
        show-count
        :maxlength="11"
        :placeholder="
          $t('form.enter') + $t('page.systemManage.userManage.phone')
        "
      />
    </AFormItem>
  </ACol>
  <ACol :span="12">
    <AFormItem :label="$t('page.systemManage.userManage.email')" name="email">
      <AInput
        v-model:value="model.email"
        :placeholder="
          $t('form.enter') + $t('page.systemManage.userManage.email')
        "
      />
    </AFormItem>
  </ACol>
  <ACol :span="12">
    <AFormItem :label="$t('page.systemManage.userManage.sex')" name="sex">
      <a-radio-group v-model:value="model.sex" :options="SexOptions" />
    </AFormItem>
  </ACol>
  <ACol :span="12">
    <AFormItem :label="$t('form.status')" name="status">
      <a-radio-group v-model:value="model.status" :options="StatueOptions" />
    </AFormItem>
  </ACol>
  <ACol :span="24">
    <AFormItem
      :label="$t('form.sort')"
      name="sort"
      :tooltip="$t('form.sortTip')"
    >
      <AInputNumber
        v-model:value="model.sort"
        :min="1"
        :max="999"
        :placeholder="$t('form.enter') + $t('form.sort')"
        style="width: 100%"
      />
    </AFormItem>
  </ACol>
</template>
<script setup lang="ts">
import { SexOptions, StatueOptions } from "@/constants";

// 父组件传递的值
type Props = {
  model: Api.SystemManage.SaveUserManage;
};
defineProps<Props>();
</script>
