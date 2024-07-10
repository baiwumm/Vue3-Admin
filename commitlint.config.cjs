module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      // type枚举
      2,
      'always',
      [
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'feat', // 新功能
        'fix', // 修补bug
        'docs', // 文档修改
        'style', // 代码格式修改, 注意不是 css 修改
        'refactor', // 重构
        'perf', // 优化相关，比如提升性能、体验
        'test', // 测试用例修改
        'revert', // 代码回滚
        'ci', // 持续集成修改
        'config', // 配置修改
        'chore', // 其他改动
      ],
    ],
    'type-empty': [2, 'never'], // never: type不能为空; always: type必须为空
    'type-case': [0, 'always', 'lower-case'], // type必须小写，upper-case大写，camel-case小驼峰，kebab-case短横线，pascal-case大驼峰，等等
    'scope-empty': [0],
    'scope-case': [0],
    'subject-empty': [2, 'never'], // subject不能为空
    'subject-case': [0],
    'subject-full-stop': [0, 'never', '.'], // subject以.为结束标记
    'header-max-length': [2, 'always', 72], // header最长72
    'body-leading-blank': [0], // body换行
    'footer-leading-blank': [0, 'always'], // footer以空行开头
  },
};
