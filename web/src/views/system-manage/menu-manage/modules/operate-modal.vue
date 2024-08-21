<script setup lang="ts">
import { computed, reactive, watch, ref, nextTick } from "vue";
import { $t } from "@/locales";
import { useAntdForm, useFormRules } from "@/hooks/common/form";
import { MENU_TYPE, OPERATION_TYPE } from "@/enum";
import { MenuTypeOptions } from "@/constants";
import { SimpleScrollbar } from "@sa/materials";
import RouteMetaForm from "./route-meta-form.vue";
import { createMenu, updateMenu } from "@/service/api";
import { pick, assign } from "lodash-es";

defineOptions({
  name: "OperateModal",
});

// 是否请求中
const loading = ref(false);

// 父组件传递的值
type Props = {
  operateType: AntDesign.TableOperateType; // 操作类型
  rowData?: Api.SystemManage.MenuManage | null; // 编辑数据
  dataSource: Api.SystemManage.MenuManage[]; // 父级
  locales: (field: string) => string;
};
const props = defineProps<Props>();

const placeholder = (field: string) => $t("form.enter") + props.locales(field);

// 父组件自定义事件
interface Emits {
  (e: "submitted"): void;
}
const emit = defineEmits<Emits>();

// 抽屉显示状态
const visible = defineModel<boolean>("visible", {
  default: false,
});

const { formRef, validate, resetFields } = useAntdForm();
const { defaultRequiredRule } = useFormRules();

// 抽屉标题
const title = computed(() => props.locales(`${props.operateType}Menu`));

const model: Api.SystemManage.SaveMenuManage = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.SaveMenuManage {
  return {
    type: MENU_TYPE.DIRECTORY,
    parentId: undefined,
    title: "",
    name: undefined,
    path: undefined,
    component: undefined,
    meta: {
      title: "",
      i18nKey: undefined,
      keepAlive: false,
      constant: false,
      icon: undefined,
      order: 0,
      href: undefined,
      hideInMenu: false,
      multiTab: false,
      fixedIndexInTab: undefined,
    },
    permission: undefined,
    sort: 1,
  };
}

// 表单校验的 key
type RuleKey = Extract<
  keyof Api.SystemManage.SaveMenuManage,
  "type" | "title" | "name" | "path" | "component" | "permission" | "sort"
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
    Object.assign(model, props.rowData);
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
      ...pick(model, ["parentId", "title", "type", "sort"]),
    };
    // 判断是否是按钮
    if (model.type === MENU_TYPE.BUTTON) {
      assign(params, pick(model, "permission"));
    } else {
      assign(params, pick(model, ["name", "path", "component", "meta"]));
    }
    await (isAdd ? createMenu : updateMenu)(params)
      .then(({ error }) => {
        if (!error) {
          window.$message?.success($t(`common.${props.operateType}Success`));
          closeModal();
          emit("submitted");
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
      model.path = model.name
        ? `/${model.name.split("_").join("/")}`
        : undefined;
      model.component = model.name ? `view.${model.name}` : undefined;
      if (model.meta) {
        model.meta.title = model.name || "";
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
    :title="title"
    :width="800"
    @cancel="closeModal"
    @ok="handleSubmit"
    :confirm-loading="loading"
  >
    <div class="h-480px">
      <SimpleScrollbar>
        <AForm
          ref="formRef"
          :model="model"
          :rules="rules"
          :label-col="{ lg: 8, xs: 4 }"
          label-wrap
          class="pr-20px"
        >
          <ARow>
            <ACol :lg="12" :xs="24">
              <AFormItem :label="locales('type')" name="type">
                <ARadioGroup
                  v-model:value="model.type"
                  :options="MenuTypeOptions"
                />
              </AFormItem>
            </ACol>
            <ACol :lg="12" :xs="24">
              <AFormItem
                :label="$t('form.parent')"
                name="parentId"
                :tooltip="$t('form.parentTip')"
              >
                <ATreeSelect
                  v-model:value="model.parentId"
                  show-search
                  style="width: 100%"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :placeholder="$t('form.select')"
                  allow-clear
                  tree-default-expand-all
                  :tree-data="dataSource"
                  tree-node-filter-prop="name"
                  :fieldNames="{ value: 'id', label: 'name' }"
                >
                  <template #title="{ title, meta }">
                    <ASpace align="center">
                      <svg-icon
                        :icon="meta?.icon"
                        class="inline-block"
                        style="vertical-align: -2px"
                        v-if="meta?.icon"
                      />
                      {{ title }}
                    </ASpace>
                  </template>
                </ATreeSelect>
              </AFormItem>
            </ACol>
            <ACol :lg="12" :xs="24">
              <AFormItem :label="locales('title')" name="title">
                <AInput
                  v-model:value="model.title"
                  :placeholder="placeholder('title')"
                />
              </AFormItem>
            </ACol>
            <template v-if="model.type !== MENU_TYPE.BUTTON">
              <ACol :lg="12" :xs="24">
                <AFormItem :label="locales('name')" name="name">
                  <AInput
                    v-model:value="model.name"
                    :placeholder="placeholder('name')"
                  />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="locales('path')" name="path">
                  <AInput
                    v-model:value="model.path"
                    :placeholder="placeholder('path')"
                  />
                </AFormItem>
              </ACol>
              <ACol :lg="12" :xs="24">
                <AFormItem :label="locales('component')" name="component">
                  <AInput
                    v-model:value="model.component"
                    :placeholder="placeholder('component')"
                  />
                </AFormItem>
              </ACol>
            </template>
            <ACol :lg="12" :xs="24" v-else>
              <AFormItem :label="locales('permission')" name="permission">
                <AInput
                  v-model:value="model.permission"
                  :maxlength="50"
                  show-count
                  :placeholder="placeholder('permission')"
                />
              </AFormItem>
            </ACol>
            <ACol :lg="12" :xs="24">
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
            <template v-if="model.type !== MENU_TYPE.BUTTON">
              <ACol :span="24">
                <ADivider orientation="left">{{
                  locales("routeMeta")
                }}</ADivider>
              </ACol>
              <!-- 路由元信息 -->
              <RouteMetaForm
                :model="model"
                :locales="locales"
                :placeholder="placeholder"
              />
            </template>
          </ARow>
        </AForm>
      </SimpleScrollbar>
    </div>
  </AModal>
</template>
