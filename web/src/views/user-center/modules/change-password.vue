<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import { I18N_COMMON } from '@/enum/i18n';
import { useAntdForm, useFormRules } from '@/hooks/common/form';
import { $t } from '@/locales';
import { changePassword, fetchLogout } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'ChangePassword',
});

const authStore = useAuthStore();

// 是否请求中
const loading = ref(false);

const { formRef } = useAntdForm();

const model: Api.SystemManage.EditPassword = reactive({
  oldPassword: '',
  password: '',
  confirmPassword: '',
});

// 表单校验的 key
type RuleKey = Extract<keyof Api.SystemManage.EditPassword, 'oldPassword' | 'password' | 'confirmPassword'>;

const rules = computed<Record<RuleKey, App.Global.FormRule | App.Global.FormRule[]>>(() => {
  const { createConfirmPwdRule, formRules } = useFormRules();

  return {
    oldPassword: formRules.oldPwd,
    password: formRules.pwd,
    confirmPassword: createConfirmPwdRule(model.password || ''),
  };
});

// 更新 model 的值
const updateModel = (args: Partial<Api.SystemManage.SaveUserManage>) => {
  Object.assign(model, args);
};

// 提交数据
async function handleSubmit(values: Api.SystemManage.EditPassword) {
  loading.value = true;
  // 请求接口
  const { error } = await changePassword({
    password: values.oldPassword,
    newPassword: values.password,
  });
  if (!error) {
    window.$message?.success($t(`common.editSuccess`));
    // 退出重新登录
    await fetchLogout();
    authStore.resetStore();
  }
  loading.value = false;
}
</script>

<template>
  <AForm ref="formRef" layout="vertical" :model="model" :rules="rules" @finish="handleSubmit">
    <ACol :span="24">
      <AFormItem name="oldPassword" :label="$t('form.oldPwd.label')">
        <AInputPassword v-model:value="model.oldPassword" size="large" :placeholder="$t('form.oldPwd.required')" />
      </AFormItem>
    </ACol>
    <StrengthMeter v-model:form-data="model" @update:model="updateModel" />
    <ARow justify="center" class="mt-2">
      <AButton type="primary" html-type="submit" :loading="loading" block>
        {{ $t(I18N_COMMON.COMMIT) }}
      </AButton>
    </ARow>
  </AForm>
</template>
