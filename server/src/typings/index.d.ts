declare namespace Api {
  namespace Common {
    /**
     * @description: 全局响应体
     */
    type Response<T = any> = {
      code: number; // 状态码
      data?: T; // 业务数据
      msg: string; // 响应信息
      timestamp: number; // 时间戳
    };
    /**
     * @description: 分页数据
     */
    type PageResponse<T = any> = {
      current?: number; // 页码
      size?: number; // 当前页条数
      total?: number; // 总条数
      records: T[]; // 业务数据
    };
    // 公共列
    type CommonRecord<T = any> = {
      id: string; // 主键
      createdAt: Date; // 创建时间
      updatedAt: Date; // 更新时间
    } & T;

    // Session 存储信息
    type SessionInfo = {
      captchaCode: string; // 验证码
      userInfo: SystemManage.User;
    };

    // token 生成信息
    type TokenPayload = {
      sub: string;
    } & Pick<SystemManage.User, 'userName'>;

    // 定义语言代码类型
    type LanguageCode = 'zh-CN' | 'en-US' | 'ja-JP' | 'zh-TW';

    // 国际化多层级对象
    type NestedObject = Record<string, NestedObject>;
    type LanguageResult = Record<LanguageCode, NestedObject>;

    // 路由元信息
    type RouteMeta = {
      /**
       * 路由标题
       *
       * 可用于文档标题中
       */
      title: string;
      /**
       * 路由的国际化键值
       *
       * 如果设置，将用于i18n，此时title将被忽略
       */
      i18nKey?: App.I18n.I18nKey;
      /**
       * 路由的角色列表
       *
       * 当前用户拥有至少一个角色时，允许访问该路由，角色列表为空时，表示无需权限
       */
      roles?: string[];
      /** 是否缓存该路由 */
      keepAlive?: boolean;
      /**
       * 是否为常量路由
       *
       * 无需登录，并且该路由在前端定义
       */
      constant?: boolean;
      /**
       * Iconify 图标
       *
       * 可用于菜单或面包屑中
       */
      icon?: string;
      /**
       * 本地图标
       *
       * 存在于 "src/assets/svg-icon" 目录下，如果设置，将忽略icon属性
       */
      localIcon?: string;
      /** 路由排序顺序 */
      order?: number;
      /** 路由的外部链接 */
      href?: string;
      /** 是否在菜单中隐藏该路由 */
      hideInMenu?: boolean;
      /**
       * 进入该路由时激活的菜单键
       *
       * 该路由不在菜单中
       *
       * @example
       *   假设路由是"user_detail"，如果设置为"user_list"，则会激活"用户列表"菜单项
       */
      activeMenu?: import('@elegant-router/types').RouteKey;
      /** 默认情况下，相同路径的路由会共享一个标签页，若设置为true，则使用多个标签页 */
      multiTab?: boolean;
      /** 若设置，路由将在标签页中固定显示，其值表示固定标签页的顺序（首页是特殊的，它将自动保持fixed） */
      fixedIndexInTab?: number;
      /** 路由查询参数，如果设置的话，点击菜单进入该路由时会自动携带的query参数 */
      query?: { key: string; value: string }[] | null;
    };
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
      parentId: string; // 父级id
      posts: Post[]; // 关联岗位
      description: string; // 组织描述
      sort: number; // 排序
      children?: Organization[];
    }>;
    /**
     * @description: 岗位管理
     */
    type Post = Common.CommonRecord<{
      name: string; // 岗位名称
      parentId: string; // 父级id
      organization: Organization; // 所属组织
      description: string; // 岗位描述
      sort: number; // 排序
      children?: Post[];
    }>;
  }

  /**
   * @description: 系统管理
   */
  namespace SystemManage {
    /**
     * @description: 用户管理
     */
    type User = Common.CommonRecord<{
      userName: string; // 用户名
      password: string; // 密码
      cnName: string; // 中文名
      email: string; // 电子邮箱
      phone: string; // 手机号
      avatar: string; // 头像
      sex: import('@prisma/client').Sex; // 性别
      status: import('@prisma/client').Status; // 状态
      token?: string; // token
      tags: string[]; // 标签
      city: string[]; // 城市
      address?: string; // 详细地址
      orgId: string; // 组织 id
      organization?: Api.Administrative.Organization; // 所属组织
      postId: string; // 岗位 id
      post?: Api.Administrative.Post; // 所属岗位
      loginCount: number; // 登录次数
      lastIp?: string; // 最后一次登录 ip
      lastLoginAt?: Date; // 最后登录时间
      sort: number; // 排序
    }>;
    /**
     * @description: 菜单管理
     */
    type Menu = Common.CommonRecord<{
      title: string; // 菜单名称
      type: import('@prisma/client').MenuType; // 菜单类型
      parentId: string; // 父级 id
      name?: string; // 路由名称
      path?: string; // 路由路径
      component?: string; // 组件路径
      meta?: Common.RouteMeta; // 路由元信息
      permission?: string; // 按钮标识
      sort: number; // 排序
      children?: Menu[];
    }>;
    /**
     * @description: 国际化
     */
    type Internalization = Common.CommonRecord<{
      name: string; // 国际化字段
      parentId: string; // 父级id
      zhCN: string; // 中文
      enUS: string; // 英文
      jaJP: string; // 日文
      zhTW: string; // 繁体中文
      children?: Internalization[];
    }>;
    /**
     * @description: 操作日志
     */
    type Log = Pick<Common.CommonRecord, id | 'createdAt'> & {
      userId: string; // 操作人
      ip: string;
      method: import('@prisma/client').Method; // 请求方法
      action: string; // 操作方法
      params: string; // 请求参数
      os: string; // 操作系统
      browser: string; // 浏览器
    };
  }
}
