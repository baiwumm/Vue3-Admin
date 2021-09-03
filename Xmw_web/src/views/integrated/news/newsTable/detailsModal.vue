<template>
    <BasicModal
        v-bind="$attrs"
        @register="registerModal"
        :footer="null"
        defaultFullscreen
        :title="null"
        :canFullscreen="false"
    >
        <div class="w-3/5 mx-auto text-2xl">
            <h1 class="font-bold text-center">{{ newsDetails.title }}</h1>
            <div class="text-base text-right">
                <div>
                    作者：
                    <Tag color="cyan">{{ newsDetails.author_name }}</Tag>
                </div>
                <div>发布时间：{{ newsDetails.create_time }}</div>
            </div>
            <div class="mt-4" v-html="newsDetails.content"></div>
        </div>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'; // 引入 Composition-API
import { BasicModal, useModalInner } from '/@/components/Modal'; //模态框组件
import { Tag } from 'ant-design-vue'; // 引入antd组件

// useModalInner用于独立的 Modal 内部调用
const newsDetails = ref<any>({})
const [registerModal] = useModalInner(data => {
    newsDetails.value = data.record
})
</script>
