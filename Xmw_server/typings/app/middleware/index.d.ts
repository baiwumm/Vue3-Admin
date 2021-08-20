// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportParams from '../../../app/middleware/params';
import ExportTokenAuthentication from '../../../app/middleware/tokenAuthentication';

declare module 'egg' {
  interface IMiddleware {
    params: typeof ExportParams;
    tokenAuthentication: typeof ExportTokenAuthentication;
  }
}
