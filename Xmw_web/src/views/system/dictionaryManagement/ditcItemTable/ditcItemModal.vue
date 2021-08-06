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
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form';
import { dataFormSchema } from './data';
import { useMessage } from '/@/hooks/web/useMessage';
import { dictionarySave, dictionaryModel } from '/@/api/system/dictionaryManagement'; // 新增和更新字典
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
export default defineComponent({
  name: 'DitcItemModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { t } = useI18n();
    const { createMessage } = useMessage();

    const isUpdate = ref(true);
    const rowId = ref('');
    const parent_id = ref('');

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
      parent_id.value = data?.parent_id;

      if (unref(isUpdate)) {
        rowId.value = data.record.dictionary_id;
        setFieldsValue({
          ...data.record,
        });
      }
      // 请求字典状态
      const statusOptions = await dictionaryModel({ dict_coding: 'system_status' });
      updateSchema([
        {
          field: 'status',
          componentProps: {
            options: statusOptions,
          },
        },
      ]);
    });

    const getTitle = computed(() =>
      !unref(isUpdate) ? t('router.common.ditcItemAdd') : t('router.common.ditcItemEdit')
    );

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // 根据操作拼接表单参数
        let params = { ...values, parent_id: parent_id.value };
        if (unref(isUpdate)) Object.assign(params, { dictionary_id: rowId.value });
        await dictionarySave(params);
        createMessage.success(
          !unref(isUpdate) ? t('router.common.addSuccess') : t('router.common.editSuccess')
        );
        closeModal();
        emit('success');
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  },
});
</script>
