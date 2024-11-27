<script setup lang="ts">
import { regionData } from 'element-china-area-data';
import { computed } from 'vue';

import FigureLabels from '@/components/custom/figure-labels.vue';
import { I18nEntry, I18nSelect, I18nUser } from '@/constants/i18n';

defineOptions({
  name: 'UserInfo',
});

// 父组件传递的值
type Props = {
  formData: Api.SystemManage.SaveUserManage;
  roleList: Api.SystemManage.RoleManage[];
  organazationList: Api.Administrative.Organization[];
  postList: Api.Administrative.PostManage[];
  showTag: boolean;
};
const props = defineProps<Props>();

// 父组件自定义事件
interface Emits {
  (e: 'update:model', value: Partial<Api.SystemManage.SaveUserManage>): void;
}
const emit = defineEmits<Emits>();

const model = computed(() => {
  return new Proxy(props.formData, {
    set(_, prop, newValue) {
      emit('update:model', {
        [prop]: newValue,
      });
      return true;
    },
  });
});
</script>

<template>
  <ARow :gutter="16">
    <ACol :span="12">
      <AFormItem :label="I18nUser('roleId')" name="roleId">
        <ASelect
          v-model:value="model.roleId"
          :options="roleList"
          :field-names="{ value: 'id', label: 'name' }"
          :placeholder="I18nSelect()"
        />
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="I18nUser('orgId')" name="orgId">
        <ATreeSelect
          v-model:value="model.orgId"
          show-search
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :placeholder="I18nSelect()"
          allow-clear
          tree-default-expand-all
          :tree-data="organazationList"
          tree-node-filter-prop="name"
          :field-names="{ value: 'id', label: 'name' }"
          class="w-full"
        >
          <template #title="{ icon, name }">
            <ASpace align="center">
              <SvgIcon :icon="icon || 'ri:exchange-2-line'" class="inline-block" :style="{ verticalAlign: '-2px' }" />
              {{ name }}
            </ASpace>
          </template>
        </ATreeSelect>
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="I18nUser('postId')" name="postId">
        <ATreeSelect
          v-model:value="model.postId"
          show-search
          sclass="w-full"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :placeholder="I18nSelect()"
          allow-clear
          tree-default-expand-all
          :tree-data="postList"
          tree-node-filter-prop="name"
          :field-names="{ value: 'id', label: 'name' }"
        >
          <template #title="{ icon, name }">
            <ASpace align="center">
              <SvgIcon
                :icon="icon || 'ri:contacts-book-3-line'"
                class="inline-block"
                :style="{ verticalAlign: '-2px' }"
              />
              {{ name }}
            </ASpace>
          </template>
        </ATreeSelect>
      </AFormItem>
    </ACol>
    <ACol :span="12">
      <AFormItem :label="I18nUser('city')" name="city">
        <ACascader v-model:value="model.city" :options="regionData" :placeholder="I18nSelect(I18nUser('city'))" />
      </AFormItem>
    </ACol>
    <ACol :span="24">
      <AFormItem :label="I18nUser('address')" name="address">
        <ATextarea
          v-model:value="model.address"
          :rows="4"
          :maxlength="200"
          show-count
          :placeholder="I18nEntry(I18nUser('address'))"
        />
      </AFormItem>
    </ACol>
    <ACol v-if="showTag" :span="24">
      <AFormItem :label="I18nUser('tags')" name="tags">
        <FigureLabels v-model:value="model.tags" />
      </AFormItem>
    </ACol>
  </ARow>
</template>
