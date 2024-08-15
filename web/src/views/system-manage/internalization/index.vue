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
      :title="$t('route.system-manage_internalization')"
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
      <!-- 操作抽屉 -->
      <OperateDrawer
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
import { $t } from "@/locales";
import { Button, Popconfirm, Tag, Space, Tooltip } from "ant-design-vue";
import {
  useTable,
  useTableOperate,
  useTableScroll,
} from "@/hooks/common/table";
import { getInternalizationList, delInternalization } from "@/service/api";
import OperateDrawer from "./modules/operate-drawer.vue";
import HeaderSearch from "./modules/header-search.vue";
import dayjs from "dayjs";
import SvgIcon from "@/components/custom/svg-icon.vue";
import { UNIFORM_TEXT } from "@/enum";
import { map } from "lodash-es";
import { InternalizationLanguage } from "@/constants";

const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

// 编辑的数据
const editingData = ref<Api.SystemManage.SaveInternalization | null>(null);

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
  apiFn: getInternalizationList,
  apiParams: {
    name: undefined,
    startTime: undefined,
    endTime: undefined,
  },
  columns: () => [
    {
      key: "name",
      dataIndex: "name",
      title: $t("page.systemManage.internalization.name"),
      align: "center",
      customRender: ({ text }) => (
        <Tag bordered={false}>
          <Space>
            <SvgIcon icon="ri:font-size" class="text-base" />
            {text}
          </Space>
        </Tag>
      ),
    },
    ...(map(InternalizationLanguage, (language) => ({
      key: language,
      dataIndex: language,
      title: $t(`page.systemManage.internalization.${language}`),
      align: "center",
      ellipsis: true,
      customRender: ({ text }) =>
        text ? (
          <Tooltip title={text} placement="topLeft">
            {text}
          </Tooltip>
        ) : (
          UNIFORM_TEXT.NULL
        ),
    })) as AntDesign.TableColumn<
      AntDesign.TableDataWithIndex<Api.SystemManage.Internalization>
    >[]),
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

const {
  drawerVisible,
  operateType,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onDeleted,
} = useTableOperate(data, getData);

/**
 * @description: 删除国际化
 */
const handleDelete = (id: string) => {
  return new Promise(async (resolve) => {
    await delInternalization({ id }).then(({ error }) => {
      if (!error) {
        onDeleted();
      }
      resolve(true);
    });
  });
};

/**
 * @description: 编辑国际化
 */
const edit = (record: Api.SystemManage.Internalization) => {
  editingData.value = record;
  handleEdit(record.id);
};
</script>
