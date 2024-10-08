<script setup lang="ts">
import { computed } from 'vue';

import { $t } from '@/locales';
import { useThemeStore } from '@/store/modules/theme';

import SettingItem from '../components/setting-item.vue';

defineOptions({
  name: 'PageFun',
});

const themeStore = useThemeStore();

const layoutMode = computed(() => themeStore.layout.mode);

const isMixLayoutMode = computed(() => layoutMode.value.includes('mix'));

// 滚动模式
const ThemeScrollMode: UnionKey.ThemeScrollMode[] = ['wrapper', 'content'];

// 标签栏风格
const ThemeTabMode: UnionKey.ThemeTabMode[] = ['chrome', 'button'];

// 页面切换动画类型
const ThemePageAnimationMode: UnionKey.ThemePageAnimateMode[] = [
  'fade-slide',
  'fade',
  'fade-bottom',
  'fade-scale',
  'zoom-fade',
  'zoom-out',
  'none',
];

const isWrapperScrollMode = computed(() => themeStore.layout.scrollMode === 'wrapper');
</script>

<template>
  <ADivider>{{ $t('theme.pageFunTitle') }}</ADivider>
  <TransitionGroup tag="div" name="setting-list" class="flex-col-stretch gap-12px">
    <SettingItem key="1" :label="$t('theme.scrollMode.title')">
      <ASelect v-model:value="themeStore.layout.scrollMode" class="w-120px">
        <ASelectOption v-for="item in ThemeScrollMode" :key="item" :value="item">
          {{ $t(`theme.scrollMode.${item}`) }}
        </ASelectOption>
      </ASelect>
    </SettingItem>
    <SettingItem key="1-1" :label="$t('theme.page.animate')">
      <ASwitch v-model:checked="themeStore.page.animate" />
    </SettingItem>
    <SettingItem v-if="themeStore.page.animate" key="1-2" :label="$t('theme.page.mode.title')">
      <ASelect v-model:value="themeStore.page.animateMode" class="w-120px">
        <ASelectOption v-for="item in ThemePageAnimationMode" :key="item" :value="item">
          {{ $t(`theme.page.mode.${item}`) }}
        </ASelectOption>
      </ASelect>
    </SettingItem>
    <SettingItem v-if="isWrapperScrollMode" key="2" :label="$t('theme.fixedHeaderAndTab')">
      <ASwitch v-model:checked="themeStore.fixedHeaderAndTab" />
    </SettingItem>
    <SettingItem key="3" :label="$t('theme.header.height')">
      <AInputNumber v-model:value="themeStore.header.height" class="w-120px" />
    </SettingItem>
    <SettingItem key="4" :label="$t('theme.header.breadcrumb.visible')">
      <ASwitch v-model:checked="themeStore.header.breadcrumb.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.header.breadcrumb.visible" key="4-1" :label="$t('theme.header.breadcrumb.showIcon')">
      <ASwitch v-model:checked="themeStore.header.breadcrumb.showIcon" />
    </SettingItem>
    <SettingItem key="5" :label="$t('theme.tab.visible')">
      <ASwitch v-model:checked="themeStore.tab.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="5-1" :label="$t('theme.tab.cache')">
      <ASwitch v-model:checked="themeStore.tab.cache" />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="5-2" :label="$t('theme.tab.height')">
      <AInputNumber v-model:value="themeStore.tab.height" class="w-120px" />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="5-3" :label="$t('theme.tab.mode.title')">
      <ASelect v-model:value="themeStore.tab.mode" class="w-120px">
        <ASelectOption v-for="item in ThemeTabMode" :key="item" :value="item">
          {{ $t(`theme.tab.mode.${item}`) }}
        </ASelectOption>
      </ASelect>
    </SettingItem>
    <SettingItem v-if="layoutMode === 'vertical'" key="6-1" :label="$t('theme.sider.width')">
      <AInputNumber v-model:value="themeStore.sider.width" class="w-120px" />
    </SettingItem>
    <SettingItem v-if="layoutMode === 'vertical'" key="6-2" :label="$t('theme.sider.collapsedWidth')">
      <AInputNumber v-model:value="themeStore.sider.collapsedWidth" class="w-120px" />
    </SettingItem>
    <SettingItem v-if="isMixLayoutMode" key="6-3" :label="$t('theme.sider.mixWidth')">
      <AInputNumber v-model:value="themeStore.sider.mixWidth" class="w-120px" />
    </SettingItem>
    <SettingItem v-if="isMixLayoutMode" key="6-4" :label="$t('theme.sider.mixCollapsedWidth')">
      <AInputNumber v-model:value="themeStore.sider.mixCollapsedWidth" class="w-120px" />
    </SettingItem>
    <SettingItem v-if="layoutMode === 'vertical-mix'" key="6-5" :label="$t('theme.sider.mixChildMenuWidth')">
      <AInputNumber v-model:value="themeStore.sider.mixChildMenuWidth" class="w-120px" />
    </SettingItem>
    <SettingItem key="7" :label="$t('theme.footer.visible')">
      <ASwitch v-model:checked="themeStore.footer.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible && isWrapperScrollMode" key="7-1" :label="$t('theme.footer.fixed')">
      <ASwitch v-model:checked="themeStore.footer.fixed" />
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible" key="7-2" :label="$t('theme.footer.height')">
      <AInputNumber v-model:value="themeStore.footer.height" class="w-120px" />
    </SettingItem>
    <SettingItem
      v-if="themeStore.footer.visible && layoutMode === 'horizontal-mix'"
      key="7-3"
      :label="$t('theme.footer.right')"
    >
      <ASwitch v-model:checked="themeStore.footer.right" />
    </SettingItem>
  </TransitionGroup>
</template>

<style scoped>
.setting-list-move,
.setting-list-enter-active,
.setting-list-leave-active {
  --uno: transition-all-300;
}

.setting-list-enter-from,
.setting-list-leave-to {
  --uno: opacity-0 -translate-x-30px;
}

.setting-list-leave-active {
  --uno: absolute;
}
</style>
