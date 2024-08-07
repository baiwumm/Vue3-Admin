/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-07 09:48:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-07 10:16:31
 * @Description: LoggerInterceptor 日志拦截器
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OperationLogService } from '@/modules/system-manage/operation-log/operation-log.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly operationLogService: OperationLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.operationLogService.logAction();
    return next.handle().pipe(map((data) => data));
  }
}
