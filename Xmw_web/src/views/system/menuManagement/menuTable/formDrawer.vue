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
<script lang="ts">
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 引入字典列表接口
import { menuSave } from '/@/api/system/menuManagement';
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { BasicForm, useForm } from '/@/components/Form/index';
import { dataFormSchema } from './data';
import { useMessage } from '/@/hooks/web/useMessage';

export default defineComponent({
  name: 'FormModal',
  components: { BasicDrawer, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { createMessage } = useMessage();

    const isUpdate = ref(true);
    const rowId = ref('');

    const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
      labelWidth: 100,
      schemas: dataFormSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 23,
      },
      baseColProps: { lg: 12, md: 24 },
    });

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      resetFields();
      setDrawerProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        rowId.value = data.record.menuId;
        setFieldsValue({
          ...data.record,
        });
      }
      // 判断父级是否删除操作
      if (data.isDel) {
        // 操作成功后重新请求下拉树列表
        updateSchema({
          field: 'parentId',
          componentProps: {
            params: { key: Math.random() },
          },
        });
      }

      const menuTypeOptions = await dictionaryModel({ dictCoding: 'system_menu_type' });
      const transitionNameOptions = await dictionaryModel({
        dictCoding: 'system_menu_transitionName',
      });
      const hideChildOptions = await dictionaryModel({ dictCoding: 'system_menu_hideChild' });
      const keepaliveOptions = await dictionaryModel({ dictCoding: 'system_menu_keepAlive' });
      const affixOptions = await dictionaryModel({ dictCoding: 'system_menu_affix' });
      const hideTabOptions = await dictionaryModel({ dictCoding: 'system_menu_hideTab' });
      const visibleOptions = await dictionaryModel({ dictCoding: 'system_isHide' });
      const statusOptions = await dictionaryModel({ dictCoding: 'system_status' });
      updateSchema([
        {
          field: 'menuType',
          componentProps: {
            options: menuTypeOptions,
          },
        },
        {
          field: 'transitionName',
          componentProps: {
            options: transitionNameOptions,
          },
        },
        {
          field: 'hideChildrenInMenu',
          componentProps: {
            options: hideChildOptions,
          },
        },
        {
          field: 'ignoreKeepAlive',
          componentProps: {
            options: keepaliveOptions,
          },
        },
        {
          field: 'affix',
          componentProps: {
            options: affixOptions,
          },
        },
        {
          field: 'hideTab',
          componentProps: {
            options: hideTabOptions,
          },
        },
        {
          field: 'hideMenu',
          componentProps: {
            options: visibleOptions,
          },
        },
        {
          field: 'status',
          componentProps: {
            options: statusOptions,
          },
        },
      ]);
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        !unref(isUpdate)
          ? await menuSave({ ...values })
          : await menuSave({ ...values, menuId: rowId.value });
        !unref(isUpdate)
          ? createMessage.success('新增成功！')
          : createMessage.success('编辑成功！');
        closeDrawer();
        emit('success', { isUpdate: unref(isUpdate), values: { ...values, menuId: rowId.value } });
        // 操作成功后重新请求下拉树列表
        updateSchema({
          field: 'parentId',
          componentProps: {
            params: { key: Math.random() },
          },
        });
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }

    return { registerDrawer, registerForm, getTitle, handleSubmit };
  },
});
</script>
