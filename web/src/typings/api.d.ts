declare namespace Api {
  namespace Common {
    /** @description: 请求分页参数 */
    type PaginatingParams = {
      current: number; // 页码
      size: number; // 条数
    };
    /** @description: 分页响应体 */
    type PaginatingResponse = {
      total: number; // 总条数
    } & PaginatingParams;

    /** @description: 分页列表 */
    type PaginatingQueryRecord<T = any> = {
      records: T[];
    } & PaginatingResponse;

    /** @description: 查询时间 */
    type SearchTime = {
      startTime?: number; // 开始时间
      endTime?: number; // 结束时间
    };

    /** @description: 公共字段 */
    type ColumnId = {
      id: string; // 主键
    };
    type ColumnFields = {
      createdAt: string; // 创建时间
      updatedAt?: string; // 更新时间
    } & ColumnId;
    /** common record */
    type CommonRecord<T = any> = ColumnFields & T;
  }

  /** @description: 身份鉴权 */
  namespace Auth {
    /** @description: 登录 token */
    type LoginToken = {
      token: string;
    };

    /** @description: 登录用户信息 */
    type UserInfo = Omit<SystemManage.UserManage, 'password' | 'token'> & {
      buttons: string[]; // 按钮权限
      roles: string[]; // 角色编码
    };
    /** @description: 登录参数 */
    type LoginParams = {
      userName: string; // 用户名
      password: string; // 密码
      captchaCode: string; // 验证码
    };

    /** @description: 获取掘金文章参数 */
    type JuejinParams = {
      sort_type: number;
      cursor: string;
      user_id: string;
    };
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

  /** @description: 系统管理 */
  namespace SystemManage {
    /** @description: 用户管理 */
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
      roleId: string; // 所属角色 id
      role: RoleManage; // 所属角色
      orgId: string; // 所属组织 id
      organization: Api.Administrative.Organization; // 所属组织
      postId: string; // 所属岗位 id
      post: Api.Administrative.PostManage; // 所属岗位
      sort: number; // 排序
      loginCount: number; // 登录次数
      lastIp?: string; // 最后一次登录 ip
      lastLoginAt?: string; // 最后登录时间
    }>;
    /** @description: 查询参数 */
    type UserManageSearchParams = Partial<Pick<UserManage, 'userName' | 'status'>> & Api.Common.PaginatingParams;
    /** @description: 创建/更新用户 */
    type SaveUserManage = Pick<
      UserManage,
      | 'userName'
      | 'cnName'
      | 'phone'
      | 'email'
      | 'sex'
      | 'status'
      | 'sort'
      | 'city'
      | 'address'
      | 'tags'
      | 'avatar'
      | 'password'
    > &
      Partial<Pick<UserManage, 'roleId' | 'orgId' | 'postId'>> &
      Partial<Api.Common.ColumnId> & {
        confirmPassword?: string;
      };
    /** @description: 修改用户密码 */
    type ChangeUserPassword = {
      password: string; // 原密码
      newPassword: string; // 新密码
    };
    /** @description: 修改密码 */
    type EditPassword = {
      oldPassword: string; // 原密码
    } & Required<Pick<SaveUserManage, 'password' | 'confirmPassword'>>;

    /** @description: 菜单管理 */
    type MenuManage = Common.CommonRecord<{
      title: string; // 菜单名称
      type: import('@/enum').MENU_TYPE; // 菜单类型
      parentId: string | null; // 父级 id
      name?: string; // 路由名称
      path?: string; // 路由路径
      component?: string; // 组件路径
      meta?: import('vue-router').RouteMeta; // 路由元信息
      props?: {
        url: string;
      }; // IframePage 参数
      permission?: string; // 按钮权限
      sort: number; // 排序
      children?: MenuManage[];
    }>;
    /** @description: 查询参数 */
    type MenuManageSearchParams = Partial<Pick<MenuManage, 'title' | 'name'>> & Api.Common.SearchTime;
    /** @description: 创建/更新菜单 */
    type SaveMenuManage = Omit<MenuManage, keyof Api.Common.ColumnFields | 'meta' | 'props' | 'children'> &
      Partial<Api.Common.ColumnId> &
      Required<Pick<MenuManage, 'meta' | 'props'>>;

    /** @description: 角色管理 */
    type RoleManage = Common.CommonRecord<{
      name: string; // 角色名称
      code: string; // 角色编码
      description?: string; // 角色描述
      sort: number; // 排序
      permissions: string[]; // 权限
    }>;
    /** @description: 查询参数 */
    type RoleManageSearchParams = Partial<Pick<RoleManage, 'name' | 'code'>> &
      Api.Common.SearchTime &
      Api.Common.PaginatingParams;
    /** @description: 创建/更新角色 */
    type SaveRoleManage = Omit<RoleManage, keyof Api.Common.ColumnFields | 'permissions'> &
      Partial<Api.Common.ColumnId> & {
        menus: string[];
      };

    /** @description: 国际化 */
    type Internalization = Common.CommonRecord<{
      name: string; // 国际化字段
      parentId: string | null; // 父级id
      zhCN: string | null; // 中文
      enUS: string | null; // 英文
      jaJP: string | null; // 日文
      zhTW: string | null; // 繁体中文
      children?: Internalization[];
    }>;
    /** @description: 查询参数 */
    type InternalizationSearchParams = Partial<Pick<Internalization, 'name' | 'zhCN'>> & Api.Common.SearchTime;
    /** @description: 创建/更新国际化 */
    type SaveInternalization = Omit<Internalization, keyof Api.Common.ColumnFields> & Partial<Api.Common.ColumnId>;

    /** @description: 操作日志 */
    type OperationLog = Common.CommonRecord<{
      userId: string; // 关联用户 id
      user: UserManage;
      ip: string; // ip
      action: string; // 请求动作
      method: import('@/enum').METHOD; // 请求方法
      params: Record<string, any>; // 请求参数
      os: string; // 操作系统
      browser: string; // 浏览器
      province: string; // 所在省份
      city: string; // 所在城市
      adcode: string; // 城市编码
    }>;
    /** @description: 查询参数 */
    type OperationLogSearchParams = Partial<Pick<OperationLog, 'userId' | 'method'>> &
      Api.Common.SearchTime &
      Api.Common.PaginatingParams;
    /** @description: 删除参数 */
    type OperationLogDelParams = { ids: string[] };
  }

  /** @description: 智能行政 */
  namespace Administrative {
    /** @description: 消息公告 */
    type Message = Common.CommonRecord<{
      title: string; // 标题
      content: string; // 内容
      status: import('@/enum').STATUS; // 状态
      pinned: boolean; // 是否置顶
      userId: string; // 用户 id
      user: SystemManage.UserManage;
      messageReads: MessageRead[]; // 已读公告列表
    }>;
    /** @description: 消息公告 - 查询参数 */
    type MessageSearchParams = Partial<Pick<Message, 'userId' | 'title' | 'status'>> &
      Api.Common.SearchTime &
      Api.Common.PaginatingParams;
    /** @description: 创建/更新消息 */
    type SaveMessage = Pick<Message, 'title' | 'content' | 'status' | 'pinned'> & Partial<Api.Common.ColumnId>;
    /** @description: 消息公告 - 已读列表 */
    type MessageRead = Common.CommonRecord<{
      messageId: string; // 消息 id
      message: Message; // 消息详情
      userId: string; // 用户 id
      user: SystemManage.UserManage;
    }>;
    /** @description: 组织管理 */
    type Organization = Common.CommonRecord<{
      name: string; // 组织名称
      code: string; // 组织编码
      parentId: string | null; // 父级 id
      description?: string; // 组织描述
      icon?: string; // 组织图标
      sort: number; // 排序
      posts?: PostManage[]; // 关联岗位
      children?: Organization[];
    }>;
    /** @description: 查询参数 */
    type OrganizationSearchParams = Partial<Pick<Organization, 'name' | 'code'>>;
    /** @description: 创建/更新组织 */
    type SaveOrganization = Omit<Organization, keyof Api.Common.ColumnFields | 'posts'> & Partial<Api.Common.ColumnId>;

    /** @description: 岗位管理 */
    type PostManage = Common.CommonRecord<{
      name: string; // 岗位名称
      parentId: string | null; // 父级 id
      orgId: string | null; // 所属组织 id
      organization: Organization; // 所属组织
      sort: number; // 排序
      description?: string; // 岗位描述
      children?: PostManage[];
    }>;
    /** @description: 查询参数 */
    type PostManageSearchParams = Partial<Pick<PostManage, 'name' | 'orgId'>> & Api.Common.SearchTime;
    /** @description: 创建/更新岗位 */
    type SavePostManage = Omit<PostManage, keyof Api.Common.ColumnFields | 'organization'> &
      Partial<Api.Common.ColumnId>;
  }
}
