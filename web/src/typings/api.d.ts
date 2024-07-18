/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  import { SEX, STATUS } from '@/enum'
  namespace Common {
    /**
    * @description: 请求分页参数
    */
    type PaginatingParams = {
      current: number; // 页码
      size: number; // 条数
    };
    /**
     * @description: 分页响应体
     */
    type PaginatingResponse = {
      total: number; //总条数
    } & PaginatingParams;

    /**
     * @description: 分页列表
     */
    type PaginatingQueryRecord<T = any> = {
      records: T[];
    } & PaginatingResponse;

    /**
     * @description: 查询时间
     */
    type SearchTime = {
      startTime?: number; // 开始时间
      endTime?: number; // 结束时间
    }

    /**
     * @description: 公共字段
     */
    type ColumnId = {
      id: number; // 主键
    }
    type ColumnFields = {
      sort: number; // 排序
      createdAt: string; // 创建时间
      updatedAt: string; // 更新时间
    } & ColumnId;
    /** common record */
    type CommonRecord<T = any> = ColumnFields & T;
  }

  /**
   * Namespace Auth
   *
   * Backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
    }
  }

  /**
   * Namespace Route
   *
   * Backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    /**
     * @description: 用户管理
     */
    type UserManage = Common.CommonRecord<{
      userName: string; // 用户名
      password: string; // 密码
      cnName: string; // 中文名
      avatar?: string; // 头像
      phone: string; // 手机号
      email: string; // 邮箱
      sex: SEX; // 性别
      status: STATUS; // 状态
      token?: string; // token
      tags: string[]; // 标签
      city: string[]; // 城市
      address?: string; // 详细地址
      orgId?: string; // 所属组织 id
      organization: Api.Administrative.Organization; // 所属组织
      postId?: string; // 所属岗位 id
      post: Api.Administrative.PostManage; // 所属岗位
      loginCount: number; // 登录次数
      lastIp?: string; // 最后一次登录 ip
      lastLoginAt?: string; // 最后登录时间
    }>
    /**
     * @description: 查询参数
     */
    type UserManageSearchParams = Partial<Pick<UserManage, 'userName' | 'status'>> & Api.Common.PaginatingParams;
    /**
     * @description: 创建/更新用户
     */
    type SaveUserManage = Omit<UserManage, keyof Api.Common.ColumnFields> & Partial<Api.Common.ColumnId>;
  }

  /**
   * @description: 智能行政
   */
  namespace Administrative {
    /**
     * @description: 组织管理
     */
    type Organization = Common.CommonRecord<{
      name: string; // 组织名称
      code: string; // 组织编码
      parentId?: string; // 父级 id
      description?: string; // 组织描述
      icon?: string; // 组织图标
      posts: PostManage[]; // 关联岗位
      children?: Organization[]
    }>
    /**
     * @description: 查询参数
     */
    type OrganizationSearchParams = Partial<Pick<Organization, 'name' | 'code'>>;
    /**
     * @description: 创建/更新组织
     */
    type SaveOrganization = Omit<Organization, keyof Api.Common.ColumnFields> & Partial<Api.Common.ColumnId>;

    /**
     * @description: 岗位管理
     */
    type PostManage = Common.CommonRecord<{
      name: string; // 岗位名称
      parentId?: string; // 父级 id
      orgId?: string; // 所属组织 id
      organization: Organization; // 所属组织
      description?: string; // 岗位描述
      children?: PostManage[]
    }>
    /**
     * @description: 查询参数
     */
    type PostManageSearchParams = Partial<Pick<PostManage, 'name' | 'orgId'>> & Api.Common.SearchTime;
    /**
     * @description: 创建/更新岗位
     */
    type SavePostManage = Omit<PostManage, keyof Api.Common.ColumnFields> & Partial<Api.Common.ColumnId>;
  }
}
