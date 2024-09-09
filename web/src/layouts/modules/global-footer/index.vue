<script setup lang="tsx">
defineOptions({
  name: 'GlobalFooter',
});
</script>

<template>
  <DarkModeContainer class="h-full flex-center">
    <ASpace direction="vertical" align="center" :size="0">
      <ASpace>
        <a href="https://github.com/baiwumm/Xmw-Admin" target="_blank" rel="noopener noreferrer">Xmw Admin</a>
        <a href="https://github.com/baiwumm/Vue3-Admin" target="_blank" rel="noopener noreferrer">
          <SvgIcon icon="ri:github-fill" class="text-base" />
        </a>
        <a href="https://github.com/baiwumm/Vue2-Admin" target="_blank" rel="noopener noreferrer">Vue2 Admin</a>
      </ASpace>
      <ASpace>
        Copyright MIT ©
        <a href="https://baiwumm.com" target="_blank" rel="noopener noreferrer">白雾茫茫丶</a>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">粤ICP备2023007649号</a>
      </ASpace>
    </ASpace>
  </DarkModeContainer>
</template>

<style scoped></style>
