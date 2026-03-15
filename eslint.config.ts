import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    extends: [...tseslint.configs.recommended],
  },
  eslintConfigPrettier,
  {
    ignores: ['dist/**', 'playground/**', 'node_modules/**'],
  }
)
