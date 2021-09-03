import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { RoleInfo } from '/@/api/system/model/userModel';

// Lock screen information
export interface LockInfo {
    // Password required
    pwd?: string | undefined;
    // Is it locked?
    isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
    // Type of error
    type: ErrorTypeEnum;
    // Error file
    file: string;
    // Error name
    name?: string;
    // Error message
    message: string;
    // Error stack
    stack?: string;
    // Error detail
    detail: string;
    // Error url
    url: string;
    // Error time
    time?: string;
}

export interface UserInfo {
    address?: string; // 用户地址
    avatar?: string | null; // 用户头像
    cn_name: string; // 中文名
    create_time?: string; // 创建时间
    email?: string; // 电子邮箱
    en_name?: string; // 英文名
    founder?: string; // 创建人
    label?: string | null; // 用户标签
    login_last_ip?: string; // 登录ip
    login_last_time?: string; // 最后一次登录时间
    login_num?: number; // 登录次数
    motto?: string; // 座右铭
    org_id: string; // 组织id
    org_name?: string; // 组织名称
    phone?: string | null; // 手机号码
    post_id?: string | null; // 岗位id
    post_name?: string | null; // 岗位名称
    role_id: string | null; // 角色id
    sex: string; // 性别
    sort: number; // 排序
    status: string; // 状态
    token?: string | undefined; // token
    update_last_time?: string | null; // 最后一次更新时间
    user_id?: string; // 用户id
    user_name: string; // 用户名
    work_no?: string | null; // 工号
    tag?: string; // 标签
    roles?: RoleInfo[];
}

export interface BeforeMiniState {
    menuCollapsed?: boolean;
    menuSplit?: boolean;
    menuMode?: MenuModeEnum;
    menuType?: MenuTypeEnum;
}
