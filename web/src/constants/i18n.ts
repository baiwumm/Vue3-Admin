import { I18N_FORM } from '@/enum/i18n';
import { $t } from '@/locales';

/** @description: 请输入 */
export const I18nEntry = (text = '') => `${$t(I18N_FORM.ENTER)}${text}`;

/** @description: 请选择 */
export const I18nSelect = (text = '') => `${$t(I18N_FORM.SELECT)}${text}`;

/** @description: 首页 */
export const I18nHome = (field = '') => $t(`page.home${field ? '.' : ''}${field}`);

/** @description: 智能行政-消息公告 */
export const I18nMessage = (field = '') => $t(`page.administrative.message${field ? '.' : ''}${field}`);

/** @description: 智能行政-组织管理 */
export const I18nOrg = (field = '') => $t(`page.administrative.organization${field ? '.' : ''}${field}`);

/** @description: 智能行政-岗位管理 */
export const I18nPost = (field = '') => $t(`page.administrative.postManage${field ? '.' : ''}${field}`);

/** @description: 个人中心 */
export const I18nUserCenter = (field = '') => $t(`page.userCenter${field ? '.' : ''}${field}`);

/** @description: 功能页-验证码 */
export const I18nCaptcha = (field = '') => $t(`page.features.captcha${field ? '.' : ''}${field}`);

/** @description: 功能页-图片取色盘 */
export const I18nColorthief = (field = '') => $t(`page.features.colorthief${field ? '.' : ''}${field}`);

/** @description: 功能页-系统级取色器 */
export const I18nEyeDropper = (field = '') => $t(`page.features.eye-dropper${field ? '.' : ''}${field}`);

/** @description: 功能页-打印 */
export const I18nPrint = (field = '') => $t(`page.features.print${field ? '.' : ''}${field}`);

/** @description: 功能页-Swiper */
export const I18nSwiper = (field = '') => $t(`page.features.swiper${field ? '.' : ''}${field}`);

/** @description: 功能页-自定义 vue 指令 */
export const I18nVueDirective = (field = '') => $t(`page.features.vue-directive${field ? '.' : ''}${field}`);

/** @description: 功能页-文件预览 */
export const I18nVueOffice = (field = '') => $t(`page.features.vue-office${field ? '.' : ''}${field}`);

/** @description: 功能页-瀑布流 */
export const I18nWaterfall = (field = '') => $t(`page.features.waterfall${field ? '.' : ''}${field}`);

/** @description: 系统管理-用户管理 */
export const I18nUser = (field = '') => $t(`page.systemManage.userManage${field ? '.' : ''}${field}`);

/** @description: 系统管理-菜单管理 */
export const I18nMenu = (field = '') => $t(`page.systemManage.menuManage${field ? '.' : ''}${field}`);

/** @description: 系统管理-角色管理 */
export const I18nRole = (field = '') => $t(`page.systemManage.roleManage${field ? '.' : ''}${field}`);

/** @description: 系统管理-操作日志 */
export const I18nLog = (field = '') => $t(`page.systemManage.operationLog${field ? '.' : ''}${field}`);

/** @description: 系统管理-国际化 */
export const I18nInternalization = (field = '') => $t(`page.systemManage.internalization${field ? '.' : ''}${field}`);

/** @description: 关于 */
export const I18nAbout = (field = '') => $t(`page.about${field ? '.' : ''}${field}`);
