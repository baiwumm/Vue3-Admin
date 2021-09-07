<template>
    <Row :gutter="24" style="margin-bottom: 20px;">
        <!-- 总销售额 -->
        <Col :sm="24" :md="12" :xl="6">
            <chart-card title="总销售额" :total="'¥' + filterDigital(126560, 2)" :loading="loading">
                <template v-slot:action>
                    <Tooltip title="指标说明">
                        <InfoCircleOutlined />
                    </Tooltip>
                </template>
                <div>
                    <trend flag="up" style="margin-right: 16px">
                        <span slot="term">周同比</span>
                        12%
                    </trend>
                    <trend flag="down">
                        <span slot="term">日同比</span>
                        11%
                    </trend>
                </div>
                <template v-slot:footer>
                    日均销售额
                    <span>{{ '¥' + filterDigital(234.56, 2) }}</span>
                </template>
            </chart-card>
        </Col>
        <!-- 访问量 -->
        <Col :sm="24" :md="12" :xl="6">
            <chart-card title="访问量" :total="filterDigital(8846.02, 0)" :loading="loading">
                <template v-slot:action>
                    <Tooltip title="指标说明">
                        <InfoCircleOutlined />
                    </Tooltip>
                </template>
                <div style="margin-bottom: -10px">
                    <MiniArea :value="miniAreaData" :Height="60" />
                </div>
                <template v-slot:footer>
                    日访问量
                    <span>{{ filterDigital(5623, 0) }}</span>
                </template>
            </chart-card>
        </Col>
        <!-- 支付笔数 -->
        <Col :sm="24" :md="12" :xl="6">
            <chart-card :loading="loading" title="支付笔数" :total="filterDigital(6560, 0)">
                <template v-slot:action>
                    <Tooltip title="指标说明">
                        <InfoCircleOutlined />
                    </Tooltip>
                </template>
                <div style="margin-bottom: -10px">
                    <MiniBar :value="miniBarData" :Height="60" />
                </div>
                <template v-slot:footer>
                    转化率
                    <span>60%</span>
                </template>
            </chart-card>
        </Col>
        <!-- 客户满意度 -->
        <Col :sm="24" :md="12" :xl="6">
            <chart-card :loading="loading" title="客户满意度" total="80">
                <template v-slot:action>
                    <Tooltip title="指标说明">
                        <InfoCircleOutlined />
                    </Tooltip>
                </template>
                <div style="margin-bottom: -15px">
                    <MiniBullet :value="miniBulletData" :Height="60" />
                </div>
                <template v-slot:footer>
                    <trend flag="down" style="margin-right: 16px">
                        <span slot="term">周同比</span>
                        12%
                    </trend>
                    <trend flag="up">
                        <span slot="term">日同比</span>
                        80%
                    </trend>
                </template>
            </chart-card>
        </Col>
    </Row>
    <Row :gutter="24" style="margin-bottom: 20px;">
        <Col :sm="24" :md="12" :xl="14">
            <Card :bordered="false" hoverable title="每月收支情况" :loading="loading">
                <Waterfall :Height="250" :value="WaterfallData" />
            </Card>
        </Col>
        <Col :sm="24" :md="12" :xl="10">
            <Card :bordered="false" hoverable title="动态更新的柱状图" :loading="loading">
                <Column :Height="250" :value="ColumnData" />
            </Card>
        </Col>
    </Row>
    <Row :gutter="24" style="margin-bottom: 20px;">
        <Col>
            <Card :bordered="false" hoverable title="联动高亮" :loading="loading">
                <MultiView :Height="500" :value="MultiViewData" />
            </Card>
        </Col>
    </Row>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue' // 引入 Composition-API
import { Row, Col, Tooltip, Card } from 'ant-design-vue';// 引入antd组件
import { ChartCard, MiniArea, MiniBar, MiniBullet, Waterfall, MultiView, Column } from '/@/components/G2plotEharts/' // 销售卡片组件
import Trend from '/@/components/Trend' //数字组件
import { filterDigital } from '/@/utils'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { miniAreaData, miniBarData, miniBulletData, WaterfallData, MultiViewData, ColumnData } from './data'

const loading = ref<boolean>(true) // 销售卡片loading

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
})

</script>

