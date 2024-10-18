module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // Ensure all imports appear before other statements
    'import/first': 'error',

    // Ensures that all imports are grouped, and separated by a newline
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'], // 'react' is considered external
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc', // sort in ascending order
          caseInsensitive: true, // ignore case
        },
      },
    ],

    // Prevents import of files from parent directories
    'import/no-relative-parent-imports': 'error',

    // Reports any imports that come after non-import statements
    'import/exports-last': 'error',
  },
};
