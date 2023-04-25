<template >
    <Card>
        <Row>
            <Col>
                <Space>
                    <!-- 垂直展示 -->
                    <Checkbox
                        v-model:checked="isHorizontal"
                    >{{ t('router.integrated.organizational.horizontal') }}</Checkbox>
                    <!-- 折叠节点 -->
                    <Checkbox
                        v-model:checked="collapsable"
                    >{{ t('router.integrated.organizational.collapsable') }}</Checkbox>
                    <!-- 主题背景 -->
                    <Select
                        @change="changeClassName"
                        :default-value="labelClassName"
                        style="width: 120px"
                        size="small"
                    >
                        <SelectOption
                            :value="item.value"
                            v-for="(item, index) in labelClassNameItem"
                            :key="index"
                        >{{ item.label }}</SelectOption>
                    </Select>
                    <!-- 架构类型 -->
                    <RadioGroup v-model:value="architectureType" @change="changeType" size="small">
                        <RadioButton :value="1">{{ t('router.integrated.organizational.title') }}</RadioButton>
                        <RadioButton :value="2">{{ t('router.integrated.organizational.post') }}</RadioButton>
                    </RadioGroup>
                </Space>
            </Col>
            <!-- 架构图 -->
            <Col style="text-align: center; overflow: auto">
                <Spin :spinning="spinning"></Spin>
                <VueBlocksTree
                    v-if="!spinning"
                    :data="treeData"
                    :horizontal="isHorizontal"
                    :collapsable="collapsable"
                    :props="treeProps"
                    :label-class-name="labelClassName"
                ></VueBlocksTree>
            </Col>
        </Row>
    </Card>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, createApp } from 'vue';// 引入 Composition-API
// 引入VueBlocksTree组件
import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';
import { useI18n } from '/@/hooks/web/useI18n';  // 国际化配置
import { Row, Col, Card, Checkbox, Spin, Select, Space, Radio } from 'ant-design-vue'; // 引入antd组件
import { getOrganizationTree } from '/@/api/system/organizationManagement'; // 组织树接口
import { getPostTree } from '/@/api/system/postManagement'; // 岗位树接口
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const SelectOption = Select.Option
// 架构Tree类型接口
interface treeResult {
    org_name: string;
    expand: boolean;
    key: number;
    children?: Object[]
}

const App = createApp({})
// 注册VueBlocksTree组件
let defaultoptions = { treeName: 'blocks-tree' }
createApp(App).use(VueBlocksTree, defaultoptions)

const { t } = useI18n(); // 国际化函数
const isHorizontal = ref<boolean>(false) // 是否垂直展示
const collapsable = ref<boolean>(true) // 折叠节点
const architectureType = ref<number>(1) // 架构类型
const spinning = ref<boolean>(false) // 加载Loading...
const labelClassName = ref<string>('bg-primary') // 主题背景类名
const labelClassNameItem = reactive([
    { value: 'bg-primary', label: t('router.integrated.organizational.primary') },
    { value: 'bg-white', label: t('router.integrated.organizational.white') },
    { value: 'bg-orange', label: t('router.integrated.organizational.orange') },
    { value: 'bg-gold', label: t('router.integrated.organizational.gold') },
    { value: 'bg-gray', label: t('router.integrated.organizational.gray') },
    { value: 'bg-lightpink', label: t('router.integrated.organizational.pink') },
    { value: 'bg-chocolate', label: t('router.integrated.organizational.chocolate') },
    { value: 'bg-tomato', label: t('router.integrated.organizational.tomato') },
])
const treeProps = { label: 'org_name', children: 'children', key: 'org_id' } // 组件配置
const treeData = reactive<treeResult>({ org_name: 'Vue3 Admin', expand: false, key: 0 });

// 不同类型接口切换
async function getArchitectureTree() {
    switch (architectureType.value) {
        // 组织架构
        case 1:
            spinning.value = true
            await getOrganizationTree().then(res => {
                treeData.children = res
            }).finally(() => {
                spinning.value = false
            })
            break;
        // 岗位架构
        case 2:
            spinning.value = true
            await getPostTree().then(res => {
                treeData.children = res
            }).finally(() => {
                spinning.value = false
            })
    }
}
// 改变架构类型触发
function changeType() {
    getArchitectureTree()
}

// 切换主题颜色
function changeClassName(value) {
    labelClassName.value = value
}

// 首次挂载
onMounted(async () => {
    getArchitectureTree()
})

</script>

<style lang="less" scoped>
@bgColor: background-color;

.org-tree-node-label {
    white-space: nowrap;
}

/deep/ .bg-primary {
    @{bgColor}: @primary-color;
}

/deep/ .bg-white {
    @{bgColor}: white;
}

/deep/ .bg-orange {
    @{bgColor}: orange;
}

/deep/ .bg-gold {
    @{bgColor}: gold;
}

/deep/ .bg-gray {
    @{bgColor}: gray;
}

/deep/ .bg-lightpink {
    @{bgColor}: lightpink;
}

/deep/ .bg-chocolate {
    @{bgColor}: chocolate;
}

/deep/ .bg-tomato {
    @{bgColor}: tomato;
}
</style>