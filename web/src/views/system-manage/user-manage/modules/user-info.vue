<template>
  <ACol :span="12">
    <AFormItem :label="locales('roleId')" name="roleId">
      <ASelect
        v-model:value="model.roleId"
        :options="roleList"
        :field-names="{ value: 'id', label: 'name' }"
        :placeholder="$t('form.select')"
      />
    </AFormItem>
  </ACol>
  <ACol :span="12">
    <AFormItem :label="locales('orgId')" name="orgId">
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
  <ACol :span="12">
    <AFormItem :label="locales('postId')" name="postId">
      <ATreeSelect
        v-model:value="model.postId"
        show-search
        style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        :placeholder="$t('form.select')"
        allow-clear
        tree-default-expand-all
        :tree-data="postList"
        tree-node-filter-prop="name"
        :fieldNames="{ value: 'id', label: 'name' }"
      >
        <template #title="{ icon, name }">
          <ASpace align="center">
            <svg-icon
              :icon="icon || 'ri:contacts-book-3-line'"
              class="inline-block"
              style="vertical-align: -2px"
            />
            {{ name }}
          </ASpace>
        </template>
      </ATreeSelect>
    </AFormItem>
  </ACol>
  <ACol :span="12">
    <AFormItem :label="locales('city')" name="city">
      <ACascader
        v-model:value="model.city"
        :options="regionData"
        :placeholder="$t('form.select') + locales('city')"
      />
    </AFormItem>
  </ACol>
  <ACol :span="24">
    <AFormItem :label="locales('address')" name="address">
      <ATextarea
        v-model:value="model.address"
        :rows="4"
        :maxlength="200"
        show-count
        :placeholder="$t('form.enter') + locales('address')"
      />
    </AFormItem>
  </ACol>
  <ACol :span="24">
    <AFormItem :label="locales('tags')" name="tags">
      <FigureLabels v-model:value="model.tags" />
    </AFormItem>
  </ACol>
</template>

<script setup lang="ts">
import { regionData } from "element-china-area-data";
import FigureLabels from "@/components/custom/figure-labels.vue";

// 父组件传递的值
type Props = {
  model: Api.SystemManage.SaveUserManage;
  roleList: Api.SystemManage.RoleManage[];
  organazationList: Api.Administrative.Organization[];
  postList: Api.Administrative.PostManage[];
  locales: (field: string) => string;
};
defineProps<Props>();
</script>
