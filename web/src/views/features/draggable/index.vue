<script setup lang="ts">
import { range } from 'lodash-es';
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

const list = ref(range(1, 31));

const dragOptions = ref({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
});
</script>

<template>
  <div>
    <ACard :bordered="false">
      <VueDraggable v-model="list" v-bind="dragOptions" class="list-group">
        <div v-for="element in list" :key="element" class="list-group-item">
          {{ element }}
        </div>
      </VueDraggable>
    </ACard>
  </div>
</template>

<style lang="scss" scoped>
.list-group {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 20px;
  &-item {
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: large;
    cursor: pointer;
    user-select: none;
    border-radius: 10px;
    overflow: hidden;
    font-size: 30px;
    font-weight: bold;
    aspect-ratio: 1 / 1;
  }
}
</style>
