<template>
  <div class="lg:flex">
    <Avatar :src="userinfo.avatar" :size="72" class="!mx-auto !block" />
    <div class="flex flex-col justify-center mt-2 md:ml-6 md:mt-0">
      <h1 class="md:text-lg text-md">早安, {{ userinfo.cn_name }}, 开始您一天的工作吧！</h1>
      <span class="text-secondary"> 今日晴，20℃ - 32℃！ </span>
    </div>
    <div class="flex justify-end flex-1 mt-4 md:mt-0">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> 待办 </span>
        <span class="text-2xl">2/10</span>
      </div>

      <div class="flex flex-col justify-center mx-12 text-right md:mx-16">
        <span class="text-secondary"> 项目 </span>
        <span class="text-2xl">8</span>
      </div>
      <div class="flex flex-col justify-center mr-4 text-right md:mr-10">
        <span class="text-secondary"> 团队 </span>
        <span class="text-2xl">300</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

import { Avatar } from 'ant-design-vue';
import { useUserStore } from '/@/store/modules/user';
export default defineComponent({
  components: { Avatar },
  setup() {
    const userStore = useUserStore();
    const userinfo = computed(() => userStore.getUserInfo);
    return { userinfo };
  },
});
</script>
