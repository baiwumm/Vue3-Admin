<template>
  <PageContainer>
    <!-- 顶部搜索 -->
    <template #header>
      <HeaderSearch
        v-model:model="searchParams"
        @reset="resetSearchParams"
        @search="getDataByPage"
        :updateSearchParams="updateSearchParams"
        :userList="userList"
        :locales="locales"
      />
    </template>
    <!-- 右侧操作区 -->
    <template #extra>
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :disabled-delete="checkedRowKeys.length === 0"
        :loading="loading"
        :addBtn="false"
        @refresh="getData"
        @delete="handleBatchDelete"
        batchDeleteBtn
      />
    </template>
    <!-- 表格 -->
    <ATable
      ref="tableWrapperRef"
      :columns="columns"
      :data-source="data"
      size="small"
      :row-selection="rowSelection"
      :scroll="scrollConfig"
      :loading="loading"
      row-key="id"
      :pagination="{
        ...mobilePagination,
        showTotal: (total) => `共 ${total} 条数据`,
      }"
      class="h-full"
    >
      <template #expandedRowRender="{ record }">
        <pre class="json-data">{{
          JSON.stringify(record.params, null, 2)
        }}</pre>
      </template>
    </ATable>
  </PageContainer>
</template>
<script setup lang="tsx">
import { ref, onMounted } from "vue";
import {
  useTable,
  useTableOperate,
  useTableScroll,
} from "@/hooks/common/table";
import {
  getOperationLogList,
  delOperationLog,
  getUserList,
} from "@/service/api";
import { $t } from "@/locales";
import HeaderSearch from "./modules/header-search.vue";
import { Tag, Space, Avatar, Popconfirm, Button } from "ant-design-vue";
import { METHOD } from "@/enum";
import dayjs from "dayjs";
import { broswerIconMap, osIconMap } from "@/constants";
import SvgIcon from "@/components/custom/svg-icon.vue";

const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

// 国际化
const locales = (field: string) =>
  $t(`page.systemManage.operationLog.${field}`);

/**
 * @description: 获取用户列表
 */
const userList = ref<Api.SystemManage.UserManage[]>([]);
const fetchUserList = async () => {
  const { data, error } = await getUserList({ current: 1, size: 999 });
  if (!error) {
    userList.value = data.records;
  }
};

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  updateSearchParams,
  resetSearchParams,
} = useTable({
  apiFn: getOperationLogList,
  apiParams: {
    current: 1,
    size: 10,
    userId: undefined,
    method: undefined,
    startTime: undefined,
    endTime: undefined,
  },
  columns: () => [
    {
      key: "userId",
      dataIndex: "userId",
      title: locales("userId"),
      align: "center",
      fixed: "left",
      customRender: ({ record }) => (
        <Space>
          <Avatar src={record.user.avatar} />
          {record.user.cnName}
        </Space>
      ),
    },
    {
      key: "action",
      dataIndex: "action",
      title: locales("action"),
      align: "center",
      ellipsis: true,
    },
    {
      key: "method",
      dataIndex: "method",
      title: locales("method"),
      align: "center",
      customRender: ({ text }) => {
        const methodColorMap: Record<string, string> = {
          [METHOD.POST]: "green",
          [METHOD.PATCH]: "purple",
          [METHOD.DELETE]: "red",
        };
        return (
          <Tag bordered={false} color={methodColorMap[text]}>
            {text}
          </Tag>
        );
      },
    },
    {
      key: "os",
      dataIndex: "os",
      title: locales("os"),
      width: 120,
      align: "center",
      customRender: ({ text }) => (
        <Space>
          {osIconMap(text) ? (
            <SvgIcon icon={osIconMap(text)} class="text-base" />
          ) : null}
          {text}
        </Space>
      ),
    },
    {
      key: "browser",
      dataIndex: "browser",
      title: locales("browser"),
      width: 120,
      align: "center",
      customRender: ({ text }) => (
        <Space>
          {broswerIconMap[text] ? (
            <SvgIcon icon={broswerIconMap[text]} class="text-base" />
          ) : null}
          {text}
        </Space>
      ),
    },
    {
      key: "ip",
      dataIndex: "ip",
      title: locales("ip"),
      align: "center",
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

const { checkedRowKeys, rowSelection, onDeleted, onBatchDeleted } =
  useTableOperate(data, getData);

/**
 * @description: 删除操作日志
 */
const handleDelete = (id: string) => {
  return new Promise(async (resolve) => {
    await delOperationLog({ ids: [id] }).then(({ error }) => {
      if (!error) {
        onDeleted();
      }
      resolve(true);
    });
  });
};

/**
 * @description: 批量删除日志
 */
const handleBatchDelete = () => {
  return new Promise(async (resolve) => {
    await delOperationLog({ ids: checkedRowKeys.value }).then(({ error }) => {
      if (!error) {
        onBatchDeleted();
      }
      resolve(true);
    });
  });
};

/**
 * @description: 组件挂载
 */
onMounted(() => {
  fetchUserList();
});
</script>
