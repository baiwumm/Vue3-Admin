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
import { BasicModal, useModalInner } from '/@/components/Modal'; //模态框组件
import { BasicForm, useForm } from '/@/components/Form'; //表单组件
import { dataFormSchema } from './data'; // 表单配置项
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { internationaSave } from '/@/api/system/internationalManagement'; // 国际化接口
export default defineComponent({
  name: 'interTable',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { createMessage } = useMessage();

    const isUpdate = ref(true);
    const rowId = ref('');
    // 注册表单
    const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
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
        rowId.value = data.record.internation_id;
        setFieldsValue({
          ...data.record,
        });
      }
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增国际化字段' : '编辑国际化字段'));
    // 新增编辑操作
    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // 根据操作拼接表单参数
        let params = { ...values };
        if (unref(isUpdate)) Object.assign(params, { internation_id: rowId.value });
        await internationaSave(params);
        createMessage.success(!unref(isUpdate) ? '新增成功！' : '编辑成功！');
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
