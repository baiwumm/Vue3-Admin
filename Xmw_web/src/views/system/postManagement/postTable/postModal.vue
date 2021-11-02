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
import { BasicModal, useModalInner } from '/@/components/Modal'; //模态框组件
import { BasicForm, useForm } from '/@/components/Form'; //表单组件
import { dataFormSchema } from './data'; // 表单配置项
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { postSave } from '/@/api/system/postManagement'; // 新增和更新组织
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置

const emit = defineEmits(['success', 'register']);
const { t } = useI18n();
const { createMessage } = useMessage();

const isUpdate = ref<boolean>(true);
const rowId = ref<string>('');
let firstLoad = ref<boolean>(true); // 判断是否第一次加载表单
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
    rowId.value = data.record.post_id;
    setFieldsValue({
      ...data.record,
    });
  }
  //  添加子级
  if (data.parent_id) {
    setFieldsValue({
      parent_id: data.parent_id,
    });
  }
  //   判断父级是否删除操作
  if (data.isDel) {
    // 操作成功后重新请求下拉树列表
    updateSchema({
      field: 'parent_id',
      componentProps: {
        params: { key: Math.random() },
      },
    });
  }
  updateSchema([
    {
      field: 'parent_id',
      componentProps: { disabled: !!data?.parent_id },
    },
  ]);

  if (firstLoad.value) {
    //   请求状态和组织类型
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
  !unref(isUpdate) ? t('router.system.postManagement.add') : t('router.system.postManagement.edit')
);
// 新增编辑操作
async function handleSubmit() {
  try {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    // 根据操作拼接表单参数
    let params = { ...values };
    if (unref(isUpdate)) Object.assign(params, { post_id: rowId.value });
    await postSave(params);
    createMessage.success(
      !unref(isUpdate) ? t('router.common.addSuccess') : t('router.common.editSuccess')
    );
    closeModal();
    emit('success');
    // 操作成功后重新请求下拉树列表
    updateSchema({
      field: 'parent_id',
      componentProps: {
        params: { key: Math.random() },
      },
    });
  } finally {
    setModalProps({ confirmLoading: false });
  }
}
</script>
