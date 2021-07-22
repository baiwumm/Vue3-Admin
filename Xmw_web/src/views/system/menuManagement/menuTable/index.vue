<template>
  <div>
    <BasicTable @register="registerTable">
      <!-- 菜单类型-插槽 -->
      <template #menuType="{ record }">
        <Tag :color="tagOptions[record.menuType]">
          {{ formatDictValue(options['menuType'], record.menuType) }}
        </Tag>
      </template>
      <!-- 是否隐藏-插槽 -->
      <template #hideMenu="{ record }">
        <Tag :color="record.hideMenu === '0' ? 'success' : 'error'" v-if="record.hideMenu">
          {{ formatDictValue(options['hideMenu'], record.hideMenu) }}
        </Tag>
      </template>
      <!-- 是否忽略缓存-插槽 -->
      <template #ignoreKeepAlive="{ record }">
        <Tag
          :color="record.ignoreKeepAlive === '0' ? 'success' : 'error'"
          v-if="record.ignoreKeepAlive"
        >
          {{ formatDictValue(options['ignoreKeepAlive'], record.ignoreKeepAlive) }}
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
      <template #hideChildrenInMenu="{ record }">
        <Tag
          :color="record.hideChildrenInMenu === '0' ? 'success' : 'error'"
          v-if="record.hideChildrenInMenu"
        >
          {{ formatDictValue(options['hideChildrenInMenu'], record.hideChildrenInMenu) }}
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
        <a-button type="primary" @click="handleCreate" preIcon="ant-design:plus-outlined"
          >新增</a-button
        >
        <a-button type="primary" @click="expandAll" preIcon="ant-design:down-outlined"
          >展开</a-button
        >
        <a-button type="primary" @click="collapseAll" preIcon="ant-design:up-outlined"
          >折叠</a-button
        >
      </template>
      <!-- 列操作栏 -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
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
    <FormDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { formatDictValue } from '/@/utils';
import { getMenuTree, menuDel } from '/@/api/system/menuManagement'; // 引入菜单管理接口
import { Tag, Badge } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useMessage } from '/@/hooks/web/useMessage';
import { useDrawer } from '/@/components/Drawer';
import FormDrawer from './formDrawer.vue';
import { columns, searchFormSchema } from './data';
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 引入字典列表接口
export default defineComponent({
  name: 'SysMenuTable',
  components: { BasicTable, FormDrawer, TableAction, Tag, Badge },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerTable, { reload, expandAll, collapseAll }] = useTable({
      title: '菜单列表',
      isTreeTable: true,
      api: getMenuTree,
      rowKey: 'menuId',
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        baseColProps: { xs: 24, sm: 12, md: 12, lg: 12, xl: 8 },
        resetButtonOptions: {
          // @ts-ignore
          preIcon: 'ant-design:delete-outlined',
        },
        submitButtonOptions: {
          // @ts-ignore
          preIcon: 'ant-design:search-outlined',
        },
      },
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      actionColumn: {
        width: 80,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
    });
    const { createMessage } = useMessage();

    let options = ref({}),
      tagOptions = ref({ dir: 'green', menu: 'cyan', button: 'blue' });
    async function initOptions() {
      options.value['menuType'] = await dictionaryModel({ dictCoding: 'system_menu_type' });
      options.value['hideMenu'] = await dictionaryModel({ dictCoding: 'system_isHide' });
      options.value['ignoreKeepAlive'] = await dictionaryModel({
        dictCoding: 'system_menu_keepAlive',
      });
      options.value['affix'] = await dictionaryModel({ dictCoding: 'system_menu_affix' });
      options.value['status'] = await dictionaryModel({ dictCoding: 'system_status' });
      options.value['hideChildrenInMenu'] = await dictionaryModel({
        dictCoding: 'system_menu_hideChild',
      });
    }
    initOptions();

    function handleCreate() {
      openDrawer(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: Recordable) {
      openDrawer(true, {
        record,
        isUpdate: true,
      });
    }

    async function handleDelete(record: Recordable) {
      await menuDel({ ids: record.menuId });
      createMessage.success('删除成功！');
      openDrawer(false, {
        isDel: true,
      });
      await reload();
    }

    async function handleSuccess() {
      await reload();
    }

    function refresh() {
      reload();
    }

    return {
      refresh,
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
    };
  },
});
</script>
