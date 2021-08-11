<template>
  <Card :bordered="false">
    <!-- 顶部头像信息 -->
    <div class="text-center">
      <div class="avatar">
        <Avatar :size="104" :src="getUserInfo.avatar" v-if="getUserInfo.avatar" />
        <Avatar
          :size="104"
          v-else
          :style="{
            fontSize: '36px !important',
            background: useAppStore().getProjectConfig.themeColor,
          }"
          >{{ getUserInfo.cn_name.substr(getUserInfo.cn_name.length - 2, 2) }}</Avatar
        >
      </div>
      <div class="my-4 text-2xl">{{ getUserInfo.cn_name }}</div>
      <div class="motto">{{ getUserInfo.motto }}</div>
    </div>
    <div class="my-4">
      <p class="mb-2"
        ><SolutionOutlined /><span class="ml-2">{{ getUserInfo.post_name || '--' }}</span></p
      >
      <p class="mb-2"
        ><ClusterOutlined /><span class="ml-2">{{ getUserInfo.org_name || '--' }}</span></p
      >
      <p class="mb-2">
        <EnvironmentOutlined />
        <span class="ml-2">{{
          getUserInfo.address ? getUserInfo.address.split(',').join('-') : '--'
        }}</span>
      </p>
    </div>
    <Divider />
    <!-- 添加标签 -->
    <div class="mb-2">{{ t('router.common.tag') }}</div>
    <template v-for="(tag, index) in tags" :key="index">
      <Tooltip v-if="tag.length > 8" :title="tag">
        <Tag
          :key="tag"
          :closable="true"
          :color="tag.length > 4 ? 'cyan' : tag.length > 2 ? 'blue' : 'purple'"
          @close="handleClose(tag)"
        >
          {{ `${tag.slice(0, 8)}...` }}
        </Tag>
      </Tooltip>
      <Tag
        v-else
        :closable="true"
        :key="index"
        :color="tag.length > 4 ? 'cyan' : tag.length > 2 ? 'blue' : 'purple'"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </Tag>
    </template>
    <!-- 添加标签 -->
    <Input
      v-if="inputVisible"
      ref="inputRef"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      v-model:value="inputValue"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <Tag v-else @click="showInput" style="background: #fff" class="border-dashed">
      <PlusOutlined />
      New Tag
    </Tag>
  </Card>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, nextTick, toRefs, unref } from 'vue';
import { Card, Avatar, Divider, Tag, Tooltip, Input } from 'ant-design-vue';
import { useUserStore } from '/@/store/modules/user'; // 用户信息
import { changeUserTag } from '/@/api/personal/personal'; // 个人中心接口
import { useMessage } from '/@/hooks/web/useMessage';
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
import { useAppStore } from '/@/store/modules/app';
import {
  SolutionOutlined,
  ClusterOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'; // antd图标
export default defineComponent({
  name: 'baseInfo',
  components: {
    Card,
    Avatar,
    Divider,
    Tag,
    Tooltip,
    Input,
    ClusterOutlined,
    SolutionOutlined,
    EnvironmentOutlined,
    PlusOutlined,
  },
  setup() {
    const { createMessage } = useMessage();
    const { t } = useI18n();
    const userStore = useUserStore();
    const inputRef = ref();
    const state = reactive({
      tags: [],
      inputVisible: false,
      inputValue: '',
    });
    // 获取store用户信息
    const getUserInfo = computed(() => {
      // 获取用户信息
      const { tag } = userStore.getUserInfo;
      state.tags = tag ? tag.split(',') : [];
      return userStore.getUserInfo || {};
    });
    // 关闭输入框
    const handleClose = async (removedTag: string) => {
      const tags = state.tags.filter((tag) => tag !== removedTag);
      await changeUserTag({ tags: tags.join(',') });
      createMessage.success(t('router.common.deleteSuccess'));
      state.tags = tags;
      //   更新store信息
      userStore.setUserInfo(Object.assign(unref(getUserInfo), { tag: tags.join(',') }));
    };
    // 显示输入框
    const showInput = () => {
      state.inputVisible = true;
      nextTick(() => {
        inputRef.value.focus();
      });
    };
    const handleInputConfirm = async () => {
      const inputValue = state.inputValue;
      let tags = state.tags;
      //   判断是否有值
      if (!inputValue) {
        Object.assign(state, {
          tags,
          inputVisible: false,
          inputValue: '',
        });
        return;
      }
      //   不重复的值才插入
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      await changeUserTag({ tags: tags.join(',') });
      createMessage.success(t('router.common.addSuccess'));
      //   更新store信息
      userStore.setUserInfo(Object.assign(unref(getUserInfo), { tag: tags.join(',') }));
      Object.assign(state, {
        tags,
        inputVisible: false,
        inputValue: '',
      });
    };
    return {
      getUserInfo,
      ...toRefs(state),
      showInput,
      handleInputConfirm,
      handleClose,
      inputRef,
      t,
      useAppStore,
    };
  },
});
</script>
