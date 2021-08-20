// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
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
