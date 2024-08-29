<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue';
import { nextTick, reactive, ref } from 'vue';

// 父组件传递的值
type Props = {
  value: string[];
};
const props = defineProps<Props>();

// 父组件自定义事件
interface Emits {
  (e: 'update:value', value: string[]): void;
}
const emit = defineEmits<Emits>();

const inputRef = ref();
const state = reactive({
  inputVisible: false,
  inputValue: '',
});

const handleClose = (removedTag: string) => {
  const tags = props.value.filter((tag: string) => tag !== removedTag);
  emit('update:value', tags);
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
  if (inputValue && !tags.includes(inputValue)) {
    tags = [...tags, inputValue];
  }
  Object.assign(state, {
    inputVisible: false,
    inputValue: '',
  });
  emit('update:value', tags);
};
</script>

<template>
  <ASpace :size="[0, 8]" wrap>
    <template v-for="tag in value" :key="tag">
      <ATooltip v-if="tag.length > 20" :title="tag">
        <ATag closable @close="handleClose(tag)">
          {{ `${tag.slice(0, 20)}...` }}
        </ATag>
      </ATooltip>
      <ATag v-else closable @close="handleClose(tag)">
        {{ tag }}
      </ATag>
    </template>
    <AInput
      v-if="state.inputVisible"
      ref="inputRef"
      v-model:value="state.inputValue"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <ATag v-else class="border-dashed bg-white" @click="showInput">
      <PlusOutlined />
      New Tag
    </ATag>
  </ASpace>
</template>
