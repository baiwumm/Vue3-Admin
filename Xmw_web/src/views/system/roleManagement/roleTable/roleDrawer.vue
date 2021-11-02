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
          :replaceFields="{ title: 'lang', key: 'menu_id' }"
          checkable
          :title="t('router.system.roleManagement.distributionMenu')"
          :defaultExpandLevel="1"
          @check="handlerCheck"
          :checkedKeys="checkedKeys"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>

<script lang="ts" setup>
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { ref, computed, unref, defineEmits } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'; // 抽屉组件
import { BasicForm, useForm } from '/@/components/Form/index'; // 表单组件
import { dataFormSchema } from './data'; // 表单配置项
import { useMessage } from '/@/hooks/web/useMessage'; //信息模态框
import { BasicTree } from '/@/components/Tree'; // tree组件
import { getMenuTree } from '/@/api/system/menuManagement'; // 菜单tree结构
import { roleSave } from '/@/api/system/roleManagement'; // 角色保存接口
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
export interface TreeItem extends TreeDataItem {
  icon?: any;
}

const emit = defineEmits(['success', 'register']);
const { t } = useI18n();
const { createMessage } = useMessage();
const isUpdate = ref<boolean>(true); // 是否编辑
const rowId = ref<string>(''); // 编辑的role_id
const treeData = ref<TreeItem[]>([]); // tree数据
const halfCheckedKeys = ref<string[]>([]); // 半勾选节点
const checkedKeys = ref<string[]>([]); // tree回显数据
let firstLoad = ref<boolean>(true); // 判断是否第一次加载表单
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
    let childKeys: string[] = [];
    const loop = function (tree: any) {
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
  if (firstLoad.value) {
    //   请求字典数据
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
// 判断标题显示
const getTitle = computed(() =>
  !unref(isUpdate) ? t('router.system.roleManagement.add') : t('router.system.roleManagement.edit')
);
// 菜单tree节点点击，拿到勾选节点和半选父节点
function handlerCheck(checkedKeys: any, e: { halfCheckedKeys: any }) {
  halfCheckedKeys.value = [...checkedKeys, ...e.halfCheckedKeys];
}
// 确定提交操作
async function handlerSubmit() {
  try {
    //   表单校验
    const values = await validate();
    // 判断是否勾选菜单权限
    if (!halfCheckedKeys.value.length) {
      createMessage.warning(t('router.system.roleManagement.seleteMenu'));
      return;
    }
    setDrawerProps({ confirmLoading: true });
    // 根据操作拼接表单参数
    let params = { ...values, menu_role: halfCheckedKeys.value.join(',') };
    if (unref(isUpdate)) Object.assign(params, { role_id: rowId.value });
    await roleSave(params);
    createMessage.success(
      !unref(isUpdate) ? t('router.common.addSuccess') : t('router.common.editSuccess')
    );
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
</script>
