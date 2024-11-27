<script setup lang="ts">
import type { StepsProps } from 'ant-design-vue/es/steps';
import { initial, keys, omit, pick } from 'lodash-es';
import { computed, nextTick, reactive, ref, watch } from 'vue';

import ImgCorpper from '@/components/custom/img-corpper.vue';
import StrengthMeter from '@/components/custom/strength-meter.vue';
import { I18nUser } from '@/constants/i18n';
import { OPERATION_TYPE, SEX, STATUS } from '@/enum';
import { I18N_COMMON } from '@/enum/i18n';
import { useAntdForm, useFormRules } from '@/hooks/common/form';
import { $t } from '@/locales';
import { createUser, getOrganazationList, getPostList, getRoleList, updateUser } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';

import PersonalInfo from './personal-info.vue'; // 个人信息
import UserInfo from './user-info.vue'; // 用户信息

defineOptions({
  name: 'OperateModal',
});

const authStore = useAuthStore();

const current = ref<number>(0);
// 是否请求中
const loading = ref(false);

const { formRef, validate, resetFields } = useAntdForm();

const next = async () => {
  await validate().then(() => {
    current.value += 1;
  });
};
const prev = () => {
  current.value -= 1;
};

// 获取角色列表
const roleList = ref<Api.SystemManage.RoleManage[]>([]);
const fetchRoleList = async () => {
  const { error, data } = await getRoleList({ current: 1, size: 999 });

  if (!error) {
    roleList.value = data.records;
  }
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
};
const props = defineProps<Props>();

// 父组件自定义事件
interface Emits {
  (e: 'submitted'): void;
}
const emit = defineEmits<Emits>();

// 抽屉显示状态
const visible = defineModel<boolean>('visible', {
  default: false,
});

// 抽屉标题
const title = computed(() => I18nUser(`${props.operateType}User`));

const model: Api.SystemManage.SaveUserManage = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.SaveUserManage {
  return {
    userName: '',
    cnName: '',
    phone: '',
    email: '',
    sex: SEX.MALE,
    status: STATUS.ACTIVE,
    sort: 1,
    roleId: undefined,
    orgId: undefined,
    postId: undefined,
    city: [],
    address: undefined,
    tags: [],
    avatar: '',
    password: '',
    confirmPassword: '',
  };
}

// 表单校验的 key
type RuleKey = Extract<
  keyof Api.SystemManage.SaveUserManage,
  | 'userName'
  | 'cnName'
  | 'phone'
  | 'email'
  | 'roleId'
  | 'orgId'
  | 'postId'
  | 'city'
  | 'tags'
  | 'avatar'
  | 'password'
  | 'confirmPassword'
>;

const rules = computed<Record<RuleKey, App.Global.FormRule | App.Global.FormRule[]>>(() => {
  const { defaultRequiredRule, formRules, createConfirmPwdRule } = useFormRules();

  return {
    userName: formRules.userName,
    cnName: defaultRequiredRule,
    phone: formRules.phone,
    email: formRules.email,
    roleId: defaultRequiredRule,
    orgId: defaultRequiredRule,
    postId: defaultRequiredRule,
    city: defaultRequiredRule,
    tags: { ...defaultRequiredRule, trigger: 'change' },
    avatar: defaultRequiredRule,
    password: formRules.pwd,
    confirmPassword: createConfirmPwdRule(model.password || ''),
  };
});

// 分部表单子项
const steps = [
  {
    title: I18nUser('personalInfo'),
    content: PersonalInfo,
  },
  { title: I18nUser('userInfo'), content: UserInfo },
  {
    title: I18nUser('settingAvatar'),
    content: ImgCorpper,
  },
  {
    title: I18nUser('settingPassword'),
    content: StrengthMeter,
  },
];
const items = ref<StepsProps['items']>([]);

// 初始化
async function handleInitModel() {
  Object.assign(model, createDefaultModel());
  items.value = steps.map(item => ({ key: item.title, title: item.title }));
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
const updateModel = (args: Partial<Api.SystemManage.SaveUserManage>) => {
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
        'password',
        'confirmPassword',
      ]) as Api.SystemManage.SaveUserManage),
    };
    // 只有新增的时候才传递密码参数
    if (isAdd) {
      Object.assign(params, {
        password: model.password,
      });
    }
    await (isAdd ? createUser : updateUser)(params)
      .then(async ({ error }) => {
        if (!error) {
          window.$message?.success($t(`common.${props.operateType}Success`));
          closeModal();
          emit('submitted');
          // 判断是否跟新的是当前用户，是则重新拉取用户信息
          if (!isAdd && model.id === authStore.userInfo.id) {
            await authStore.initUserInfo();
          }
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
    fetchRoleList();
    fetchOrganazationList();
    fetchPostList();
    current.value = 0;
  }
});
</script>

<template>
  <AModal v-model:open="visible" :title="title" :width="800" @cancel="closeModal">
    <ASpace direction="vertical" size="middle" class="w-full">
      <ASteps :current="current" :items="items" />
      <AForm ref="formRef" layout="vertical" :model="model" :rules="rules">
        <component
          :is="steps[current].content"
          v-model:form-data="model"
          v-model="model.avatar"
          :role-list="roleList"
          :organazation-list="organazationList"
          :post-list="postList"
          show-tag
          @update:model="updateModel"
        />
      </AForm>
    </ASpace>
    <template #footer>
      <AButton v-if="current > 0" :disable="loading" class="ml-2" @click="prev">
        {{ $t(I18N_COMMON.PREV) }}
      </AButton>
      <AButton v-if="items && current < items.length - 1" type="primary" :disable="loading" @click="next">
        {{ $t(I18N_COMMON.NEXT) }}
      </AButton>
      <AButton v-if="items && current === items.length - 1" type="primary" :loading="loading" @click="handleSubmit">
        {{ $t(I18N_COMMON.COMMIT) }}
      </AButton>
    </template>
  </AModal>
</template>
