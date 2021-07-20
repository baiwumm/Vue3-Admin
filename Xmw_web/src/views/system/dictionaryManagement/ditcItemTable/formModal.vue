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
export default defineComponent({
  name: 'FormModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { createMessage } = useMessage();

    const isUpdate = ref(true);
    const rowId = ref('');
    const parentId = ref('');

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
      parentId.value = data?.parentId;

      if (unref(isUpdate)) {
        rowId.value = data.record.dictionaryId;
        setFieldsValue({
          ...data.record,
        });
      }

      const statusOptions = await dictionaryModel({ dictCoding: 'system_status' });
      updateSchema([
        {
          field: 'status',
          componentProps: {
            options: statusOptions,
          },
        },
      ]);
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增字典' : '编辑字典'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        !unref(isUpdate)
          ? await dictionarySave({ ...values, parentId: parentId.value })
          : await dictionarySave({
              ...values,
              dictionaryId: rowId.value,
              parentId: parentId.value,
            });
        !unref(isUpdate)
          ? createMessage.success('新增成功！')
          : createMessage.success('编辑成功！');
        closeModal();
        emit('success', {
          isUpdate: unref(isUpdate),
          values: { ...values, dictionaryId: rowId.value, parentId: parentId.value },
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  },
});
</script>
