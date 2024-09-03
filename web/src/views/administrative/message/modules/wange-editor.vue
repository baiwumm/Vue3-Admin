<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';

import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue';

// 父组件传递的值
type Props = {
  modelValue: string;
  visible: boolean;
};
const props = defineProps<Props>();

// 父组件自定义事件
interface Emits {
  (e: 'update:modelValue', value: string): void;
}
const emit = defineEmits<Emits>();

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('');

const mode = ref('simple');

const toolbarConfig: Partial<IToolbarConfig> = {};
const editorConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...' };

// 编辑器回调函数
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const handleChange = (editor: IDomEditor) => {
  // 判断是否空段落
  emit('update:modelValue', editor.isEmpty() ? '' : editor.getHtml());
};

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor === null) return;

  editor.destroy();
});

watch(
  () => props.visible,
  () => {
    if (props.visible) {
      valueHtml.value = '';
    }
  },
);

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      valueHtml.value = props.modelValue;
    }
  },
);
</script>

<template>
  <div :style="{ border: '1px solid #ccc' }">
    <Toolbar
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
      :style="{ borderBottom: '1px solid #ccc' }"
    />
    <Editor
      v-model="valueHtml"
      :default-config="editorConfig"
      :mode="mode"
      :style="{ height: '400px', overflowY: 'hidden' }"
      @on-change="handleChange"
      @on-created="handleCreated"
    />
  </div>
</template>
