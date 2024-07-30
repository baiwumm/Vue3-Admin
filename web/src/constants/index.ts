import { SEX, STATUS } from '@/enum';
import { LabeledValue } from 'ant-design-vue/es/select';
import { $t } from "@/locales";

/**
 * @description: 性别
 */
export const SexOptions: LabeledValue[] = [
  { label: $t("page.systemManage.userManage.sexMap.male"), value: SEX.MALE },
  { label: $t("page.systemManage.userManage.sexMap.female"), value: SEX.FEMALE },
]

/**
 * @description: 状态
 */
export const StatueOptions: LabeledValue[] = [
  { label: $t("form.statusMap.active"), value: STATUS.ACTIVE },
  { label: $t("form.statusMap.inactive"), value: STATUS.INACTIVE },
]