<template>
    <Card :bordered="false">
        <!-- 顶部头像信息 -->
        <div class="text-center">
            <div class="avatar">
                <!-- 判断是否有头像 -->
                <Avatar :size="104" :src="getUserInfo.avatar" v-if="getUserInfo.avatar" />
                <!-- 没有头像则展示中文名两位 -->
                <Avatar
                    :size="104"
                    v-else
                    :style="{
                        fontSize: '36px !important',
                        background: useAppStore().getProjectConfig.themeColor,
                    }"
                >{{ getUserInfo.cn_name.substr(getUserInfo.cn_name.length - 2, 2) }}</Avatar>
            </div>
            <div class="my-4 text-2xl">{{ getUserInfo.cn_name }}</div>
            <div class="motto">{{ getUserInfo.motto }}</div>
        </div>
        <div class="my-4">
            <p class="mb-2">
                <SolutionOutlined />
                <span class="ml-2">{{ getUserInfo.post_name || '--' }}</span>
            </p>
            <p class="mb-2">
                <ClusterOutlined />
                <span class="ml-2">{{ getUserInfo.org_name || '--' }}</span>
            </p>
            <p class="mb-2">
                <EnvironmentOutlined />
                <span
                    class="ml-2"
                >{{ getUserInfo.address ? getUserInfo.address.split(',').join('-') : '--' }}</span>
            </p>
        </div>
        <Divider />
        <!-- 添加标签 -->
        <div class="mb-2">{{ t('router.common.tag') }}</div>
        <template v-for="(tag, index) in state.tags" :key="index">
            <Tooltip v-if="tag.length > 8" :title="tag">
                <Tag
                    :key="tag"
                    :closable="true"
                    :color="tag.length > 4 ? 'cyan' : tag.length > 2 ? 'blue' : 'purple'"
                    @close="handleClose(tag)"
                    style="margin-top: 8px"
                >{{ `${tag.slice(0, 8)}...` }}</Tag>
            </Tooltip>
            <Tag
                v-else
                :closable="true"
                :key="index"
                :color="tag.length > 4 ? 'cyan' : tag.length > 2 ? 'blue' : 'purple'"
                @close="handleClose(tag)"
                style="margin-top: 8px"
            >{{ tag }}</Tag>
        </template>
        <!-- 添加标签 -->
        <Input
            v-if="state.inputVisible"
            ref="inputRef"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            v-model:value="state.inputValue"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
        />
        <Tag v-else @click="showInput" style="background: #fff" class="border-dashed">
            <PlusOutlined />New Tag
        </Tag>
    </Card>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, nextTick, unref } from 'vue'; // 引入 Composition-API
import { Card, Avatar, Divider, Tag, Tooltip, Input } from 'ant-design-vue'; // 引入antd组件
import { useUserStore } from '/@/store/modules/user'; // 用户信息
import { changeUserTag } from '/@/api/personal/personal'; // 个人中心接口
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
import { useAppStore } from '/@/store/modules/app'; // vuex配置
import { SolutionOutlined, ClusterOutlined, EnvironmentOutlined, PlusOutlined } from '@ant-design/icons-vue'; // 引入antd图标
interface StResult {
    tags: any;
    inputVisible: boolean;
    inputValue: string
}

const { createMessage } = useMessage(); //消息函数
const { t } = useI18n(); // 国际化函数
const userStore = useUserStore(); // 用户vuex信息
const inputRef = ref();
const state = reactive<StResult>({
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
    const inputValue: string = state.inputValue;
    let tags: string[] = state.tags;
    //   判断是否有值
    if (!inputValue) {
        Object.assign(state, { tags, inputVisible: false, inputValue: '' });
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
    Object.assign(state, { tags, inputVisible: false, inputValue: '' });
};
</script>
