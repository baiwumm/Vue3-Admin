<template>
    <PageWrapper
        :title="t('router.features.imageRecognition.title')"
        :content="t('router.features.imageRecognition.content')"
    >
        <Row :gutter="20">
            <Col>
                <Card :bordered="false">
                    <Space>
                        <Upload name="file" :showUploadList="false" :beforeUpload="beforeUpload">
                            <Button>
                                <UploadOutlined />
                                {{ t('component.upload.imgUpload') }}
                            </Button>
                        </Upload>
                        <a-button
                            type="primary"
                            @click="initiateCall"
                        >{{ t('router.features.imageRecognition.initiate') }}</a-button>
                    </Space>
                </Card>
            </Col>
            <Col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
                <Card
                    :bordered="false"
                    hoverable
                    :title="t('router.features.imageRecognition.title')"
                >
                    <div class="img-container">
                        <Image :src="uploadImg" style="width: 100%" />
                    </div>
                </Card>
            </Col>
            <Col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
                <Card
                    :bordered="false"
                    hoverable
                    :title="t('router.features.imageRecognition.identify')"
                >
                    <div class="img-container">
                        <BasicTable @register="registerTable"></BasicTable>
                    </div>
                </Card>
            </Col>
            <Col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
                <Card
                    :bordered="false"
                    hoverable
                    :title="t('router.features.imageRecognition.json')"
                >
                    <div class="img-container">
                        <Empty v-if="!data.length" />
                        <pre v-else>{{ JSON.stringify(data, null, 4) }}</pre>
                    </div>
                </Card>
            </Col>
        </Row>
    </PageWrapper>
</template>

<script lang="ts" setup>
import { ref, unref, reactive } from 'vue';
import axios from 'axios'
import Qs from 'qs'
import { PageWrapper } from '/@/components/Page';
import { useI18n } from '/@/hooks/web/useI18n';
import { Button, Row, Col, Card, Upload, Space, Image, Empty } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { useLoading } from '/@/components/Loading';
import { BasicTable, useTable } from '/@/components/Table'; // 表格组件
import { columns } from './data'; // 表格配置项
import { UploadOutlined } from '@ant-design/icons-vue'; // antd图标
export interface generalResult {
    keyword: string;
    root: number;
    score: string
}

const { t } = useI18n();
const { createMessage } = useMessage();
const [openFullLoading, closeFullLoading] = useLoading({
    tip: t('common.loadingText'),
});
const uploadImg = ref<any>('')
const access_token = ref<string>('')
const data = ref<generalResult[]>([])
const [registerTable, { setTableData }] = useTable({
    // 注册表格
    rowKey: 'root',
    columns,
    showIndexColumn: false,
    bordered: true,
    pagination: false
});
function beforeUpload(file) {
    // 获取文件类型
    let maxSize: number = 5
    let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
    let whitelist = ['jpg', 'jpeg', 'png'].indexOf(fileType.toLowerCase()) !== -1
    // 判断图片大小
    let isLt5M = file.size / 1024 / 1024 < maxSize
    if (!isLt5M || !whitelist) {
        createMessage.warn(t('router.features.imageRecognition.maxSize', [maxSize]))
        return false
    }
    const reader = new FileReader()
    // 把Array Buffer转化为blob 如果是base64不需要
    // 转化为base64
    reader.readAsDataURL(file)
    reader.onload = () => {
        uploadImg.value = reader.result
    }
    // 转化为blob
    // reader.readAsArrayBuffer(file)
    return false
}
// 发起调用百度图像识别接口
async function initiateCall() {
    openFullLoading();
    if (!unref(uploadImg.value)) {
        createMessage.warn(t('router.features.imageRecognition.upload'))
        closeFullLoading();
        return false
    }
    // 调用token的三个必须参数,grant_type固定为client_credentials,client_id是应用APIKey,client_secret是应用SecretKey
    const baiduKey = reactive({ grant_type: 'client_credentials', APIKey: '9dL8XaGrF2CwbwU2PeCQzpYV', SecretKey: 'g1wq2AFb5Xz7K7PBsvdk6eKutZXxtwHe' })
    // 获取token
    await axios.get(`/baiduApi/oauth/2.0/token?grant_type=${baiduKey.grant_type}&client_id=${baiduKey.APIKey}&client_secret=${baiduKey.SecretKey}`,
        { headers: { dataType: 'json' } }
    ).then((res) => {
        if (res.status == 200) {
            access_token.value = res.data.access_token
        }
    })
    await axios.post('/baiduApi/rest/2.0/image-classify/v2/advanced_general', Qs.stringify({ access_token: access_token.value, image: uploadImg.value.split(',')[1] })
    ).then((res) => {
        data.value = res.data.result
        setTableData(res.data.result)
        closeFullLoading();
    })
}
</script>
<style lang="less" scoped>
.ant-card /deep/ .ant-card-body {
    margin-bottom: 20px;
}
.img-container {
    height: 500px;
    overflow-y: auto;
}
</style>
