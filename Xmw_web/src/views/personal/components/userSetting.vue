<template>
  <CollapseContainer :title="t('router.common.baseSetting')" :canExpan="false">
    <Row :gutter="24">
      <Col :span="14">
        <!-- 用户设置表单 -->
        <BasicForm @register="register" />
        <Button
          type="primary"
          @click="handleSubmit"
          :loading="loading"
          :disabled="loading"
          style="margin-left: 100px"
          >{{ t('router.system.userManagement.baseSetting') }}</Button
        >
      </Col>
      <Col :span="10">
        <div class="mt-20 text-center">
          <CropperAvatar
            :uploadApi="changeUserAvatar"
            :value="avatar"
            :btnText="t('router.system.userManagement.changeAvatar')"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="200"
          />
        </div>
      </Col>
    </Row>
  </CollapseContainer>
</template>

<script lang="ts" setup>
import { onMounted, ref, unref, computed } from 'vue'; // 引入 Composition-API
import { CollapseContainer } from '/@/components/Container'; // 引入Container组件
import { BasicForm, useForm } from '/@/components/Form/index'; // 表单组件
import { baseSetschemas } from './data'; //基本设置表单
import { Button, Row, Col } from 'ant-design-vue'; // 引入antd组件
import { CropperAvatar } from '/@/components/Cropper'; // 图片裁剪组件
import { useMessage } from '/@/hooks/web/useMessage'; // 模态框组件
import { useUserStore } from '/@/store/modules/user'; // 用户vuex
import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { cloneDeep } from 'lodash-es'; // 深克隆
import { userSave } from '/@/api/system/userManagement'; // 用户保存接口
import { getPostTree } from '/@/api/system/postManagement'; // 引入岗位树接口
import { changeUserAvatar } from '/@/api/personal/personal'; // 个人中心接口

const { createMessage } = useMessage(); //消息函数
const { t } = useI18n(); // 国际化函数
const userStore = useUserStore(); // Vuex用户信息
const loading = ref<boolean>(false); // 加载Loading...
// 注册表单
const [register, { updateSchema, setFieldsValue, validate }] = useForm({
  labelWidth: 100,
  schemas: baseSetschemas,
  showActionButtonGroup: false,
});
// 获取store用户信息
const getUserInfo = computed(() => {
  // 获取用户信息
  return userStore.getUserInfo || {};
});
const { avatar, org_id } = unref(getUserInfo);
onMounted(async () => {
  // 请求字典数据
  const sexOptions = await dictionaryModel({ dict_coding: 'system_sex' });
  const postOptions = await getPostTree({ org_id: org_id });
  updateSchema([
    { field: 'sex', componentProps: { options: sexOptions.system_sex } },
    { field: 'post_id', componentProps: { treeData: postOptions } },
  ]);
  let userInfo: any = cloneDeep(unref(getUserInfo));
  userInfo.address = userInfo.address.split(',');
  //   生成key-label形式，为了拿到label
  userInfo.org_id = { key: userInfo.org_id, label: userInfo.org_name };
  userInfo.post_id = { key: userInfo.post_id, label: userInfo.post_name };
  setFieldsValue(userInfo);
});
// 更新基本信息
async function handleSubmit() {
  try {
    const values = await validate();
    loading.value = true;
    // 根据操作拼接表单参数
    let params = { ...values };
    let org_name = params.org_id.label;
    let post_name = params.post_id.label;
    // 将数组转成字符串
    params.address = params.address.join(',');
    params.org_id = params.org_id.value;
    params.post_id = params.post_id.value;
    Object.assign(params, { user_id: unref(getUserInfo).user_id });
    await userSave(params);
    createMessage.success(t('layout.setting.operatingTitle'));
    //   更新store信息
    userStore.setUserInfo(Object.assign(unref(getUserInfo), params, { org_name, post_name }));
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 300);
  }
}
// 当头像上传完成时触发
function updateAvatar(fullPath: string) {
  const userinfo = userStore.getUserInfo;
  userinfo.avatar = fullPath;
  userStore.setUserInfo(userinfo);
}
</script>
