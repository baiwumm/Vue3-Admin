<template>
  <PageContainer>
    <!-- 顶部搜索 -->
    <template #header>
      <HeaderSearch
        v-model:model="searchParams"
        @reset="resetSearchParams"
        @search="getDataByPage"
        :updateSearchParams="updateSearchParams"
        :locales="locales"
      />
    </template>
    <!-- 右侧操作区 -->
    <template #extra>
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :disabled-delete="checkedRowKeys.length === 0"
        :loading="loading"
        @add="handleAdd"
        @refresh="getData"
        :add-btn="hasAuth('system-manage:menu-manage:add')"
      />
    </template>
    <!-- 表格 -->
    <ATable
      ref="tableWrapperRef"
      :columns="columns"
      :data-source="data"
      size="small"
      :scroll="scrollConfig"
      :loading="loading"
      row-key="id"
      :pagination="false"
      class="h-full"
    />
    <!-- 操作弹窗 -->
    <OperateModal
      v-model:visible="drawerVisible"
      :operate-type="operateType"
      :row-data="editingData"
      @submitted="getDataByPage"
      :dataSource="data"
      :locales="locales"
    />
  </PageContainer>
</template>
<script setup lang="tsx">
import { ref } from "vue";
import OperateModal from "./modules/operate-modal.vue";
import {
  useTable,
  useTableOperate,
  useTableScroll,
} from "@/hooks/common/table";
import { getMenuList, delMenu } from "@/service/api";
import { $t } from "@/locales";
import { MENU_TYPE } from "@/enum";
import { Tag, Button, Popconfirm, Tooltip } from "ant-design-vue";
import { toLower } from "lodash-es";
import dayjs from "dayjs";
import SvgIcon from "@/components/custom/svg-icon.vue";
import { UNIFORM_TEXT } from "@/enum";
import { get } from "lodash-es";
import HeaderSearch from "./modules/header-search.vue";
import { useAuth } from "@/hooks/business/auth";

// 权限钩子函数
const { hasAuth } = useAuth();

// 编辑的数据
const editingData = ref<Api.SystemManage.MenuManage | null>(null);

const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

// 国际化
const locales = (field: string) => $t(`page.systemManage.menuManage.${field}`);

// 渲染默认字段
const renderEllipsis = ({ text }: any) =>
  text ? (
    <Tooltip title={text} placement="topLeft">
      {text}
    </Tooltip>
  ) : (
    UNIFORM_TEXT.NULL
  );

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  searchParams,
  updateSearchParams,
  resetSearchParams,
} = useTable({
  apiFn: getMenuList,
  apiParams: {
    title: undefined,
    name: undefined,
    startTime: undefined,
    endTime: undefined,
  },
  columns: () => [
    {
      key: "type",
      dataIndex: "type",
      title: locales("type"),
      align: "center",
      customRender: ({ text }) => {
        const typeColorMap: Record<string, string> = {
          [MENU_TYPE.DIRECTORY]: "processing",
          [MENU_TYPE.MENU]: "cyan",
          [MENU_TYPE.BUTTON]: "purple",
        };
        return (
          <Tag bordered={false} color={typeColorMap[text]}>
            {locales(`typeMap.${toLower(text)}`)}
          </Tag>
        );
      },
    },
    {
      key: "title",
      dataIndex: "title",
      align: "center",
      title: locales("title"),
    },
    {
      key: "meta",
      dataIndex: "meta",
      align: "center",
      title: locales("meta.icon"),
      customRender: ({ record }) => {
        const meta = get(record, "meta");
        return meta?.icon || meta?.localIcon ? (
          <div class="flex-center">
            <SvgIcon
              icon={meta.icon}
              localIcon={meta.localIcon}
              class="text-base"
            />
          </div>
        ) : (
          UNIFORM_TEXT.NULL
        );
      },
    },
    {
      key: "name",
      dataIndex: "name",
      align: "center",
      ellipsis: true,
      title: locales("name"),
      customRender: renderEllipsis,
    },
    {
      key: "path",
      dataIndex: "path",
      align: "center",
      ellipsis: true,
      title: locales("path"),
      customRender: renderEllipsis,
    },
    {
      key: "component",
      dataIndex: "component",
      align: "center",
      ellipsis: true,
      title: locales("component"),
      customRender: renderEllipsis,
    },
    {
      key: "sort",
      dataIndex: "sort",
      title: $t("form.sort"),
      align: "center",
      customRender: ({ text }) => (
        <Tag bordered={false} color="success">
          {text}
        </Tag>
      ),
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: $t("common.createdAt"),
      align: "center",
      width: 160,
      customRender: ({ text }) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      key: "operate",
      title: $t("common.operate"),
      align: "center",
      width: 130,
      fixed: "right",
      customRender: ({ record }) => (
        <div class="flex-center gap-8px">
          {hasAuth("system-manage:menu-manage:edit") ? (
            <Button
              type="primary"
              ghost
              size="small"
              onClick={() => edit(record)}
            >
              {$t("common.edit")}
            </Button>
          ) : null}
          {hasAuth("system-manage:menu-manage:delete") ? (
            <Popconfirm
              title={$t("common.confirmDelete")}
              onConfirm={() => handleDelete(record.id)}
            >
              <Button danger size="small">
                {$t("common.delete")}
              </Button>
            </Popconfirm>
          ) : null}
        </div>
      ),
    },
  ],
});

const {
  drawerVisible,
  operateType,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onDeleted,
} = useTableOperate(data, getData);

/**
 * @description: 删除菜单
 */
const handleDelete = (id: string) => {
  return new Promise(async (resolve) => {
    await delMenu({ id }).then(({ error }) => {
      if (!error) {
        onDeleted();
      }
      resolve(true);
    });
  });
};

/**
 * @description: 编辑菜单
 */
const edit = (record: Api.SystemManage.MenuManage) => {
  editingData.value = record;
  handleEdit(record.id);
};
</script>
