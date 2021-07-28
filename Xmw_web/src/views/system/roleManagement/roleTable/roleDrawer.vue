<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="600px"
    @ok="handlerSubmit"
    @close="handlerCancel"
  >
    <BasicForm @register="registerForm">
      <template #menu_role>
        <BasicTree
          v-if="treeData.length"
          :treeData="treeData"
          :replaceFields="{ title: 'title', key: 'menu_id' }"
          checkable
          title="菜单分配"
          :defaultExpandLevel="1"
          @check="handlerCheck"
          :checkedKeys="checkedKeys"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'; // 抽屉组件
import { BasicForm, useForm } from '/@/components/Form/index'; // 表单组件
import { dataFormSchema } from './data'; // 表单配置项
import { useMessage } from '/@/hooks/web/useMessage'; //信息模态框
import { BasicTree, TreeItem } from '/@/components/Tree'; // tree组件
import { getMenuTree } from '/@/api/system/menuManagement'; // 菜单tree结构
import { roleSave } from '/@/api/system/roleManagement'; // 角色保存接口
export default defineComponent({
  name: 'RoleDrawer',
  components: { BasicDrawer, BasicForm, BasicTree },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { createMessage } = useMessage();
    const isUpdate = ref(true); // 是否编辑
    const rowId = ref(''); // 编辑的role_id
    const treeData = ref<TreeItem[]>([]); // tree数据
    const halfCheckedKeys = ref([]); // 半勾选节点
    const checkedKeys = ref([]); // tree回显数据
    const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
      // 注册表单
      labelWidth: 100,
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
      // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
      if (unref(treeData).length === 0) {
        treeData.value = (await getMenuTree()) as any as TreeItem[];
      }
      isUpdate.value = !!data?.isUpdate;
      //   判断是否新增操作
      if (unref(isUpdate)) {
        rowId.value = data.record.role_id;
        // 表单赋值
        setFieldsValue({
          ...data.record,
        });
        // 递归过滤有子节点的父节点role_id
        let childKeys = [];
        const loop = function (tree) {
          tree.map((node) => {
            if (node.children) {
              loop(node.children);
            } else {
              childKeys.push(node.menu_id);
            }
          });
        };
        loop(data.record.menu_role);
        // 赋值回显
        checkedKeys.value = childKeys;
        halfCheckedKeys.value = childKeys;
      }

      //   请求字典数据
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
    // 判断标题显示
    const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
    // 菜单tree节点点击，拿到勾选节点和半选父节点
    function handlerCheck(checkedKeys, e) {
      halfCheckedKeys.value = [...checkedKeys, ...e.halfCheckedKeys];
    }
    // 确定提交操作
    async function handlerSubmit() {
      try {
        //   表单校验
        const values = await validate();
        // 判断是否勾选菜单权限
        if (!halfCheckedKeys.value.length) {
          createMessage.warning('请选择菜单权限！');
          return;
        }
        setDrawerProps({ confirmLoading: true });
        // 根据操作拼接表单参数
        let params = { ...values, menu_role: halfCheckedKeys.value.join(',') };
        if (unref(isUpdate)) Object.assign(params, { role_id: rowId.value });
        await roleSave(params);
        createMessage.success(!unref(isUpdate) ? '新增成功！' : '编辑成功！');
        closeDrawer();
        // 执行成功刷新列表
        emit('success');
      } finally {
        setDrawerProps({ confirmLoading: false });
        halfCheckedKeys.value = [];
        checkedKeys.value = [];
      }
    }

    // 弹窗关闭时重置halfCheckedKeys
    function handlerCancel() {
      halfCheckedKeys.value = [];
      checkedKeys.value = [];
    }

    return {
      registerDrawer,
      registerForm,
      getTitle,
      handlerSubmit,
      handlerCancel,
      treeData,
      handlerCheck,
      checkedKeys,
    };
  },
});
</script>
