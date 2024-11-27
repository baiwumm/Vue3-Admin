<script setup lang="ts">
import { I18N_COMMON } from '@/enum/i18n';
import { $t } from '@/locales';
defineOptions({
  name: 'TableHeaderOperation',
});

// 定义一个接口来描述 props 的类型
type Props = {
  disabledDelete?: boolean;
  loading?: boolean;
  addBtn?: boolean;
  batchDeleteBtn?: boolean;
};

withDefaults(defineProps<Props>(), {
  disabledDelete: false,
  loading: false,
  addBtn: true,
  batchDeleteBtn: false,
});

interface Emits {
  (e: 'add'): void;
  (e: 'delete'): void;
  (e: 'refresh'): void;
}

const emit = defineEmits<Emits>();

const columns = defineModel<AntDesign.TableColumnCheck[]>('columns', {
  default: () => [],
});

function add() {
  emit('add');
}

function batchDelete() {
  emit('delete');
}

function refresh() {
  emit('refresh');
}
</script>

<template>
  <div class="flex flex-wrap justify-end gap-x-12px gap-y-8px lt-sm:(w-200px py-12px)">
    <slot name="prefix"></slot>
    <slot name="default">
      <AButton v-if="addBtn" size="small" ghost type="primary" @click="add">
        <template #icon>
          <icon-ic-round-plus class="align-sub text-icon" />
        </template>
        <span class="ml-8px">{{ $t(I18N_COMMON.ADD) }}</span>
      </AButton>
      <template v-if="batchDeleteBtn">
        <APopconfirm :description="$t(I18N_COMMON.CONFIRM_DELETE)" :disabled="disabledDelete" @confirm="batchDelete">
          <AButton size="small" danger :disabled="disabledDelete">
            <template #icon>
              <icon-ic-round-delete class="align-sub text-icon" />
            </template>
            <span class="ml-8px">{{ $t(I18N_COMMON.BATCH_DELETE) }}</span>
          </AButton>
        </APopconfirm>
      </template>
    </slot>
    <AButton size="small" @click="refresh">
      <template #icon>
        <icon-mdi-refresh class="align-sub text-icon" :class="{ 'animate-spin': loading }" />
      </template>
      <span class="ml-8px">{{ $t(I18N_COMMON.REFRESH) }}</span>
    </AButton>
    <TableColumnSetting v-model:columns="columns" />
    <slot name="suffix"></slot>
  </div>
</template>

<style scoped></style>
