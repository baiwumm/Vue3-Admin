<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <!-- 菜单类型-插槽 -->
      <template #menu_type="{ record }">
        <Tag :color="tagOptions[record.menu_type]">
          {{ formatDictValue(options['menu_type'], record.menu_type) }}
        </Tag>
      </template>
      <!-- 是否隐藏-插槽 -->
      <template #hide_menu="{ record }">
        <Tag :color="record.hide_menu === '0' ? 'success' : 'error'" v-if="record.hide_menu">
          {{ formatDictValue(options['hide_menu'], record.hide_menu) }}
        </Tag>
      </template>
      <!-- 是否忽略缓存-插槽 -->
      <template #ignore_keep_alive="{ record }">
        <Tag
          :color="record.ignore_keep_alive === '0' ? 'success' : 'error'"
          v-if="record.ignore_keep_alive"
        >
          {{ formatDictValue(options['ignore_keep_alive'], record.ignore_keep_alive) }}
        </Tag>
      </template>
      <!-- 是否固定标签-插槽 -->
      <template #affix="{ record }">
        <Tag :color="record.affix === '0' ? 'success' : 'error'">
          {{ formatDictValue(options['affix'], record.affix) }}
        </Tag>
      </template>
      <!-- 状态-插槽 -->
      <template #status="{ record }">
        <Badge
          :status="record.status === '1' ? 'success' : 'error'"
          :text="formatDictValue(options['status'], record.status)"
        >
        </Badge>
      </template>
      <!-- 隐藏子菜单-插槽 -->
      <template #hide_childrenIn_menu="{ record }">
        <Tag
          :color="record.hide_childrenIn_menu === '0' ? 'success' : 'error'"
          v-if="record.hide_childrenIn_menu"
        >
          {{ formatDictValue(options['hide_childrenIn_menu'], record.hide_childrenIn_menu) }}
        </Tag>
      </template>
      <!-- 权限标识-插槽 -->
      <template #permission="{ record }">
        <Tag color="purple" v-if="record.permission">
          {{ record.permission }}
        </Tag>
      </template>
      <!-- 工具栏 -->
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleCreate"
          preIcon="ant-design:plus-outlined"
          v-auth="['system:menu:add']"
          >新增</a-button
        >
        <a-button
          type="primary"
          @click="expandAll"
          preIcon="ant-design:down-outlined"
          v-auth="['system:menu:expand']"
          >展开</a-button
        >
        <a-button
          type="primary"
          @click="collapseAll"
          preIcon="ant-design:up-outlined"
          v-auth="['system:menu:collapse']"
          >折叠</a-button
        >
      </template>
      <!-- 列操作栏 -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              auth: ['system:menu:edit'],
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              auth: ['system:menu:delete'],
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <!-- 引入抽屉模态框 -->
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { formatDictValue } from '/@/utils';
import { getMenuTree, menuDel } from '/@/api/system/menuManagement'; // 菜单管理接口
import { Tag, Badge } from 'ant-design-vue';
import { defineComponent, ref, nextTick } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table'; //表格组件
import { useMessage } from '/@/hooks/web/useMessage';
import { useDrawer } from '/@/components/Drawer'; // 抽屉组件
import MenuDrawer from './menuDrawer.vue'; //表单组件
import { columns, searchFormSchema } from './data'; // 表格配置项
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
export default defineComponent({
  name: 'menuTable',
  components: { BasicTable, MenuDrawer, TableAction, Tag, Badge },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer(); // 注册抽屉
    const [registerTable, { reload, getForm, expandAll, collapseAll }] = useTable({
      //注册表格
      title: '菜单列表',
      isTreeTable: true,
      api: getMenuTree,
      rowKey: 'menu_id',
      columns,
      formConfig: {
        labelWidth: 80,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        baseColProps: { xs: 24, sm: 12, md: 12, lg: 12, xl: 8 },
        resetButtonOptions: {
          preIcon: 'ant-design:delete-outlined',
        },
        submitButtonOptions: {
          preIcon: 'ant-design:search-outlined',
        },
      },
      showIndexColumn: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      pagination: false,
      actionColumn: {
        width: 80,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
    });
    const { createMessage } = useMessage();
    // 请求字典数据
    let options = ref({}),
      tagOptions = ref({ dir: 'green', menu: 'cyan', button: 'blue' });
    async function initOptions() {
      options.value['menu_type'] = await dictionaryModel({ dict_coding: 'system_menu_type' });
      options.value['hide_menu'] = await dictionaryModel({ dict_coding: 'system_isHide' });
      options.value['ignore_keep_alive'] = await dictionaryModel({
        dict_coding: 'system_menu_keepAlive',
      });
      options.value['affix'] = await dictionaryModel({ dict_coding: 'system_menu_affix' });
      options.value['status'] = await dictionaryModel({ dict_coding: 'system_status' });
      options.value['hide_childrenIn_menu'] = await dictionaryModel({
        dict_coding: 'system_menu_hideChild',
      });
    }
    initOptions();
    //新增操作
    function handleCreate() {
      openDrawer(true, {
        isUpdate: false,
      });
    }
    // 编辑操作
    function handleEdit(record: Recordable) {
      openDrawer(true, {
        record,
        isUpdate: true,
      });
    }
    //删除操作
    async function handleDelete(record: Recordable) {
      await menuDel({ ids: record.menu_id, permission: record.permission });
      createMessage.success('删除成功！');
      openDrawer(false, {
        isDel: true,
      });
      await reload();
    }
    // 操作成功重新请求列表
    async function handleSuccess() {
      await reload();
    }

    // 表格接口请求成功后触发,默认展开所有
    async function onFetchSuccess() {
      //   请求状态
      const statusOptions = await dictionaryModel({ dict_coding: 'system_status' });
      getForm().updateSchema([
        {
          field: 'status',
          componentProps: {
            options: statusOptions,
          },
        },
      ]);
      nextTick(expandAll);
    }
    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      expandAll,
      collapseAll,
      options,
      formatDictValue,
      tagOptions,
      onFetchSuccess,
    };
  },
});
</script>
