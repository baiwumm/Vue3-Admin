import { defineConfig } from '@soybeanjs/eslint-config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig(
  { vue: true, unocss: true },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // 禁止声明未使用的变量
      'no-unused-vars': 'warn',
      // 禁止使用 var 关键字
      'no-var': 'error',
      // 推荐使用 const 关键字
      'prefer-const': 'error',
      // 箭头函数参数括号风格
      'arrow-parens': ['error', 'as-needed'],
      // 强制使用分号
      semi: ['error', 'always'],
      // 强制使用单引号
      quotes: ['error', 'single'],
      // 禁止末尾逗号
      'comma-dangle': ['error', 'never'],
      // 对象字面量的大括号间距
      'object-curly-spacing': ['error', 'always'],
      // 大括号内的空格
      'space-in-parens': ['error', 'never'],
      // 对象键与值之间的空格
      'key-spacing': 'error',
      // 函数前括号前的空格
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      // 最大行长度
      'max-len': [
        'error',
        {
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],

      // Vue 特定规则
      // HTML 缩进
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
      // 每行的最大属性数量
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: {
            max: 1,
            allowFirstLine: false,
          },
        },
      ],
      // 单行 HTML 元素的内容必须在新的一行
      'vue/singleline-html-element-content-newline': [
        'error',
        {
          ignoreWhenNoAttributes: true,
          ignores: ['img'],
        },
      ],
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index', 'App', 'Register', '[id]', '[url]'],
        },
      ],
      'vue/component-name-in-template-casing': [
        'warn',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: ['/^icon-/'],
        },
      ],
      'vue/no-static-inline-styles': [
        'error',
        {
          allowBinding: true,
        },
      ],
      'vue/no-v-html': 'off',
      'unocss/order-attributify': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
    },
  },
);
