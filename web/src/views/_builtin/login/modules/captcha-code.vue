<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getCaptcha } from "@/service/api";

// 图形验证码
const captchaCode = ref("");
const captchaLoading = ref(false);

const fetchcaptcha = async () => {
  captchaLoading.value = true;
  const { error, data } = await getCaptcha();
  captchaLoading.value = false;
  if (!error) {
    captchaCode.value = data;
  }
};

onMounted(() => {
  fetchcaptcha();
});
</script>
<template>
  <ASpin :spinning="captchaLoading">
    <div
      v-html="captchaCode"
      @click="fetchcaptcha"
      class="cursor-pointer"
    ></div>
  </ASpin>
</template>
