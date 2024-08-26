<template>
  <a-space :size="[0, 8]" wrap>
    <template v-for="tag in value" :key="tag">
      <a-tooltip v-if="tag.length > 20" :title="tag">
        <a-tag closable @close="handleClose(tag)">
          {{ `${tag.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-else closable @close="handleClose(tag)">
        {{ tag }}
      </a-tag>
    </template>
    <a-input
      v-if="state.inputVisible"
      ref="inputRef"
      v-model:value="state.inputValue"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag
      v-else
      style="background: #fff; border-style: dashed"
      @click="showInput"
    >
      <plus-outlined />
      New Tag
    </a-tag>
  </a-space>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

// 父组件传递的值
type Props = {
  value: string[];
};
const props = defineProps<Props>();

const emit = defineEmits(["update:value"]);

const inputRef = ref();
const state = reactive({
  inputVisible: false,
  inputValue: "",
});

const handleClose = (removedTag: string) => {
  const tags = props.value.filter((tag: string) => tag !== removedTag);
  emit("update:value", tags);
};

const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

const handleInputConfirm = () => {
  const inputValue = state.inputValue;
  let tags = props.value;
  if (inputValue && tags.indexOf(inputValue) === -1) {
    tags = [...tags, inputValue];
  }
  Object.assign(state, {
    inputVisible: false,
    inputValue: "",
  });
  emit("update:value", tags);
};
</script>
