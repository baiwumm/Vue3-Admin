<script setup lang="ts">
import 'vue3-tree-org/lib/vue3-tree-org.css';

import { computed, onMounted, reactive, ref, useTemplateRef, watch } from 'vue';
import Vue3TreeOrg2 from 'vue3-tree-org';

import { getOrganazationList } from '@/service/api';
import { useThemeStore } from '@/store/modules/theme';
const Vue3TreeOrg = Vue3TreeOrg2.Vue3TreeOrg;

defineOptions({
  name: 'FrameWork',
});

const themeStore = useThemeStore();

const treeOrgRef = useTemplateRef<HTMLElement>('treeOrgRef');

const loading = ref(false); // 加载中
const horizontal = ref(false); // 是否是横向
const collapsable = ref(false); // 是否可以展开收起节点
const isThemeColor = ref(false); // 判断当前选择的是否是主题色
const keyword = ref(''); // 搜索关键字

// 背景颜色
const backgroundColor = ref('#fff');
// 文字颜色
const color = ref('#000');

const labelStyle = computed(() => {
  return {
    backgroundColor: backgroundColor.value,
    color: color.value,
  };
});

const backgroundOptions = computed(() => [
  { value: themeStore.themeColor, label: '主题色' },
  { value: '#fff', label: '洁白无瑕' },
  { value: '#FFA500', label: '金橙' },
  { value: '#FFD700', label: '金光灿灿' },
  { value: '#808080', label: '珊瑚灰' },
  { value: '#FFB6C1', label: '姹紫嫣红' },
  { value: '#D2691E', label: '黑朱古力' },
  { value: '#FF6347', label: '红彤彤' },
]);

// 组织树
const dataSource = reactive({
  id: import.meta.env.VITE_APP_TITLE,
  name: import.meta.env.VITE_APP_TITLE,
});

// 请求组织列表
const fetchOrganazationList = async () => {
  loading.value = true;
  const { error, data } = await getOrganazationList();
  if (!error) {
    dataSource.children = data.records;
  }
  loading.value = false;
};

// 背景色选择回调
const handleBackgroundColorChange = (value: string) => {
  isThemeColor.value = value === themeStore.themeColor;
};

// 搜索逻辑
const filterNodeMethod = (value: string, data) => {
  if (!value) return true;
  return data.label.includes(value);
};
// 搜索回调
const onSearch = (searchValue: string) => {
  if (treeOrgRef.value) {
    treeOrgRef.value.filter(searchValue);
  }
};

onMounted(() => {
  fetchOrganazationList();
});

watch(
  () => themeStore.themeColor,
  value => {
    if (isThemeColor.value) {
      backgroundColor.value = value;
    }
  },
);
</script>

<template>
  <ASpace direction="vertical">
    <ACard>
      <AForm layout="inline">
        <AFormItem label="横向">
          <ASwitch v-model:checked="horizontal" />
        </AFormItem>
        <AFormItem label="可收起">
          <ASwitch v-model:checked="collapsable" />
        </AFormItem>
        <AFormItem label="背景色">
          <ASelect
            v-model:value="backgroundColor"
            :options="backgroundOptions"
            :style="{ width: '100px' }"
            @change="handleBackgroundColorChange"
          />
        </AFormItem>
        <AFormItem label="文字颜色">
          <ColorPicker v-model="color" theme="classic" />
        </AFormItem>
        <AFormItem label="搜索">
          <AInputSearch
            v-model:value="keyword"
            allow-clear
            placeholder="输入名称搜索"
            enter-button
            @search="onSearch"
          />
        </AFormItem>
      </AForm>
    </ACard>
    <ASpin :spinning="loading">
      <div :style="{ height: 'calc(100vh - 290px)' }">
        <Vue3TreeOrg
          ref="treeOrgRef"
          :data="dataSource"
          :filter-node-method="filterNodeMethod"
          :horizontal="horizontal"
          :label-style="labelStyle"
          :collapsable="collapsable"
          :props="{ id: 'id', label: 'name', pid: 'parentId', children: 'children' }"
        />
      </div>
    </ASpin>
  </ASpace>
</template>
