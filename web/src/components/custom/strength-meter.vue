<script setup lang="ts">
import zxcvbn from "zxcvbn"; // 密码强度校验
import { values, keys } from "lodash-es";

// 父组件传递的值
type Props = {
  model: Api.SystemManage.SaveUserManage;
};
defineProps<Props>();

/**
 * @description: 密码强度配置项
 */
const strengthMeterOptions: Record<string, string> = {
  veryWeak: "#e74242",
  weak: "#EFBD47",
  general: "#ffa500",
  strong: "#1bbf1b",
  veryStrong: "#008000",
};

/**
 * @description: 监听密码强度相应变化
 * @param {string} password
 */
const watchStrength = (password: string): number => {
  const analysisValue = zxcvbn(password);
  // score得分只有0~4，且只有整数范围并没有小数
  return (analysisValue.score + 1) * 20;
};
</script>

<template>
  <ACol :span="24">
    <AFormItem
      name="password"
      :label="$t('page.systemManage.userManage.password')"
    >
      <AInputPassword
        v-model:value="model.password"
        size="large"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </AFormItem>
  </ACol>
  <ACol :span="24">
    <AFormItem
      name="confirmPassword"
      :label="$t('page.systemManage.userManage.confirmPassword')"
    >
      <AInputPassword
        v-model:value="model.confirmPassword"
        size="large"
        :placeholder="$t('page.login.common.confirmPasswordPlaceholder')"
      />
    </AFormItem>
  </ACol>
  <!-- 显示密码强度 -->
  <div class="process-steps">
    <AProgress
      :percent="model.password ? watchStrength(model.password) : 0"
      :steps="5"
      :strokeColor="values(strengthMeterOptions)"
      :showInfo="false"
    />
    <ARow justify="space-around">
      <ACol
        :span="4"
        :key="value"
        v-for="value in keys(strengthMeterOptions)"
        >{{ $t(`components.strengthMeter.${value}`) }}</ACol
      >
    </ARow>
  </div>
</template>

<style scoped lang="scss">
.process-steps {
  width: 100%;
  text-align: center;
  :deep(.ant-progress) {
    width: 100%;
    .ant-progress-steps-item {
      width: calc(20% - 2px) !important;
    }
  }
}
</style>
