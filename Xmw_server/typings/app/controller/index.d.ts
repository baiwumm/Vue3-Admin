// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportIntegratedNews from '../../../app/controller/integrated/news';
import ExportPersonalPersonal from '../../../app/controller/personal/personal';
import ExportSystemDictionaryManagement from '../../../app/controller/system/dictionaryManagement';
import ExportSystemInternationalManagement from '../../../app/controller/system/internationalManagement';
import ExportSystemMenuManagement from '../../../app/controller/system/menuManagement';
import ExportSystemOperationLogs from '../../../app/controller/system/operationLogs';
import ExportSystemOrganizationManagement from '../../../app/controller/system/organizationManagement';
import ExportSystemPostManagement from '../../../app/controller/system/postManagement';
import ExportSystemRoleManagement from '../../../app/controller/system/roleManagement';
import ExportSystemUserManagement from '../../../app/controller/system/userManagement';

declare module 'egg' {
  interface IController {
    integrated: {
      news: ExportIntegratedNews;
    }
    personal: {
      personal: ExportPersonalPersonal;
    }
    system: {
      dictionaryManagement: ExportSystemDictionaryManagement;
      internationalManagement: ExportSystemInternationalManagement;
      menuManagement: ExportSystemMenuManagement;
      operationLogs: ExportSystemOperationLogs;
      organizationManagement: ExportSystemOrganizationManagement;
      postManagement: ExportSystemPostManagement;
      roleManagement: ExportSystemRoleManagement;
      userManagement: ExportSystemUserManagement;
    }
  }
}
