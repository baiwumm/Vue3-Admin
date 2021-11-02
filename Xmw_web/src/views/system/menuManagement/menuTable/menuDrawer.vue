<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="600px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { menuSave } from '/@/api/system/menuManagement'; // 菜单保存接口
import { ref, computed, unref, defineEmits } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'; // 抽屉组件
import { BasicForm, useForm } from '/@/components/Form/index'; // 表单组件
import { dataFormSchema } from './data'; //表单配置项
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置

const emit = defineEmits(['success', 'register']);
const { t } = useI18n();
const { createMessage } = useMessage();

const isUpdate = ref<boolean>(true);
const rowId = ref<string>('');
let firstLoad = ref<boolean>(true); // 判断是否第一次加载表单
const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
  //注册表单
  labelWidth: 120,
  schemas: dataFormSchema,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23,
  },
  baseColProps: { lg: 12, md: 24 },
});

const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
  // 注册抽屉
  resetFields();
  setDrawerProps({ confirmLoading: false });
  isUpdate.value = !!data?.isUpdate;

  if (unref(isUpdate)) {
    rowId.value = data.record.menu_id;
    setFieldsValue({
      ...data.record,
    });
  }
  // 判断父级是否删除操作
  if (data.isDel) {
    // 操作成功后重新请求下拉树列表
    updateSchema({
      field: 'parent_id',
      componentProps: {
        params: { key: Math.random() },
      },
    });
  }

  if (firstLoad.value) {
    //   请求字典数据
    let params = {
      dict_coding:
        'system_menu_type,system_menu_transitionName,system_menu_hideChild,system_menu_keepAlive,system_menu_affix,system_menu_hideTab,system_isHide,system_status',
    };
    await dictionaryModel(params).then((res) => {
      updateSchema([
        {
          field: 'menu_type',
          componentProps: {
            options: res.system_menu_type,
          },
        },
        {
          field: 'transition_name',
          componentProps: {
            options: res.system_menu_transitionName,
          },
        },
        {
          field: 'hide_childrenIn_menu',
          componentProps: {
            options: res.system_menu_hideChild,
          },
        },
        {
          field: 'ignore_keep_alive',
          componentProps: {
            options: res.system_menu_keepAlive,
          },
        },
        {
          field: 'affix',
          componentProps: {
            options: res.system_menu_affix,
          },
        },
        {
          field: 'hide_tab',
          componentProps: {
            options: res.system_menu_hideTab,
          },
        },
        {
          field: 'hide_menu',
          componentProps: {
            options: res.system_isHide,
          },
        },
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
  !unref(isUpdate) ? t('router.system.menuManagement.add') : t('router.system.menuManagement.edit')
);

async function handleSubmit() {
  try {
    const values = await validate();
    setDrawerProps({ confirmLoading: true });
    // 根据操作拼接表单参数
    let params = { ...values };
    if (unref(isUpdate)) Object.assign(params, { menu_id: rowId.value });
    await menuSave(params);
    createMessage.success(
      !unref(isUpdate) ? t('router.common.addSuccess') : t('router.common.editSuccess')
    );
    closeDrawer();
    emit('success');
    // 操作成功后重新请求下拉树列表
    updateSchema({
      field: 'parent_id',
      componentProps: {
        params: { key: Math.random() },
      },
    });
  } finally {
    setDrawerProps({ confirmLoading: false });
  }
}
</script>
