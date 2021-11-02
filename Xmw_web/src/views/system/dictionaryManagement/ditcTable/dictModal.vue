<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    width="720px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, computed, unref, defineEmits } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal'; // 模态框组件
import { BasicForm, useForm } from '/@/components/Form'; // 表单组件
import { dataFormSchema } from './data'; // 表单配置项
import { useMessage } from '/@/hooks/web/useMessage';
import { dictionarySave, dictionaryModel } from '/@/api/system/dictionaryManagement'; // 新增和更新字典
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
const emit = defineEmits(['success', 'register']);
const { createMessage } = useMessage();
const { t } = useI18n();
const isUpdate = ref<boolean>(true);
const rowId = ref<string>('');
let firstLoad = ref<boolean>(true); // 判断是否第一次加载表单
const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
  labelWidth: 100,
  schemas: dataFormSchema,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23,
  },
  baseColProps: { lg: 12, md: 24 },
});

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  resetFields();
  setModalProps({ confirmLoading: false });
  isUpdate.value = !!data?.isUpdate;
  // 判断是否编辑操作
  if (unref(isUpdate)) {
    rowId.value = data.record.dictionary_id;
    setFieldsValue({
      ...data.record,
    });
  }

  if (firstLoad.value) {
    // 请求字典状态
    await dictionaryModel({ dict_coding: 'system_status' }).then((res) => {
      updateSchema([
        {
          field: 'status',
          componentProps: {
            options: res.system_status,
          },
        },
      ]);
      firstLoad.value = false;
    });
  }
});

const getTitle = computed(() =>
  !unref(isUpdate) ? t('router.common.ditcAdd') : t('router.common.ditcEdit')
);

async function handleSubmit() {
  try {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    // 根据操作拼接表单参数
    let params = { ...values };
    if (unref(isUpdate)) Object.assign(params, { dictionary_id: rowId.value });
    await dictionarySave(params);
    createMessage.success(
      !unref(isUpdate) ? t('router.common.addSuccess') : t('router.common.editSuccess')
    );
    closeModal();
    emit('success', {
      isUpdate: unref(isUpdate),
      values: { ...values, dictionary_id: rowId.value },
    });
  } finally {
    setModalProps({ confirmLoading: false });
  }
}
</script>
