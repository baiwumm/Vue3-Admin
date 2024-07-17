<script setup lang="ts">
import { computed, nextTick, reactive, watch, ref } from "vue";
import { useAntdForm, useFormRules } from "@/hooks/common/form";
import { $t } from "@/locales";
import { createPost, updatePost } from "@/service/api";
import { pick } from "lodash-es";

defineOptions({
  name: "OperateDrawer",
});

// 是否请求中
const loading = ref(false);

// 父组件传递的值
type Props = {
  operateType: AntDesign.TableOperateType; // 操作类型
  rowData?: Api.Administrative.PostManage | null; // 编辑数据
  dataSource: Api.Administrative.PostManage[]; // 父级
  organazationList: Api.Administrative.Organization[]; // 组织树
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
const title = computed(() => {
  const titles: Record<AntDesign.TableOperateType, string> = {
    add: $t("page.administrative.postManage.addPost"),
    edit: $t("page.administrative.postManage.editPost"),
  };
  return titles[props.operateType];
});

const model: Api.Administrative.SavePostManage = reactive(createDefaultModel());

function createDefaultModel(): Api.Administrative.SavePostManage {
  return {
    parentId: undefined,
    name: "",
    orgId: undefined,
    sort: 1,
    description: "",
  };
}

// 表单校验的 key
type RuleKey = Extract<
  keyof Api.Administrative.SavePostManage,
  "name" | "orgId" | "sort"
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  orgId: defaultRequiredRule,
  sort: defaultRequiredRule,
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
    const isAdd = props.operateType === "add";
    // 获取参数
    const params = {
      id: isAdd ? undefined : model.id,
      ...pick(model, ["parentId", "name", "orgId", "sort", "description"]),
    };
    await (isAdd ? createPost : updatePost)(params)
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
                icon="ri:contacts-book-3-line"
                class="inline-block"
                style="vertical-align: -2px"
              />
              {{ name }}
            </ASpace>
          </template>
        </ATreeSelect>
      </AFormItem>
      <AFormItem :label="$t('page.administrative.postManage.name')" name="name">
        <AInput
          v-model:value="model.name"
          show-count
          :maxlength="32"
          :placeholder="
            $t('form.enter') + $t('page.administrative.postManage.name')
          "
        />
      </AFormItem>
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
      <AFormItem
        :label="$t('page.administrative.postManage.description')"
        name="description"
      >
        <ATextarea
          v-model:value="model.description"
          show-count
          :maxlength="200"
          :rows="4"
          :placeholder="
            $t('form.enter') + $t('page.administrative.postManage.description')
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

<style scoped></style>
