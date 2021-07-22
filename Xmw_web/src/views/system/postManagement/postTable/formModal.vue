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
import { BasicModal, useModalInner } from '/@/components/Modal'; //引入模态框
import { BasicForm, useForm } from '/@/components/Form'; //引入表单组件
import { dataFormSchema } from './data'; // 引入表单
import { useMessage } from '/@/hooks/web/useMessage';
import { postSave } from '/@/api/system/postManagement'; // 新增和更新组织
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典列表接口
export default defineComponent({
  name: 'FormModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { createMessage } = useMessage();

    const isUpdate = ref(true);
    const rowId = ref('');
    // 注册表单
    const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
      labelWidth: 100,
      schemas: dataFormSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 23,
      },
      baseColProps: { lg: 12, md: 24 },
    });
    // useModalInner用于独立的 Modal 内部调用
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        rowId.value = data.record.postId;
        setFieldsValue({
          ...data.record,
        });
      }
      //   判断父级是否删除操作
      if (data.isDel) {
        // 操作成功后重新请求下拉树列表
        updateSchema({
          field: 'parentId',
          componentProps: {
            params: { key: Math.random() },
          },
        });
      }
      //   请求状态和组织类型
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

    const getTitle = computed(() => (!unref(isUpdate) ? '新增岗位' : '编辑岗位'));
    // 新增编辑操作
    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        !unref(isUpdate)
          ? await postSave({ ...values })
          : await postSave({
              ...values,
              postId: rowId.value,
            });
        !unref(isUpdate)
          ? createMessage.success('新增成功！')
          : createMessage.success('编辑成功！');
        closeModal();
        emit('success', {
          isUpdate: unref(isUpdate),
          values: { ...values, postId: rowId.value },
        });
        // 操作成功后重新请求下拉树列表
        updateSchema({
          field: 'parentId',
          componentProps: {
            params: { key: Math.random() },
          },
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }
    return { registerModal, registerForm, getTitle, handleSubmit };
  },
});
</script>
