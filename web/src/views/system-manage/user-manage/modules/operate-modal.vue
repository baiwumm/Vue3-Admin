<script setup lang="ts">
import { computed, ref, reactive, watch, nextTick } from "vue";
import { $t } from "@/locales";
import PersonalInfo from "./personal-info.vue"; // 个人信息
import UserInfo from "./user-info.vue"; // 用户信息
import { useAntdForm, useFormRules } from "@/hooks/common/form";
import { STATUS, SEX, OPERATION_TYPE } from "@/enum";
import { getOrganazationList, getPostList } from "@/service/api";
import { pick, keys, omit, initial } from "lodash-es";
import StrengthMeter from "@/components/custom/strength-meter.vue";
import { createUser, updateUser } from "@/service/api";
import SettingAvatar from "./setting-avatar.vue";
import type { StepsProps } from "ant-design-vue/es/steps";

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

// 抽屉标题
const title = computed(() => props.locales(`${props.operateType}User`));

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
    avatar: "",
    password: "",
    confirmPassword: "",
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
  | "avatar"
  | "password"
  | "confirmPassword"
>;

const rules = computed<
  Record<RuleKey, App.Global.FormRule | App.Global.FormRule[]>
>(() => {
  const { defaultRequiredRule, formRules, createConfirmPwdRule } =
    useFormRules();

  return {
    userName: formRules.userName,
    cnName: defaultRequiredRule,
    phone: formRules.phone,
    email: formRules.email,
    orgId: defaultRequiredRule,
    postId: defaultRequiredRule,
    city: defaultRequiredRule,
    tags: { ...defaultRequiredRule, trigger: "change" },
    avatar: defaultRequiredRule,
    password: formRules.pwd,
    confirmPassword: createConfirmPwdRule(model.password || ""),
  };
});

// 分部表单子项
const steps = [
  {
    title: props.locales("personalInfo"),
    content: PersonalInfo,
  },
  { title: props.locales("userInfo"), content: UserInfo },
  {
    title: props.locales("settingAvatar"),
    content: SettingAvatar,
  },
  {
    title: props.locales("settingPassword"),
    content: StrengthMeter,
  },
];
const items = ref<StepsProps["items"]>([]);

// 初始化
async function handleInitModel() {
  Object.assign(model, createDefaultModel());
  items.value = steps.map((item) => ({ key: item.title, title: item.title }));
  if (props.operateType === OPERATION_TYPE.EDIT && props.rowData) {
    await nextTick();
    Object.assign(model, props.rowData);
    items.value = initial(items.value);
  }
}

// 关闭弹窗
const closeModal = () => {
  visible.value = false;
};

// 更新 model 的值
const updateModel = (...args: unknown[]) => {
  Object.assign(model, args);
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
      ...(omit(pick(model, keys(createDefaultModel())), [
        "password",
        "confirmPassword",
      ]) as Api.SystemManage.SaveUserManage),
    };
    // 只有新增的时候才传递密码参数
    if (isAdd) {
      Object.assign(params, {
        password: model.password,
      });
    }
    await (isAdd ? createUser : updateUser)(params)
      .then(({ error }) => {
        if (!error) {
          window.$message?.success(
            $t(`common.${isAdd ? "add" : "update"}Success`),
          );
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
            :organazationList="current === 1 ? organazationList : undefined"
            :postList="current === 1 ? postList : undefined"
            :locales="locales"
            @update:model="updateModel"
          />
        </ARow>
      </AForm>
    </ASpace>
    <template #footer>
      <AButton
        v-if="current > 0"
        style="margin-left: 8px"
        @click="prev"
        :disable="loading"
        >{{ $t("common.prevStep") }}</AButton
      >
      <AButton
        v-if="items && current < items.length - 1"
        type="primary"
        @click="next"
        :disable="loading"
        >{{ $t("common.nextStep") }}</AButton
      >
      <AButton
        v-if="items && current === items.length - 1"
        type="primary"
        @click="handleSubmit"
        :loading="loading"
      >
        {{ $t("common.commit") }}
      </AButton>
    </template>
  </AModal>
</template>
