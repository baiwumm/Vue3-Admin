<script setup lang="ts">
import { computed, ref, reactive, watch, nextTick } from "vue";
import { $t } from "@/locales";
import PersonalInfo from "./personal-info.vue"; // 个人信息
import UserInfo from "./user-info.vue"; // 用户信息
import SettingPassword from "./setting-password.vue"; // 设置密码
import { useAntdForm, useFormRules } from "@/hooks/common/form";
import { STATUS, SEX } from "@/enum";
import { getOrganazationList, getPostList } from "@/service/api";
import { pick, keys } from "lodash-es";

defineOptions({
  name: "OperateModal",
});

const current = ref<number>(0);
// 是否请求中
const loading = ref(false);

const next = async () => {
  await validate().then(() => {
    current.value++;
  });
};
const prev = () => {
  current.value--;
};

// 获取组织列表
const organazationList = ref<Api.Administrative.Organization[]>([]);
const fetchOrganazationList = async () => {
  const { error, data } = await getOrganazationList();

  if (!error) {
    organazationList.value = data.records;
  }
};

// 获取岗位列表
const postList = ref<Api.Administrative.PostManage[]>([]);
const fetchPostList = async () => {
  const { error, data } = await getPostList();

  if (!error) {
    postList.value = data.records;
  }
};

// 父组件传递的值
type Props = {
  operateType: AntDesign.TableOperateType; // 操作类型
  rowData?: Api.SystemManage.UserManage | null; // 编辑数据
  dataSource: Api.SystemManage.UserManage[]; // 父级
};
const props = defineProps<Props>();

// 抽屉显示状态
const visible = defineModel<boolean>("visible", {
  default: false,
});

const { formRef, validate, resetFields } = useAntdForm();
const { defaultRequiredRule, formRules } = useFormRules();

// 抽屉标题
const title = computed(() => {
  const titles: Record<AntDesign.TableOperateType, string> = {
    add: $t("page.systemManage.userManage.addUser"),
    edit: $t("page.systemManage.userManage.editUser"),
  };
  return titles[props.operateType];
});

const model: Api.SystemManage.SaveUserManage = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.SaveUserManage {
  return {
    userName: "",
    cnName: "",
    phone: "",
    email: "",
    sex: SEX.MALE,
    status: STATUS.ACTIVE,
    sort: 1,
    orgId: undefined,
    postId: undefined,
    city: [],
    address: undefined,
    tags: [],
    password: "",
  };
}

// 表单校验的 key
type RuleKey = Extract<
  keyof Api.SystemManage.SaveUserManage,
  | "userName"
  | "cnName"
  | "phone"
  | "email"
  | "orgId"
  | "postId"
  | "city"
  | "tags"
  | "password"
>;

const rules: Record<RuleKey, App.Global.FormRule | App.Global.FormRule[]> = {
  userName: formRules.userName,
  cnName: defaultRequiredRule,
  phone: formRules.phone,
  email: formRules.email,
  orgId: defaultRequiredRule,
  postId: defaultRequiredRule,
  city: defaultRequiredRule,
  tags: { ...defaultRequiredRule, trigger: "change" },
  password: defaultRequiredRule,
};

// 初始化
async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === "edit" && props.rowData) {
    await nextTick();
    Object.assign(model, props.rowData);
  }
}

// 分部表单子项
const steps = [
  {
    title: $t("page.systemManage.userManage.personalInfo"),
    content: PersonalInfo,
  },
  { title: $t("page.systemManage.userManage.userInfo"), content: UserInfo },
  {
    title: $t("page.systemManage.userManage.settingPassword"),
    content: SettingPassword,
  },
];
const items = steps.map((item) => ({ key: item.title, title: item.title }));

// 关闭弹窗
const closeModal = () => {
  visible.value = false;
};

// 提交数据
async function handleSubmit() {
  await validate().then(async () => {
    loading.value = true;
    // 判断是否新增
    const isAdd = props.operateType === "add";
    // 获取参数
    const params = {
      id: isAdd ? undefined : model.id,
      ...pick(model, keys(createDefaultModel())),
    };
    console.log("params", params);
  });
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    resetFields();
    fetchOrganazationList();
    fetchPostList();
    current.value = 0;
  }
});
</script>
<template>
  <AModal
    v-model:open="visible"
    :title="title"
    :width="800"
    @cancel="closeModal"
  >
    <ASpace direction="vertical" size="middle" :style="{ width: '100%' }">
      <ASteps :current="current" :items="items" />
      <AForm ref="formRef" layout="vertical" :model="model" :rules="rules">
        <ARow :gutter="16">
          <component
            :is="steps[current].content"
            :model="model"
            :organazationList="organazationList"
            :postList="postList"
          />
        </ARow>
      </AForm>
    </ASpace>
    <template #footer>
      <AButton v-if="current > 0" style="margin-left: 8px" @click="prev">{{
        $t("common.prevStep")
      }}</AButton>
      <AButton v-if="current < steps.length - 1" type="primary" @click="next">{{
        $t("common.nextStep")
      }}</AButton>
      <AButton
        v-if="current == steps.length - 1"
        type="primary"
        @click="handleSubmit"
      >
        {{ $t("common.commit") }}
      </AButton>
    </template>
  </AModal>
</template>
