<script setup lang="ts">
import { computed, nextTick, reactive, watch, ref } from "vue";
import { useAntdForm, useFormRules } from "@/hooks/common/form";
import { $t } from "@/locales";
import { createInternalization, updateInternalization } from "@/service/api";
import { pick } from "lodash-es";
import { InternalizationLanguage } from "@/constants";
import { OPERATION_TYPE } from "@/enum";

defineOptions({
  name: "OperateDrawer",
});

// 是否请求中
const loading = ref(false);

// 父组件传递的值
type Props = {
  operateType: AntDesign.TableOperateType; // 操作类型
  rowData?: Api.SystemManage.SaveInternalization | null; // 编辑数据
  dataSource: Api.SystemManage.SaveInternalization[]; // 父级
  locales: (field: string) => string;
};
const props = defineProps<Props>();

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
const title = computed(() =>
  props.locales(`${props.operateType}Internalization`),
);

const model: Api.SystemManage.SaveInternalization =
  reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.SaveInternalization {
  return {
    parentId: undefined,
    name: "",
    zhCN: undefined,
    enUS: undefined,
    jaJP: undefined,
    zhTW: undefined,
  };
}

// 表单校验的 key
type RuleKey = Extract<keyof Api.SystemManage.SaveInternalization, "name">;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
};

// 初始化
async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === "edit" && props.rowData) {
    await nextTick();
    Object.assign(model, props.rowData);
  }
}

// 关闭抽屉
function closeDrawer() {
  visible.value = false;
}

// 提交数据
async function handleSubmit() {
  await validate().then(async () => {
    loading.value = true;
    // 判断是否新增
    const isAdd = props.operateType === OPERATION_TYPE.ADD;
    // 获取参数
    const params = {
      id: isAdd ? undefined : model.id,
      ...pick(model, ["parentId", "name", "zhCN", "enUS", "jaJP", "zhTW"]),
    };
    await (isAdd ? createInternalization : updateInternalization)(params)
      .then(({ error }) => {
        if (!error) {
          window.$message?.success(
            $t(isAdd ? "common.addSuccess" : "common.updateSuccess"),
          );
          closeDrawer();
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
</script>

<template>
  <ADrawer v-model:open="visible" :title="title" :width="360">
    <AForm ref="formRef" layout="vertical" :model="model" :rules="rules">
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
          <template #title="{ name }">
            <ASpace align="center">
              <svg-icon
                icon="ri:font-size"
                class="inline-block"
                style="vertical-align: -2px"
              />
              {{ name }}
            </ASpace>
          </template>
        </ATreeSelect>
      </AFormItem>
      <AFormItem :label="locales('name')" name="name">
        <AInput
          v-model:value="model.name"
          show-count
          :maxlength="32"
          :placeholder="$t('form.enter') + locales('name')"
        />
      </AFormItem>
      <AFormItem
        :label="locales(`${language.replace('-', '')}`)"
        :name="language"
        v-for="language in InternalizationLanguage"
      >
        <AInput
          v-model:value="
            model[
              language.replace('-', '') as keyof Pick<
                Api.SystemManage.Internalization,
                'zhCN' | 'enUS' | 'jaJP' | 'zhTW'
              >
            ]
          "
          show-count
          :maxlength="500"
          :placeholder="
            $t('form.enter') + locales(`${language.replace('-', '')}`)
          "
        />
      </AFormItem>
    </AForm>
    <template #footer>
      <ASpace :size="16">
        <AButton @click="closeDrawer">{{ $t("common.cancel") }}</AButton>
        <AButton type="primary" :loading="loading" @click="handleSubmit">{{
          $t("common.confirm")
        }}</AButton>
      </ASpace>
    </template>
  </ADrawer>
</template>
