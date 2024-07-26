/**
 * @description: 用户名
 */
export const REG_USER_NAME = /^[a-zA-Z0-9_-]{4,16}$/;

/**
 * @description: 手机号码
 */
export const REG_PHONE = /^1[3-9]\d{9}$/;

/**
 * Password reg
 *
 * 6-18 characters, including letters, numbers, and underscores
 */
export const REG_PWD = /^\w{6,18}$/;

/**
 * @description: 电子邮箱
 */
export const REG_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/** Six digit code reg */
export const REG_CODE_SIX = /^\d{6}$/;

/** Four digit code reg */
export const REG_CODE_FOUR = /^\d{4}$/;

/** Url reg */
export const REG_URL =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
