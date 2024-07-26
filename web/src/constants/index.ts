import { SEX, STATUS } from '@/enum';
import { RadioGroupProps } from 'ant-design-vue';
import { $t } from "@/locales";

/**
 * @description: 性别
 */
export const SexOptions: RadioGroupProps['options'] = [
  { label: $t("page.systemManage.userManage.sexMap.male"), value: SEX.MALE },
  { label: $t("page.systemManage.userManage.sexMap.female"), value: SEX.FEMALE },
]

/**
 * @description: 状态
 */
export const StatueOptions: RadioGroupProps['options'] = [
  { label: $t("form.statusMap.active"), value: STATUS.ACTIVE },
  { label: $t("form.statusMap.inactive"), value: STATUS.INACTIVE },
]