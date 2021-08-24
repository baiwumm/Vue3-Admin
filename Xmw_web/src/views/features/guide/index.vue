<template>
  <PageWrapper
    :title="t('router.features.guide.title')"
    :content="t('router.features.guide.content')"
  >
    <a-button type="primary" @click="handleStart">{{ t('router.common.start') }}</a-button>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { useDesign } from '/@/hooks/web/useDesign';
import intro from 'intro.js';
import 'intro.js/introjs.css';
import { useI18n } from '/@/hooks/web/useI18n';

const { prefixVar } = useDesign('');
const { t } = useI18n();

function handleStart() {
  intro()
    .setOptions({
      showProgress: true,
      nextLabel: t('router.features.guide.next'),
      prevLabel: t('router.features.guide.prev'),
      doneLabel: t('router.features.guide.done'),
      steps: [
        {
          title: t('router.features.guide.welcome'),
          intro: t('router.features.guide.welcomeText') + '👋',
        },
        {
          title: t('router.features.guide.collapse'),
          element: document.querySelector(`.${prefixVar}-layout-header-trigger`)!,
          intro: t('router.features.guide.collapseText'),
        },
        {
          title: t('router.features.guide.userAction'),
          element: document.querySelector(`.${prefixVar}-layout-header-action`)!,
          intro: t('router.features.guide.userActionText'),
        },
        {
          title: t('router.features.guide.multipleTab'),
          element: document.querySelector(`.${prefixVar}-multiple-tabs`)!,
          intro: t('router.features.guide.multipleTabText'),
        },
      ],
    })
    .start();
}
</script>