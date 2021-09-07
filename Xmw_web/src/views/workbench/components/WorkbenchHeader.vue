<template>
    <div class="lg:flex">
        <Avatar :src="userinfo.avatar" :size="72" class="!mx-auto !block" />
        <div class="flex flex-col justify-center mt-2 md:ml-6 md:mt-0">
            <h1 class="md:text-lg text-md">{{ timeFix() }}, {{ userinfo.cn_name }}, {{ welcome() }}</h1>
            <span class="text-secondary">{{ userinfo.address?.split(',').join('-') }}</span>
        </div>
        <div class="flex justify-end flex-1 mt-4 md:mt-0">
            <div class="flex flex-col justify-center text-right">
                <span class="text-secondary">待办</span>
                <span class="text-2xl">2/10</span>
            </div>

            <div class="flex flex-col justify-center mx-12 text-right md:mx-16">
                <span class="text-secondary">项目</span>
                <span class="text-2xl">8</span>
            </div>
            <div class="flex flex-col justify-center mr-4 text-right md:mr-10">
                <span class="text-secondary">团队</span>
                <span class="text-2xl">300</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'; // 引入 Composition-API
import { timeFix, welcome } from '/@/utils' // 工具函数
import { Avatar } from 'ant-design-vue'; // 引入antd组件
import { useUserStore } from '/@/store/modules/user';

const userStore = useUserStore();
const userinfo = computed(() => userStore.getUserInfo);
</script>
