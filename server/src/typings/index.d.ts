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
