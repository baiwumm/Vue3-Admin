<script setup lang="ts">
import { keys, values } from 'lodash-es';
import { computed } from 'vue';
import zxcvbn from 'zxcvbn'; // 密码强度校验

defineOptions({
  name: 'StrengthMeter',
});

// 父组件传递的值
type Props = {
  formData: Record<string, string>;
};
const props = defineProps<Props>();

// 父组件自定义事件
interface Emits {
  (e: 'update:model', value: Record<string, string>): void;
}
const emit = defineEmits<Emits>();

const model = computed(() => {
  return new Proxy(props.formData, {
    set(_, prop, newValue) {
      emit('update:model', {
        [prop]: newValue,
      });
      return true;
    },
  });
});

/** @description: 密码强度配置项 */
const strengthMeterOptions: Record<string, string> = {
  veryWeak: '#e74242',
  weak: '#EFBD47',
  general: '#ffa500',
  strong: '#1bbf1b',
  veryStrong: '#008000',
};

/**
 * @param {string} password
 * @description: 监听密码强度相应变化
 */
const watchStrength = (password: string): number => {
  const analysisValue = zxcvbn(password);
  // score得分只有0~4，且只有整数范围并没有小数
  return (analysisValue.score + 1) * 20;
};
</script>

<template>
  <ACol :span="24">
    <AFormItem name="password" :label="$t('page.systemManage.userManage.password')">
      <AInputPassword v-model:value="model.password" size="large" :placeholder="$t('page.login.passwordPlaceholder')" />
    </AFormItem>
  </ACol>
  <ACol :span="24">
    <AFormItem name="confirmPassword" :label="$t('page.systemManage.userManage.confirmPassword')">
      <AInputPassword
        v-model:value="model.confirmPassword"
        size="large"
        :placeholder="$t('form.confirmPwd.required')"
      />
    </AFormItem>
  </ACol>
  <!-- 显示密码强度 -->
  <div class="process-steps">
    <AProgress
      :percent="model.password ? watchStrength(model.password) : 0"
      :steps="5"
      :stroke-color="values(strengthMeterOptions)"
      :show-info="false"
    />
    <ARow justify="space-around">
      <ACol v-for="value in keys(strengthMeterOptions)" :key="value" :span="4">
        {{ $t(`components.strengthMeter.${value}`) }}
      </ACol>
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
