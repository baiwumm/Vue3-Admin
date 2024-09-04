<script setup lang="tsx">
import { Avatar, AvatarGroup, Button, Popconfirm, Space, Switch, Tag, Tooltip } from 'ant-design-vue';
import dayjs from 'dayjs';
import { eq, find, get, includes, map } from 'lodash-es';
import { onMounted, ref } from 'vue';

import { StatueOptions } from '@/constants';
import { STATUS, UNIFORM_TEXT } from '@/enum';
import { useAuth } from '@/hooks/business/auth';
import { useRouterPush } from '@/hooks/common/router';
import { useTable, useTableOperate, useTableScroll } from '@/hooks/common/table';
import { $t } from '@/locales';
import { changePinned, createMessageRead, delMessage, getMessageList, getUserList } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';
import { useThemeStore } from '@/store/modules/theme';

import HeaderSearch from './modules/header-search.vue';
import OperateModal from './modules/operate-modal.vue';

const authStore = useAuthStore();
const themeStore = useThemeStore();

// 权限钩子函数
const { hasAuth } = useAuth();

const { routerPushByKey } = useRouterPush();

const { tableWrapperRef, scrollConfig } = useTableScroll(1000);

// 编辑的数据
const editingData = ref<Api.Administrative.Message | null>(null);

// 设置当前 id
const currentId = ref('');

// 国际化
const locales = (field: string) => $t(`page.administrative.message.${field}`);

/** @description: 获取用户列表 */
const userList = ref<Api.SystemManage.UserManage[]>([]);
const fetchUserList = async () => {
  const { data, error } = await getUserList({ current: 1, size: 999 });
  if (!error) {
    userList.value = data.records;
  }
};

/** @description: 切换置顶回调 */
const handleSwitchClick = (id: string) => {
  currentId.value = id;
};

/** @description: 创建已读信息 */
const handleCreateMessage = async (record: Api.Administrative.Message) => {
  const { error } = await createMessageRead({
    id: record.id,
  });
  if (!error) {
    getData();
  }
};

/** @description: 跳转消息公告详情 */
const handleJumpDetail = async (record: Api.Administrative.Message) => {
  routerPushByKey('administrative_message-detail', { params: { id: record.id } });
  if (!includes(map(record.messageReads, 'userId'), authStore.userInfo.id)) {
    await handleCreateMessage(record);
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
  apiFn: getMessageList,
  apiParams: {
    current: 1,
    size: 10,
    userId: undefined,
    title: undefined,
    status: undefined,
    startTime: undefined,
    endTime: undefined,
  },
  columns: () => [
    {
      key: 'userId',
      dataIndex: 'userId',
      title: locales('userId'),
      align: 'center',
      fixed: 'left',
      width: 200,
      customRender: ({ record }) => (
        <Space>
          <Avatar src={record.user.avatar} />
          {record.user.cnName}
        </Space>
      ),
    },
    {
      key: 'title',
      dataIndex: 'title',
      title: locales('title'),
      align: 'center',
      ellipsis: true,
      customRender: ({ text, record }) => (
        <Tooltip title={text} placement="topLeft">
          <a onClick={() => handleJumpDetail(record)}>{text}</a>
        </Tooltip>
      ),
    },
    {
      key: 'messageReads',
      dataIndex: 'messageReads',
      title: locales('read'),
      align: 'center',
      customRender: ({ record }) => (
        <AvatarGroup maxCount={3} maxStyle={{ backgroundColor: themeStore.themeColor }}>
          {record.messageReads?.length
            ? map(record.messageReads, item => <Avatar key={item.id} src={item.user.avatar} />)
            : UNIFORM_TEXT.NULL}
        </AvatarGroup>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: $t('form.status'),
      width: 80,
      align: 'center',
      customRender: ({ text }) => (
        <Tag bordered={false} color={eq(text, STATUS.ACTIVE) ? 'processing' : 'error'}>
          {get(find(StatueOptions, ['value', text]), 'label', UNIFORM_TEXT.NULL)}
        </Tag>
      ),
    },
    {
      key: 'pinned',
      dataIndex: 'pinned',
      title: locales('pinned'),
      width: 100,
      align: 'center',
      customRender: ({ text, record }) => (
        <Popconfirm
          title="确认执行此操作吗？"
          onConfirm={() => handleChangePinned(record.id)}
          onCancel={() => (currentId.value = '')}
          ok-text={$t('common.confirm')}
          cancel-text={$t('common.cancel')}
        >
          <Switch
            checked={text}
            checked-children={$t('common.yesOrNo.yes')}
            un-checked-children={$t('common.yesOrNo.no')}
            loading={currentId.value === record.id}
            onClick={() => handleSwitchClick(record.id)}
          />
        </Popconfirm>
      ),
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: $t('common.createdAt'),
      align: 'center',
      width: 160,
      customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      fixed: 'right',
      customRender: ({ record }) => (
        <div class="flex-center gap-8px">
          {hasAuth('administrative:message:edit') ? (
            <Button type="primary" ghost size="small" onClick={() => edit(record)}>
              {$t('common.edit')}
            </Button>
          ) : null}
          {hasAuth('administrative:message:delete') ? (
            <Popconfirm title={$t('common.confirmDelete')} onConfirm={() => handleDelete(record.id)}>
              <Button danger size="small">
                {$t('common.delete')}
              </Button>
            </Popconfirm>
          ) : null}
        </div>
      ),
    },
  ],
});

const { drawerVisible, operateType, handleAdd, handleEdit, checkedRowKeys, onDeleted } = useTableOperate(data, getData);

/** @description: 修改置顶状态 */
const handleChangePinned = async (id: string) => {
  currentId.value = '';
  return await changePinned(id).then(({ error }) => {
    if (!error) {
      getData();
    }
  });
};
/** @description: 删除消息公告 */
const handleDelete = async (id: string) =>
  await delMessage({ id }).then(({ error }) => {
    if (!error) {
      onDeleted();
    }
  });

/** @description: 编辑消息公告 */
const edit = (record: Api.Administrative.Message) => {
  editingData.value = record;
  handleEdit(record.id);
};

/** @description: 组件挂载 */
onMounted(() => {
  fetchUserList();
});
</script>

<template>
  <PageContainer>
    <!-- 顶部搜索 -->
    <template #header>
      <HeaderSearch
        v-model:model="searchParams"
        :update-search-params="updateSearchParams"
        :user-list="userList"
        :locales="locales"
        @reset="resetSearchParams"
        @search="getDataByPage"
      />
    </template>
    <!-- 右侧操作区 -->
    <template #extra>
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :disabled-delete="checkedRowKeys.length === 0"
        :loading="loading"
        :add-btn="hasAuth('administrative:message:add')"
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
      :pagination="{
        ...mobilePagination,
        showTotal: total => `共 ${total} 条数据`,
      }"
      class="h-full"
    />
    <!-- 操作弹窗 -->
    <OperateModal
      v-model:visible="drawerVisible"
      :operate-type="operateType"
      :row-data="editingData"
      :locales="locales"
      @submitted="getDataByPage"
    />
  </PageContainer>
</template>
