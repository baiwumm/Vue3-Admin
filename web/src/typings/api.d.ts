declare namespace Api {
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
      id: string; // 主键
    }
    type ColumnFields = {
      createdAt: string; // 创建时间
      updatedAt?: string; // 更新时间
    } & ColumnId;
    /** common record */
    type CommonRecord<T = any> = ColumnFields & T;
  }

  /**
   * @description: 身份鉴权
   */
  namespace Auth {
    /**
     * @description: 登录 token
     */
    type LoginToken = {
      token: string;
    }

    /**
     * @description: 登录用户信息
     */
    type UserInfo = Omit<SystemManage.UserManage, 'password' | 'token'>
    /**
     * @description: 登录参数
     */
    type LoginParams = {
      userName: string; // 用户名
      password: string; // 密码
      captchaCode: string; // 验证码
    }

    /**
     * @description: 获取掘金文章参数
     */
    type JuejinParams = {
      sort_type: number;
      cursor: string;
      user_id: string;
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
   * @description: 系统管理
   */
  namespace SystemManage {
    /**
     * @description: 用户管理
     */
    type UserManage = Common.CommonRecord<{
      userName: string; // 用户名
      password?: string; // 密码
      cnName: string; // 中文名
      avatar: string; // 头像
      phone: string; // 电话号码
      email: string; // 邮箱
      sex: import('@/enum').SEX; // 性别
      status: import('@/enum').STATUS; // 状态
      token?: string; // token
      tags: string[]; // 标签
      city: string[]; // 城市
      address?: string; // 详细地址
      orgId?: string; // 所属组织 id
      organization: Api.Administrative.Organization; // 所属组织
      postId?: string; // 所属岗位 id
      post: Api.Administrative.PostManage; // 所属岗位
      sort: number; // 排序
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
    type SaveUserManage = Omit<UserManage, keyof Api.Common.ColumnFields | 'organization' | 'post' | 'loginCount' | 'lastIp' | 'lastLoginAt'>
      & Partial<Api.Common.ColumnId> & {
        confirmPassword?: string;
      };

    /**
     * @description: 国际化
     */
    type Internalization = Common.CommonRecord<{
      name: string; // 国际化字段
      parentId?: string; // 父级id
      zhCN?: string; // 中文
      enUS?: string; // 英文
      jaJP?: string; // 日文
      zhTW?: string; // 繁体中文
      children?: Internalization[];
    }>
    /**
     * @description: 查询参数
     */
    type InternalizationSearchParams = Partial<Pick<Internalization, 'name'>> & Api.Common.SearchTime;
    /**
     * @description: 创建/更新国际化
     */
    type SaveInternalization = Omit<Internalization, keyof Api.Common.ColumnFields> & Partial<Api.Common.ColumnId>

    /**
     * @description: 操作日志
     */
    type OperationLog = Common.CommonRecord<{
      userId: string; // 关联用户 id
      user: UserManage;
      ip: string; // ip
      action: string; // 请求动作
      method: import('@/enum').METHOD; // 请求方法
      params: Record<string, any>; // 请求参数
      os: string; // 操作系统
      browser: string; // 浏览器
    }>
    /**
     * @description: 查询参数
     */
    type OperationLogSearchParams = Partial<Pick<OperationLog, 'userId' | 'method'>> & Api.Common.SearchTime & Api.Common.PaginatingParams;
    /**
     * @description: 删除参数
     */
    type OperationLogDelParams = { ids: string[] }
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
      sort: number; // 排序
      posts?: PostManage[]; // 关联岗位
      children?: Organization[]
    }>
    /**
     * @description: 查询参数
     */
    type OrganizationSearchParams = Partial<Pick<Organization, 'name' | 'code'>>;
    /**
     * @description: 创建/更新组织
     */
    type SaveOrganization = Omit<Organization, keyof Api.Common.ColumnFields | 'posts'> & Partial<Api.Common.ColumnId>;

    /**
     * @description: 岗位管理
     */
    type PostManage = Common.CommonRecord<{
      name: string; // 岗位名称
      parentId?: string; // 父级 id
      orgId?: string; // 所属组织 id
      organization: Organization; // 所属组织
      sort: number; // 排序
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
    type SavePostManage = Omit<PostManage, keyof Api.Common.ColumnFields | 'organization'> & Partial<Api.Common.ColumnId>;
  }
}
