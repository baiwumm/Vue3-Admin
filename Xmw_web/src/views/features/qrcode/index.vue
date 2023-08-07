<template>
    <PageWrapper :title="t('router.features.qrcode.title')">
        <Row :gutter="20">
            <Col
                :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="6"
                v-for="(qr,index) in qrCodeList"
                :key="index"
                style="margin-bottom: 20px;"
            >
                <CollapseContainer :title="qr.title" class="text-center">
                    <QrCode
                        :value="qr.url"
                        :options="qr.options"
                        :tag="qr.tag"
                        :logo="qr.logo"
                        :width="qr.width"
                    />
                </CollapseContainer>
            </Col>
            <Col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" style="margin-bottom: 20px;">
                <CollapseContainer :title="t('router.features.qrcode.title8')" class="text-center">
                    <QrCode
                        :value="qrCodeUrl"
                        :width="260"
                        :options="{ margin: 5 }"
                        ref="qrDiyRef"
                        :logo="LogoImg"
                        @done="onQrcodeDone"
                    />
                    <a-button class="mb-2" type="primary" @click="downloadDiy">下载</a-button>
                </CollapseContainer>
            </Col>
        </Row>
    </PageWrapper>
</template>
<script lang="ts" setup>
import { ref, unref } from 'vue';
import { QrCode } from '/@/components/Qrcode/index';
import LogoImg from '/@/assets/images/logo.png';
import { CollapseContainer } from '/@/components/Container/index';
import { PageWrapper } from '/@/components/Page';
import { Row, Col } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';
export interface QrCodeActionType {
    download: (fileName?: string) => void;
}
export interface QrCodeResult {
    title: string;
    url: string;
    tag?: 'canvas' | 'img' | undefined;
    options?: Object,
    logo?: string | Object,
    width?: number | undefined
}
const { t } = useI18n();
const qrCodeUrl = 'https://www.baidu.cn';
const qrCodeList: QrCodeResult[] = [
    { title: t('router.features.qrcode.title1'), url: qrCodeUrl },
    { title: t('router.features.qrcode.title2'), url: qrCodeUrl, tag: 'img' },
    { title: t('router.features.qrcode.title3'), url: qrCodeUrl, options: { color: { dark: '#55D187' } } },
    { title: t('router.features.qrcode.title4'), url: qrCodeUrl, logo: LogoImg },
    { title: t('router.features.qrcode.title5'), url: qrCodeUrl, options: { color: { dark: '#55D187' } }, width: 300, logo: 'https://cdn.baiwumm.com/project/vue3-admin/logo.svg' },
    { title: t('router.features.qrcode.title6'), url: qrCodeUrl, width: 300, logo: { src: LogoImg, logoSize: 0.2, borderSize: 0.05, borderRadius: 50, bgColor: 'gold' } },
    { title: t('router.features.qrcode.title7'), url: qrCodeUrl, width: 300 },
]

const qrDiyRef = ref<Nullable<QrCodeActionType>>(null);

function downloadDiy() {
    const qrEl = unref(qrDiyRef);
    if (!qrEl) return;
    qrEl.download('Qrcode');
}

function onQrcodeDone({ ctx }) {
    if (ctx instanceof CanvasRenderingContext2D) {
        // 额外绘制
        ctx.fillStyle = 'black';
        ctx.font = '16px "微软雅黑"';
        ctx.textBaseline = 'bottom';
        ctx.textAlign = 'center';
        ctx.fillText(t('router.features.qrcode.fillText'), 125, 250, 200);
    }
}
</script>
<style lang='less' scoped>
/deep/ canvas,
/deep/ img {
    display: inline-block;
}
</style>
