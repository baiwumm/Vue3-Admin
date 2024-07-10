import dayjs from 'dayjs';

import { RESPONSE_CODE, RESPONSE_MSG } from '@/enums';
import type { Response } from '@/types';

/**
 * @description: 统一返回体
 */
export const responseMessage = <T = any>(
  data,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = RESPONSE_CODE.SUCCESS,
): Response<T> => ({ data, msg, code, timestamp: dayjs().valueOf() });
