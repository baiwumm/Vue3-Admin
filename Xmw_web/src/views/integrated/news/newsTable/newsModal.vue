<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    width="1000px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, computed, unref, defineEmits } from 'vue'; // 引入 Composition-API
import { BasicModal, useModalInner } from '/@/components/Modal'; //模态框组件
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { BasicForm, useForm } from '/@/components/Form'; //表单组件
import { dataFormSchema } from './data'; // 表单配置项
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { newsSave } from '/@/api/integrated/news'; // 新闻公告保存接口
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置

const emit = defineEmits(['success', 'register']); // 声明emit
const { createMessage } = useMessage(); //消息函数
const { t } = useI18n(); // 国际化函数
const isUpdate = ref<boolean>(true); // 是否更新
const rowId = ref<string>(''); // 新闻公告id
let firstLoad = ref<boolean>(true); // 判断是否第一次加载表单
// 注册表单
const [registerForm, { setFieldsValue, resetFields, validate, updateSchema, clearValidate }] =
  useForm({
    labelWidth: 120,
    schemas: dataFormSchema,
    showActionButtonGroup: false,
    actionColOptions: { span: 23 },
    baseColProps: { lg: 12, md: 24 },
  });
// useModalInner用于独立的 Modal 内部调用
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  resetFields();
  setModalProps({ confirmLoading: false });
  isUpdate.value = !!data?.isUpdate;
  // 不知道为啥富文本内容没有重置，手动重置一下
  setFieldsValue({ content: '' });
  // 判断是否更新,表单赋值
  if (unref(isUpdate)) {
    rowId.value = data.record.news_id;
    setFieldsValue({ ...data.record });
  }
  clearValidate();
  // 判断是否第一次加载
  if (firstLoad.value) {
    await dictionaryModel({
      dict_coding: 'integrated_news_type,system_status,integrated_news_top',
    }).then((res) => {
      const newsType = res.integrated_news_type;
      const statusOptions = res.system_status;
      const placedTop = res.integrated_news_top;
      updateSchema([
        { field: 'type', componentProps: { options: newsType } },
        { field: 'status', componentProps: { options: statusOptions } },
        { field: 'placed_top', componentProps: { options: placedTop } },
      ]);
      firstLoad.value = false;
    });
  }
});
// 动态获取Modal标题
const getTitle = computed(
  () =>
    (!unref(isUpdate) ? t('router.common.add') : t('router.common.edit')) +
    ' ' +
    t('router.system.internationalManagement.internation_name')
);
// 新增编辑操作
async function handleSubmit() {
  try {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    // 根据操作拼接表单参数
    let params = { ...values };
    if (unref(isUpdate)) Object.assign(params, { news_id: rowId.value });
    await newsSave(params);
    createMessage.success(
      !unref(isUpdate) ? t('router.common.addSuccess') : t('router.common.editSuccess')
    );
    closeModal();
    emit('success');
  } finally {
    setModalProps({ confirmLoading: false });
  }
}
</script>
