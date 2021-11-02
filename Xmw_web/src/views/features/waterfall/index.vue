<template>
  <PageWrapper
    :title="t('router.features.waterfall.title')"
    :content="t('router.features.waterfall.content')"
  >
    <div class="waterfall-container">
      <VueWaterfall
        class="waterfall"
        scrollBodySelector=".waterfall-container"
        :isMounted="isMounted"
        :list="list"
        srcKey="imgSrc"
        :gap="12"
        :colWidth="280"
        :distanceToScroll="200"
        :isLoading="loading"
        :isOver="isOver"
        @scrollReachBottom="getNext"
      >
        <!-- 默认插槽 -->
        <template v-slot:default="slotProp">
          <Image :src="slotProp.item.imgSrc"> </Image>
        </template>
        <!-- 加载插槽 -->
        <template v-slot:loading>
          <div class="waterfall-loading">
            <Spin size="large" />
          </div>
        </template>
        <!-- 底部插槽，没数据的时候 -->
        <template v-slot:footer>
          <div class="nomore">{{ t('router.features.waterfall.noMore') }}</div>
        </template>
      </VueWaterfall>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { PageWrapper } from '/@/components/Page'; // 页面包裹组件
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化
import VueWaterfall from '/@/components/Waterfall'; // 瀑布流组件
import { Image, Spin } from 'ant-design-vue'; // antd组件
import { getData } from './data'; // 静态数据
const { t } = useI18n(); // 国际化函数'
const isMounted = ref(false); // 父组件是否挂载完成，配合scrollBodySelector参数使用
const list = ref<unknown[]>([]); //瀑布流列表数据
const loading = ref(false);
const isOver = ref(false); //控制数据是否已经全部加载完成(即不需要再滚动加载)

const fetchList = async (): Promise<void> => {
  loading.value = true;
  const newList = await getData();
  loading.value = false;
  list.value = list.value.concat(newList);
  if (list.value.length > 120) isOver.value = true;
};
onMounted(() => {
  isMounted.value = true;
  fetchList();
});

let isLoad = false;

// 触发加载更多时的函数
const getNext: () => Promise<void> = async (): Promise<void> => {
  if (isLoad) return;
  isLoad = true;
  await fetchList();
  isLoad = false;
};
</script>

<style lang="less" scoped>
.waterfall-container {
  height: calc(100vh - 320px); /* 父元素一定要指定高度 */
  overflow-y: scroll; /* 一定要制定父元素超出滚动 */
  .waterfall-loading {
    text-align: center;
  }
  .nomore {
    text-align: center;
  }
}
</style>



