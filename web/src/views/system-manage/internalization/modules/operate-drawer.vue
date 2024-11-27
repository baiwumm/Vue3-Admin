<script setup lang="ts">
import { pick } from 'lodash-es';
import { computed, nextTick, reactive, ref, watch } from 'vue';

import { InternalizationLanguage } from '@/constants';
import { I18nEntry, I18nInternalization, I18nSelect } from '@/constants/i18n';
import { OPERATION_TYPE } from '@/enum';
import { I18N_COMMON, I18N_FORM } from '@/enum/i18n';
import { useAntdForm, useFormRules } from '@/hooks/common/form';
import { $t } from '@/locales';
import { createInternalization, updateInternalization } from '@/service/api';

defineOptions({
  name: 'OperateDrawer',
});

// 是否请求中
const loading = ref(false);

// 父组件传递的值
type Props = {
  operateType: AntDesign.TableOperateType; // 操作类型
  rowData?: Api.SystemManage.SaveInternalization | null; // 编辑数据
  dataSource: Api.SystemManage.SaveInternalization[]; // 父级
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

const { formRef, validate, resetFields } = useAntdForm();
const { defaultRequiredRule } = useFormRules();

// 抽屉标题
const title = computed(() => I18nInternalization(`${props.operateType}Internalization`));

const model: Api.SystemManage.SaveInternalization = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.SaveInternalization {
  return {
    parentId: null,
    name: '',
    zhCN: '',
    enUS: '',
    jaJP: '',
    zhTW: '',
  };
}

// 表单校验的 key
type RuleKey = Extract<keyof Api.SystemManage.SaveInternalization, 'name'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
};

// 初始化
async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
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
      ...pick(model, ['name', 'zhCN', 'enUS', 'jaJP', 'zhTW']),
      parentId: model.parentId || null,
    };
    await (isAdd ? createInternalization : updateInternalization)(params)
      .then(({ error }) => {
        if (!error) {
          window.$message?.success($t(`common.${props.operateType}Success`));
          closeDrawer();
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
  <ADrawer v-model:open="visible" :title="title" :width="360">
    <AForm ref="formRef" layout="vertical" :model="model" :rules="rules">
      <AFormItem :label="$t(I18N_FORM.PARENT)" name="parentId" :tooltip="$t(I18N_FORM.PARENT_TIP)">
        <ATreeSelect
          v-model:value="model.parentId"
          show-search
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :placeholder="I18nSelect()"
          allow-clear
          tree-default-expand-all
          :tree-data="dataSource"
          tree-node-filter-prop="name"
          :field-names="{ value: 'id', label: 'name' }"
          class="w-full"
        >
          <template #title="{ name }">
            <ASpace align="center">
              <SvgIcon icon="ri:font-size" class="inline-block" :style="{ verticalAlign: '-2px' }" />
              {{ name }}
            </ASpace>
          </template>
        </ATreeSelect>
      </AFormItem>
      <AFormItem :label="I18nInternalization('name')" name="name">
        <AInput
          v-model:value="model.name"
          show-count
          :maxlength="32"
          :placeholder="I18nEntry(I18nInternalization('name'))"
        />
      </AFormItem>
      <AFormItem
        v-for="language in InternalizationLanguage"
        :key="language"
        :label="I18nInternalization(`${language.replace('-', '')}`)"
        :name="language"
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
          :placeholder="I18nEntry(I18nInternalization(`${language.replace('-', '')}`))"
        />
      </AFormItem>
    </AForm>
    <template #footer>
      <ASpace :size="16">
        <AButton @click="closeDrawer">{{ $t(I18N_COMMON.CANCEL) }}</AButton>
        <AButton type="primary" :loading="loading" @click="handleSubmit">{{ $t(I18N_COMMON.CONFIRM) }}</AButton>
      </ASpace>
    </template>
  </ADrawer>
</template>
