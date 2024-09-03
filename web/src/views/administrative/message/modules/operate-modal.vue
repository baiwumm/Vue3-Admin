<script setup lang="ts">
import { SimpleScrollbar } from '@sa/materials';
import { pick } from 'lodash-es';
import { computed, nextTick, reactive, ref, watch } from 'vue';

import { StatueOptions } from '@/constants';
import { OPERATION_TYPE, STATUS } from '@/enum';
import { useAntdForm, useFormRules } from '@/hooks/common/form';
import { $t } from '@/locales';
import { createMessage, updateMessage } from '@/service/api';

import WangeEditor from './wange-editor.vue';

defineOptions({
  name: 'OperateModal',
});

// 是否请求中
const loading = ref(false);

// 父组件传递的值
type Props = {
  operateType: AntDesign.TableOperateType; // 操作类型
  rowData?: Api.Administrative.Message | null; // 编辑数据
  locales: (field: string) => string;
};
const props = defineProps<Props>();

const placeholder = (field: string) => $t('form.enter') + props.locales(field);

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
const modalTitle = computed(() => props.locales(`${props.operateType}Message`));

const model: Api.Administrative.SaveMessage = reactive(createDefaultModel());

function createDefaultModel(): Api.Administrative.SaveMessage {
  return {
    title: '',
    content: '',
    status: STATUS.ACTIVE,
    pinned: false,
  };
}

// 表单校验的 key
type RuleKey = Extract<keyof Api.Administrative.SaveMessage, 'title' | 'content'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  title: defaultRequiredRule,
  content: defaultRequiredRule,
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
      ...pick(model, ['title', 'content', 'status', 'pinned']),
    };
    await (isAdd ? createMessage : updateMessage)(params)
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
        <AForm ref="formRef" :model="model" :rules="rules" label-wrap class="pr-20px" layout="vertical">
          <ARow>
            <ACol :span="24">
              <AFormItem :label="locales('title')" name="title">
                <AInput v-model:value="model.title" :placeholder="placeholder('title')" :maxlength="50" show-count />
              </AFormItem>
            </ACol>
            <ACol :span="12">
              <AFormItem :label="locales('pinned')" name="pinned">
                <ARadioGroup v-model:value="model.pinned" button-style="solid">
                  <ARadioButton :value="true">{{ $t('common.yesOrNo.yes') }}</ARadioButton>
                  <ARadioButton :value="false">{{ $t('common.yesOrNo.no') }}</ARadioButton>
                </ARadioGroup>
              </AFormItem>
            </ACol>
            <ACol :span="12">
              <AFormItem :label="$t('form.status')" name="status">
                <ARadioGroup v-model:value="model.status" :options="StatueOptions" />
              </AFormItem>
            </ACol>
            <ACol :span="24">
              <AFormItem :label="locales('content')" name="content">
                <WangeEditor v-model="model.content" :visible="visible" />
              </AFormItem>
            </ACol>
          </ARow>
        </AForm>
      </SimpleScrollbar>
    </div>
  </AModal>
</template>
