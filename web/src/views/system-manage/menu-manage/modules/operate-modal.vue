<script setup lang="ts">
import { SimpleScrollbar } from '@sa/materials';
import { assign, pick } from 'lodash-es';
import { computed, nextTick, reactive, ref, watch } from 'vue';

import { MenuTypeOptions, YesOrNoOptions } from '@/constants';
import { I18nEntry, I18nMenu, I18nSelect } from '@/constants/i18n';
import { MENU_TYPE, OPERATION_TYPE } from '@/enum';
import { I18N_FORM } from '@/enum/i18n';
import { useAntdForm, useFormRules } from '@/hooks/common/form';
import { $t } from '@/locales';
import { createMenu, updateMenu } from '@/service/api';

defineOptions({
  name: 'OperateModal',
});

// 是否请求中
const loading = ref(false);

// 父组件传递的值
type Props = {
  operateType: AntDesign.TableOperateType; // 操作类型
  rowData?: Api.SystemManage.MenuManage | null; // 编辑数据
  dataSource: Api.SystemManage.MenuManage[]; // 父级
};
const props = defineProps<Props>();

const placeholder = (field: string) => I18nEntry(I18nMenu(field));

// 父组件自定义事件
interface Emits {
  (e: 'submitted'): void;
}
const emit = defineEmits<Emits>();

// 抽屉显示状态
const visible = defineModel<boolean>('visible', {
  default: false,
});

const { formRef, validate, resetFields } = useAntdForm();
const { defaultRequiredRule } = useFormRules();

// 抽屉标题
const modalTitle = computed(() => I18nMenu(`${props.operateType}Menu`));

const model: Api.SystemManage.SaveMenuManage = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.SaveMenuManage {
  return {
    type: MENU_TYPE.DIRECTORY,
    parentId: null,
    title: '',
    name: undefined,
    path: undefined,
    component: undefined,
    meta: {
      title: '',
      i18nKey: undefined,
      keepAlive: false,
      constant: false,
      icon: undefined,
      localIcon: undefined,
      order: 0,
      href: undefined,
      hideInMenu: false,
      multiTab: false,
      fixedIndexInTab: undefined,
    },
    props: {
      url: '',
    },
    permission: undefined,
    sort: 1,
  };
}

// 表单校验的 key
type RuleKey = Extract<
  keyof Api.SystemManage.SaveMenuManage,
  'type' | 'title' | 'name' | 'path' | 'component' | 'permission' | 'sort'
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  type: defaultRequiredRule,
  title: defaultRequiredRule,
  name: defaultRequiredRule,
  path: defaultRequiredRule,
  component: defaultRequiredRule,
  permission: defaultRequiredRule,
  sort: defaultRequiredRule,
};

// 初始化
async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === OPERATION_TYPE.EDIT && props.rowData) {
    await nextTick();
    Object.assign(model, {
      ...props.rowData,
      props: props.rowData?.props || {},
    });
  }
}

// 关闭弹窗
const closeModal = () => {
  visible.value = false;
};

// 提交数据
async function handleSubmit() {
  await validate().then(async () => {
    loading.value = true;
    // 判断是否新增
    const isAdd = props.operateType === OPERATION_TYPE.ADD;
    // 获取参数
    const params = {
      id: isAdd ? undefined : model.id,
      ...pick(model, ['title', 'type', 'sort']),
      parentId: model.parentId || null,
    };
    // 判断是否是按钮
    if (model.type === MENU_TYPE.BUTTON) {
      assign(params, pick(model, 'permission'));
    } else {
      assign(params, pick(model, ['name', 'path', 'component', 'meta', 'props']));
    }
    await (isAdd ? createMenu : updateMenu)(params)
      .then(({ error }) => {
        if (!error) {
          window.$message?.success($t(`common.${props.operateType}Success`));
          closeModal();
          emit('submitted');
        }
      })
      .finally(() => {
        loading.value = false;
      });
  });
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    resetFields();
  }
});

watch(
  () => model.name,
  () => {
    if (props.operateType === OPERATION_TYPE.ADD) {
      model.path = model.name ? `/${model.name.split('_').join('/')}` : undefined;
      model.component = model.name ? `view.${model.name}` : undefined;
      if (model.meta) {
        model.meta.title = model.name || '';
      }
      if (model.meta) {
        model.meta.i18nKey = model.name ? `route.${model.name}` : undefined;
      }
    }
  },
);
</script>

