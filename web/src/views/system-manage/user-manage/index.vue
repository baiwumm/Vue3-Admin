<template>
  <div
    class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto"
  >
    <!-- 顶部搜索 -->
    <HeaderSearch
      v-model:model="searchParams"
      @reset="resetSearchParams"
      @search="getDataByPage"
    />
    <ACard
      :title="$t('route.system-manage_user-manage')"
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
        :pagination="mobilePagination"
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
import { getUserList, delUser } from "@/service/api";
import { $t } from "@/locales";
import {
  Button,
  Popconfirm,
  Tag,
  Space,
  Tooltip,
  Avatar,
} from "ant-design-vue";
import SvgIcon from "@/components/custom/svg-icon.vue";
import {
  useTable,
  useTableOperate,
  useTableScroll,
} from "@/hooks/common/table";
import OperateModal from "./modules/operate-modal.vue";
import { SEX, UNIFORM_TEXT, STATUS } from "@/enum";
import { eq, find, get } from "lodash-es";
import dayjs from "dayjs";
import { StatueOptions } from "@/constants";
import HeaderSearch from "./modules/header-search.vue";

// 编辑的数据
const editingData = ref<Api.SystemManage.UserManage | null>(null);

const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams,
} = useTable({
  apiFn: getUserList,
  apiParams: {
    current: 1,
    size: 10,
    userName: undefined,
    status: undefined,
  },
  columns: () => [
    {
      key: "userName",
      dataIndex: "userName",
      title: $t("page.systemManage.userManage.userName"),
      align: "center",
      fixed: "left",
      customRender: ({ text }) => (
        <Tag bordered={false} color="purple">
          <Space>
            <SvgIcon icon="ri:user-line" class="text-base" />
            {text}
          </Space>
        </Tag>
      ),
    },
    {
      key: "cnName",
      dataIndex: "cnName",
      title: $t("page.systemManage.userManage.cnName"),
      align: "center",
    },
    {
      key: "avatar",
      dataIndex: "avatar",
      title: $t("page.systemManage.userManage.avatar"),
      align: "center",
      customRender: ({ text }) => <Avatar src={text} />,
    },
    {
      key: "orgId",
      dataIndex: "orgId",
      title: $t("page.systemManage.userManage.orgId"),
      align: "center",
      customRender: ({ record }) => (
        <Tag bordered={false}>
          <Space>
            <SvgIcon
              icon={record.organization.icon || "ri:exchange-2-line"}
              class="text-base"
            />
            {record.organization.name}
          </Space>
        </Tag>
      ),
    },
    {
      key: "postId",
      dataIndex: "postId",
      title: $t("page.systemManage.userManage.postId"),
      align: "center",
      customRender: ({ record }) => (
        <Tag bordered={false}>
          <Space>
            <SvgIcon icon="ri:contacts-book-3-line" class="text-base" />
            {record.post.name}
          </Space>
        </Tag>
      ),
    },
    {
      key: "sex",
      dataIndex: "sex",
      title: $t("page.systemManage.userManage.sex"),
      align: "center",
      customRender: ({ text }) => (
        <Tag
          bordered={false}
          color={eq(text, SEX.MALE) ? "processing" : "magenta"}
        >
          <SvgIcon
            icon={eq(text, SEX.MALE) ? "ri:men-line" : "ri:women-line"}
            class="text-lg inline-block"
          />
        </Tag>
      ),
    },
    {
      key: "status",
      dataIndex: "status",
      title: $t("form.status"),
      align: "center",
      customRender: ({ text }) => (
        <Tag
          bordered={false}
          color={eq(text, STATUS.ACTIVE) ? "processing" : "error"}
        >
          {get(
            find(StatueOptions, ["value", text]),
            "label",
            UNIFORM_TEXT.NULL,
          )}
        </Tag>
      ),
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: $t("page.systemManage.userManage.phone"),
      align: "center",
    },
    {
      key: "email",
      dataIndex: "email",
      title: $t("page.systemManage.userManage.email"),
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

const {
  drawerVisible,
  operateType,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onDeleted,
} = useTableOperate(data, getData);

/**
 * @description: 删除用户
 */
const handleDelete = (id: number) => {
  return new Promise(async (resolve) => {
    await delUser({ id }).then(({ error }) => {
      if (!error) {
        onDeleted();
      }
      resolve(true);
    });
  });
};

/**
 * @description: 编辑岗位
 */
const edit = (record: Api.SystemManage.UserManage) => {
  editingData.value = record;
  handleEdit(record.id);
};
</script>
