/** @description: 用户名 */
export const REG_USER_NAME = /^[a-zA-Z0-9_-]{4,16}$/;

/** @description: 手机号码 */
export const REG_PHONE = /^1[3-9]\d{9}$/;

/** @description: 密码6-18位字符，支持数字、字母和除空格外的特殊字符，且必须同时包含数字和小写字母 */
export const REG_PWD = /^(?=.*[0-9])(?=.*[a-z])(?![\s]).{6,18}$/;

/** @description: 电子邮箱 */
export const REG_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/** @description: 只能输入6位数字 */
export const REG_CODE_SIX = /^\d{6}$/;

/** Url reg */
/** @description: url */
export const REG_URL =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
