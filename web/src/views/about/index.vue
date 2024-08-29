<script setup lang="ts">
import { $t } from '@/locales';
import pkg from '~/package.json';

// 国际化
const locales = (field: string) => $t(`page.about.${field}`);

interface PkgJson {
  name: string;
  version: string;
  dependencies: PkgVersionInfo[];
  devDependencies: PkgVersionInfo[];
}

interface PkgVersionInfo {
  name: string;
  version: string;
}

const { name, version, dependencies, devDependencies } = pkg;

function transformVersionData(tuple: [string, string]): PkgVersionInfo {
  const [$name, $version] = tuple;
  return {
    name: $name,
    version: $version,
  };
}

const pkgJson: PkgJson = {
  name,
  version,
  dependencies: Object.entries(dependencies).map(item => transformVersionData(item)),
  devDependencies: Object.entries(devDependencies).map(item => transformVersionData(item)),
};

const latestBuildTime = BUILD_TIME;
</script>

<template>
  <ASpace direction="vertical" :size="16">
    <ACard :title="locales('title')" :bordered="false" class="card-wrapper">
      <p>{{ locales('introduction') }}</p>
    </ACard>
    <!-- 项目信息 -->
    <ACard :title="locales('projectInfo.title')" :bordered="false" class="card-wrapper">
      <ADescriptions label-placement="left" bordered size="middle" :column="{ xs: 1, sm: 2 }">
        <ADescriptionsItem :label="locales('projectInfo.version')">
          <ATag color="blue">{{ pkgJson.version }}</ATag>
        </ADescriptionsItem>
        <ADescriptionsItem :label="locales('projectInfo.latestBuildTime')">
          <ATag color="blue">{{ latestBuildTime }}</ATag>
        </ADescriptionsItem>
        <ADescriptionsItem :label="locales('projectInfo.githubLink')">
          <a class="text-primary" :href="pkg.homepage" target="_blank" rel="noopener noreferrer">
            {{ $t('system.title') }}
          </a>
        </ADescriptionsItem>
        <ADescriptionsItem :label="locales('projectInfo.previewLink')">
          <a class="text-primary" :href="pkg.website" target="_blank" rel="noopener noreferrer">
            {{ pkg.website }}
          </a>
        </ADescriptionsItem>
      </ADescriptions>
    </ACard>
    <!-- 生产依赖 -->
    <ACard :title="locales('prdDep')" :bordered="false" class="card-wrapper">
      <ARow :gutter="[12, 12]">
        <ACol
          v-for="item in pkgJson.dependencies"
          :key="item.name"
          :sm="24"
          :md="12"
          :lg="8"
          :xl="6"
          :label="item.name"
        >
          <ABadgeRibbon :text="item.version">
            <ACard>
              {{ item.name }}
            </ACard>
          </ABadgeRibbon>
        </ACol>
      </ARow>
    </ACard>
    <!-- 开发依赖 -->
    <ACard :title="locales('devDep')" :bordered="false" class="card-wrapper">
      <ARow :gutter="[12, 12]">
        <ACol
          v-for="item in pkgJson.devDependencies"
          :key="item.name"
          :sm="24"
          :md="12"
          :lg="8"
          :xl="6"
          :label="item.name"
        >
          <ABadgeRibbon :text="item.version">
            <ACard>
              {{ item.name }}
            </ACard>
          </ABadgeRibbon>
        </ACol>
      </ARow>
    </ACard>
  </ASpace>
</template>
