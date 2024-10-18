module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
      es2021: true, // 使用 ECMAScript 2021 版本
    },
    parser: 'vue-eslint-parser', // 使用 vue-eslint-parser 解析器
    parserOptions: {
      parser: '@babel/eslint-parser', // 使用 Babel 解析器来解析 JavaScript 代码
      ecmaVersion: 12, // 等同于 ECMAScript 2021
      sourceType: 'module', // 支持使用 import/export
      ecmaFeatures: {
        jsx: true, // 如果您使用 JSX，需要设置为 true
      },
      requireConfigFile: false, // 对于 @babel/eslint-parser，需要设置为 false
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-essential', // 使用 Vue 3 的基本规则
    ],
    plugins: [
      'vue', // 使用 eslint-plugin-vue
    ],
    rules: {
      'no-unused-vars': 'warn', // 警告未使用的变量
      'no-undef': 'error', // 错误：使用未定义的变量
      'vue/script-setup-uses-vars': 'error', // 防止在 <script setup> 中误报未使用的变量
      // 可以根据需要添加其他规则
    },
    globals: {
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly',
    },
  };
  