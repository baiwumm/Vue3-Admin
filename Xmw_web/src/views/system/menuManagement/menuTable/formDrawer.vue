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
import { menuSave } from '/@/api/system/menuManagement'; // 菜单保存接口
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'; // 抽屉组件
import { BasicForm, useForm } from '/@/components/Form/index'; // 表单组件
import { dataFormSchema } from './data'; //表单配置项
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
      //   请求字典数据
      const menuTypeOptions = await dictionaryModel({ dict_coding: 'system_menu_type' });
      const transitionNameOptions = await dictionaryModel({
        dict_coding: 'system_menu_transitionName',
      });
      const hideChildOptions = await dictionaryModel({ dict_coding: 'system_menu_hideChild' });
      const keepaliveOptions = await dictionaryModel({ dict_coding: 'system_menu_keepAlive' });
      const affixOptions = await dictionaryModel({ dict_coding: 'system_menu_affix' });
      const hideTabOptions = await dictionaryModel({ dict_coding: 'system_menu_hideTab' });
      const visibleOptions = await dictionaryModel({ dict_coding: 'system_isHide' });
      const statusOptions = await dictionaryModel({ dict_coding: 'system_status' });
      updateSchema([
        {
          field: 'menu_type',
          componentProps: {
            options: menuTypeOptions,
          },
        },
        {
          field: 'transition_name',
          componentProps: {
            options: transitionNameOptions,
          },
        },
        {
          field: 'hide_childrenIn_menu',
          componentProps: {
            options: hideChildOptions,
          },
        },
        {
          field: 'ignore_keep_alive',
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
          field: 'hide_tab',
          componentProps: {
            options: hideTabOptions,
          },
        },
        {
          field: 'hide_menu',
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
        // 根据操作拼接表单参数
        let params = { ...values };
        if (unref(isUpdate)) Object.assign(params, { menu_id: rowId.value });
        await menuSave(params);
        createMessage.success(!unref(isUpdate) ? '新增成功！' : '编辑成功！');
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

    return { registerDrawer, registerForm, getTitle, handleSubmit };
  },
});
</script>
