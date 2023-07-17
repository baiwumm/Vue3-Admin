// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportParams from '../../../app/middleware/params';
import ExportTokenAuthentication from '../../../app/middleware/tokenAuthentication';

declare module 'egg' {
  interface IMiddleware {
    params: typeof ExportParams;
    tokenAuthentication: typeof ExportTokenAuthentication;
  }
}
