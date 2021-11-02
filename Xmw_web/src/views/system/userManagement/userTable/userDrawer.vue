<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="600px"
    @ok="handlerSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
import CryptoJS from 'crypto-js'; // AES/DES加密
import { crypto_key, crypto_iv } from '/@/utils'; // AES/DES加密秘钥
import { dictionaryModel } from '/@/api/system/dictionaryManagement'; // 字典查询接口
import { ref, computed, unref, defineEmits } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'; //抽屉组件
import { BasicForm, useForm } from '/@/components/Form/index'; // 表单组件
import { dataFormSchema } from './data'; // 表单配置项
import { useMessage } from '/@/hooks/web/useMessage'; // 信息模态框
import { userSave } from '/@/api/system/userManagement'; // 用户保存接口
import { cloneDeep } from 'lodash-es'; // 深克隆
import { useI18n } from '/@/hooks/web/useI18n';
import { getPostTree } from '/@/api/system/postManagement'; // 引入岗位树接口

const emit = defineEmits(['success', 'register']);
const { t } = useI18n();
const { createMessage } = useMessage();
const isUpdate = ref<boolean>(true); // 是否编辑
const rowId = ref<string>(''); // 编辑的user_id
let firstLoad = ref<boolean>(true); // 判断是否第一次加载表单
const [registerForm, { setFieldsValue, updateSchema, resetFields, validate, clearValidate }] =
  useForm({
    // 注册表单
    labelWidth: 100,
    schemas: dataFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
    baseColProps: { lg: 12, md: 24 },
  });

const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
  // 注册抽屉
  resetFields();
  setDrawerProps({ confirmLoading: false });
  isUpdate.value = !!data?.isUpdate;
  let cloneData = data.record ? cloneDeep(data.record) : '';
  //   判断是否新增操作
  if (unref(isUpdate)) {
    rowId.value = cloneData.user_id;
    cloneData.role_id = cloneData.role_id.split(',');
    cloneData.address = cloneData.address.split(',');
    //拿到加密后的密码并解密
    let decrypted = CryptoJS.AES.decrypt(cloneData.password, crypto_key, {
      iv: crypto_iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
    cloneData.password = decrypted;
    cloneData.confirmPassword = decrypted;
    const postOptions = await getPostTree({ org_id: cloneData.org_id });
    updateSchema([
      {
        field: 'post_id',
        componentProps: {
          treeData: postOptions,
        },
      },
    ]);
    // 表单赋值
    setFieldsValue({
      ...cloneData,
    });
  }
  // 清空校验
  clearValidate();
  if (firstLoad.value) {
    // 请求字典数据
    let params = {
      dict_coding: 'system_sex,system_status',
    };
    await dictionaryModel(params).then((res) => {
      updateSchema([
        {
          field: 'sex',
          componentProps: {
            options: res.system_sex,
          },
        },
        {
          field: 'status',
          componentProps: {
            options: res.system_status,
          },
        },
      ]);
      firstLoad.value = false;
    });
  }
});

// AES/DES加密
function getAesString(mes: string) {
  var encrypted = CryptoJS.AES.encrypt(mes, crypto_key, {
    iv: crypto_iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); //返回的是base64格式的密文
}
// 判断标题显示
const getTitle = computed(() =>
  !unref(isUpdate) ? t('router.system.userManagement.add') : t('router.system.userManagement.edit')
);
// 确定提交操作
async function handlerSubmit() {
  try {
    //   表单校验
    const values = await validate();
    setDrawerProps({ confirmLoading: true });
    // 根据操作拼接表单参数
    let params = { ...values };
    // 将数组转成字符串
    params.address = params.address.join(',');
    params.role_id = params.role_id.join(',');
    // 密码加密
    params.password = getAesString(params.password);
    delete params.confirmPassword;
    if (unref(isUpdate)) Object.assign(params, { user_id: rowId.value });
    await userSave(params);
    createMessage.success(
      !unref(isUpdate) ? t('router.common.addSuccess') : t('router.common.editSuccess')
    );
    closeDrawer();
    // 执行成功刷新列表
    emit('success');
  } finally {
    setDrawerProps({ confirmLoading: false });
  }
}
</script>
