declare namespace Api {
  import { SEX, STATUS } from '@/enums';
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
      id: number; // 主键
      sort: number; // 排序
      createdAt: string; // 创建时间
      updatedAt: string; // 更新时间
    } & T;

    // Session 存储信息
    type SessionInfo = {
      captchaCode: string; // 验证码
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
      sex: SEX; // 性别
      status: STATUS; // 状态
      token?: string; // token
      tags: string[]; // 标签
      city: string[]; // 城市
      address?: string; // 详细地址
      orgId: string; // 组织 id
      organization: Api.Administrative.Organization; // 所属组织
      postId: string; // 岗位 id
      post: Api.Administrative.Post; // 所属岗位
      loginCount: number; // 登录次数
      lastIp?: string; // 最后一次登录 ip
      lastLoginAt?: string; // 最后登录时间
    }>;
  }
}
