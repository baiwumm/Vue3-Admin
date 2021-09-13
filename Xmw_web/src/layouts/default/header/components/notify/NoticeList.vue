<template>
    <a-list
        :class="prefixCls"
        bordered
        :loading="loading"
        class="overflow-y-scroll notify-list"
        :pagination="getPagination"
    >
        <template v-for="item in getData" :key="item.id">
            <a-list-item class="relative">
                <a-list-item-meta>
                    <template #title>
                        <a-typography-paragraph
                            @click="handleTitleClick(item)"
                            style="width: 100%; margin-bottom: 0 !important"
                            :style="{ cursor: isTitleClickable ? 'pointer' : '' }"
                            :ellipsis="
                                titleRows > 0 ? { rows: titleRows, tooltip: item.title } : false
                            "
                            :content="item.title"
                        />
                    </template>
                    <!-- 头像 -->
                    <template #avatar>
                        <Badge :dot="!item.already" :offset="[10, 5]">
                            <a-avatar :src="item.avatar" />
                        </Badge>
                    </template>
                    <!-- 相对时间 -->
                    <template #description>
                        <ClockCircleOutlined class="mr-2" />
                        <Time :value="relativeTime(item.create_time)" />
                        <a-tag
                            :color="useAppStore().getProjectConfig.themeColor"
                            class="float-right"
                        >{{ item.author_name }}</a-tag>
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </template>
    </a-list>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, unref } from 'vue'; // 引入 Composition-API
import { getNewsResultModel } from '/@/api/integrated/model/newsModel' // 新闻公告数据类型注解
import { useDesign } from '/@/hooks/web/useDesign';
import { List, Avatar, Tag, Typography, Badge } from 'ant-design-vue'; // 引入antd组件
import { Time } from '/@/components/Time'; // 相对时间
import { useAppStore } from '/@/store/modules/app'; // vuex配置
import { ClockCircleOutlined } from '@ant-design/icons-vue'
export default defineComponent({
    components: {
        [Avatar.name]: Avatar,
        [List.name]: List,
        [List.Item.name]: List.Item,
        AListItemMeta: List.Item.Meta,
        ATypographyParagraph: Typography.Paragraph,
        [Tag.name]: Tag,
        Time,
        Badge,
        ClockCircleOutlined
    },
    props: {
        list: {
            type: Array as PropType<getNewsResultModel[]>,
            default: () => [],
        },
        pageSize: {
            type: [Boolean, Number] as PropType<Boolean | Number>,
            default: 5,
        },
        currentPage: {
            type: Number,
            default: 1,
        },
        total: {
            type: Number,
            default: 0,
        },
        titleRows: {
            type: Number,
            default: 1,
        },
        onTitleClick: {
            type: Function as PropType<(Recordable) => void>,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['loadingMore'],
    setup(props, { emit }) {
        const { prefixCls } = useDesign('header-notify-list');
        const current = ref(props.currentPage || 1);
        const getData = computed(() => {
            const { list } = props
            return list
        });
        const isTitleClickable = computed(() => !!props.onTitleClick);

        const getPagination = computed(() => {
            const { total, pageSize } = props;
            if (total < pageSize && unref(current) === 1) {
                return false
            } else {
                return {
                    total: total,
                    pageSize,
                    // size: 'small',
                    current: unref(current),
                    onChange(page) {
                        current.value = page;
                        emit('loadingMore', page)
                    },
                };
            }
        });
        function relativeTime(time) {
            return new Date(time).getTime()
        }
        function handleTitleClick(item: getNewsResultModel) {
            props.onTitleClick && props.onTitleClick(item);
        }
        return { prefixCls, getData, handleTitleClick, isTitleClickable, getPagination, relativeTime, useAppStore };
    },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-header-notify-list";

.@{prefix-cls} {
    width: 320px;
    max-height: 430px;
    &::-webkit-scrollbar {
        display: none;
    }

    ::v-deep(.ant-pagination-disabled) {
        display: inline-block !important;
    }
}
</style>
