<template>
  <div
    class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto"
  >
    <!-- 顶部搜索 -->
    <HeaderSearch
      v-model:model="searchParams"
      @reset="resetSearchParams"
      @search="getDataByPage"
      :updateSearchParams="updateSearchParams"
    />
    <ACard
      :title="$t('route.system-manage_menu-manage')"
      :bordered="false"
      :body-style="{ flex: 1, overflow: 'hidden' }"
      class="flex-col-stretch sm:flex-1-hidden card-wrapper"
    >
      <template #extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @refresh="getData"
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
      />
    </ACard>
  </div>
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

// 编辑的数据
const editingData = ref<Api.SystemManage.MenuManage | null>(null);

const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

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
      title: $t("page.systemManage.menuManage.type"),
      align: "center",
      customRender: ({ text }) => {
        const typeColorMap: Record<string, string> = {
          [MENU_TYPE.DIRECTORY]: "processing",
          [MENU_TYPE.MENU]: "cyan",
          [MENU_TYPE.BUTTON]: "purple",
        };
        return (
          <Tag bordered={false} color={typeColorMap[text]}>
            {$t(`page.systemManage.menuManage.typeMap.${toLower(text)}`)}
          </Tag>
        );
      },
    },
    {
      key: "title",
      dataIndex: "title",
      align: "center",
      title: $t("page.systemManage.menuManage.title"),
    },
    {
      key: "meta",
      dataIndex: "meta",
      align: "center",
      title: $t("page.systemManage.menuManage.meta.icon"),
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
      title: $t("page.systemManage.menuManage.name"),
      customRender: ({ text }) =>
        text ? (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ) : (
          UNIFORM_TEXT.NULL
        ),
    },
    {
      key: "path",
      dataIndex: "path",
      align: "center",
      ellipsis: true,
      title: $t("page.systemManage.menuManage.path"),
      customRender: ({ text }) =>
        text ? (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ) : (
          UNIFORM_TEXT.NULL
        ),
    },
    {
      key: "component",
      dataIndex: "component",
      align: "center",
      ellipsis: true,
      title: $t("page.systemManage.menuManage.component"),
      customRender: ({ text }) =>
        text ? (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ) : (
          UNIFORM_TEXT.NULL
        ),
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
          <Button
            type="primary"
            ghost
            size="small"
            onClick={() => edit(record)}
          >
            {$t("common.edit")}
          </Button>
          <Popconfirm
            title={$t("common.confirmDelete")}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small">
              {$t("common.delete")}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ],
});

console.log("columnChecks", columnChecks);

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