<template>
  <AModal
    v-model:open="visible"
    :title="modalTitle"
    :width="800"
    :confirm-loading="loading"
    @cancel="closeModal"
    @ok="handleSubmit"
  >
    <div class="h-480px">
      <SimpleScrollbar>
        <AForm ref="formRef" :model="model" :rules="rules" :label-col="{ lg: 8, xs: 4 }" label-wrap class="pr-20px">
          <ARow>
            <ACol :lg="12" :xs="24">
              <AFormItem :label="I18nMenu('type')" name="type">
                <ARadioGroup v-model:value="model.type" :options="MenuTypeOptions" />
              </AFormItem>
            </ACol>
            <ACol :lg="12" :xs="24">
              <AFormItem :label="$t(I18N_FORM.PARENT)" name="parentId" :tooltip="$t(I18N_FORM.PARENT_TIP)">
                <ATreeSelect
                  v-model:value="model.parentId"
                  show-search
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :placeholder="I18nSelect()"
                  allow-clear
                  tree-default-expand-all
                  :tree-data="dataSource"
                  tree-node-filter-prop="name"
                  :field-names="{ value: 'id', label: 'name' }"
                  class="w-full"
                >
                  <template #title="{ title, meta }">
                    <ASpace align="center">
                      <SvgIcon
                        v-if="meta?.icon"
                        :icon="meta?.icon"
                        class="inline-block"
                        :style="{ verticalAlign: '-2px' }"
                      />
                      {{ title }}
                    </ASpace>
                  </template>
                </ATreeSelect>
              </AFormItem>
            </ACol>
            <ACol :lg="12" :xs="24">
              <AFormItem :label="I18nMenu('title')" name="title">
                <AInput v-model:value="model.title" :placeholder="placeholder('title')" />
              </AFormItem>
            </ACol>
            <template v-if="model.type !== MENU_TYPE.BUTTON">
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('name')" name="name">
                  <AInput v-model:value="model.name" :placeholder="placeholder('name')" />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('path')" name="path">
                  <AInput v-model:value="model.path" :placeholder="placeholder('path')" />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('component')" name="component">
                  <AInput v-model:value="model.component" :placeholder="placeholder('component')" />
                </AFormItem>
              </ACol>
            </template>
            <ACol v-else :lg="12" :xs="24">
              <AFormItem :label="I18nMenu('permission')" name="permission">
                <AInput
                  v-model:value="model.permission"
                  :maxlength="50"
                  show-count
                  :placeholder="placeholder('permission')"
                />
              </AFormItem>
            </ACol>
            <ACol :lg="12" :xs="24">
              <AFormItem :label="$t(I18N_FORM.SORT)" name="sort" :tooltip="$t(I18N_FORM.SORT_TIP)">
                <AInputNumber
                  v-model:value="model.sort"
                  :min="1"
                  :max="999"
                  :placeholder="I18nEntry($t(I18N_FORM.SORT))"
                  class="w-full"
                />
              </AFormItem>
            </ACol>
            <template v-if="model.type !== MENU_TYPE.BUTTON">
              <ACol :span="24">
                <ADivider orientation="left">{{ I18nMenu('routeMeta') }}</ADivider>
              </ACol>
              <!-- 路由元信息 -->
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.title')" :name="['meta', 'title']">
                  <AInput v-model:value="model.meta.title" :placeholder="placeholder('meta.title')" />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.i18nKey')" :name="['meta', 'i18nKey']">
                  <AInput v-model:value="model.meta.i18nKey" :placeholder="placeholder('meta.i18nKey')" />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.icon')" :name="['meta', 'icon']">
                  <AInput v-model:value="model.meta.icon" :placeholder="placeholder('meta.icon')">
                    <template #suffix>
                      <SvgIcon v-if="model.meta.icon" :icon="model.meta.icon" class="text-icon" />
                    </template>
                  </AInput>
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.localIcon')" :name="['meta', 'localIcon']">
                  <AInput v-model:value="model.meta.localIcon" :placeholder="placeholder('meta.localIcon')">
                    <template #suffix>
                      <SvgIcon v-if="model.meta.localIcon" :local-icon="model.meta.localIcon" class="text-icon" />
                    </template>
                  </AInput>
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.href')" :name="['meta', 'href']">
                  <AInput v-model:value="model.meta.href as string" :placeholder="placeholder('meta.href')" />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.order')" :name="['meta', 'order']">
                  <AInputNumber
                    v-model:value="model.meta.order as number"
                    :min="0"
                    :max="999"
                    :placeholder="placeholder('meta.order')"
                    class="w-full"
                  />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.keepAlive')" :name="['meta', 'keepAlive']">
                  <ARadioGroup v-model:value="model.meta.keepAlive" :options="YesOrNoOptions" />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.constant')" :name="['meta', 'constant']">
                  <ARadioGroup v-model:value="model.meta.constant" :options="YesOrNoOptions" />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.hideInMenu')" :name="['meta', 'hideInMenu']">
                  <ARadioGroup v-model:value="model.meta.hideInMenu" :options="YesOrNoOptions" />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.multiTab')" :name="['meta', 'multiTab']">
                  <ARadioGroup v-model:value="model.meta.multiTab" :options="YesOrNoOptions" />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('meta.fixedIndexInTab')" :name="['meta', 'fixedIndexInTab']">
                  <AInputNumber
                    v-model:value="model.meta.fixedIndexInTab as number"
                    :min="0"
                    :max="999"
                    :placeholder="placeholder('meta.fixedIndexInTab')"
                    class="w-full"
                  />
                </AFormItem>
              </ACol>
            </template>
            <template v-if="model.type === MENU_TYPE.MENU">
              <ACol :span="24">
                <ADivider orientation="left">{{ I18nMenu('iframeParams') }}</ADivider>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="I18nMenu('props.url')" :name="['props', 'url']">
                  <AInput v-model:value="model.props.url as string" :placeholder="placeholder('props.url')" />
                </AFormItem>
              </ACol>
            </template>
          </ARow>
        </AForm>
      </SimpleScrollbar>
    </div>
  </AModal>
</template>
