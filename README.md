# css-library-test

Test project for a CSS library.

```
css-library-test/
├── src/
│   ├── tokens/       ← CSS Custom Properties
│   ├── base/         ← Reset, Typography
│   └── index.ts      ← Entry Point
├── dist/             ← Build-Output
├── .gitignore
├── .npmignore
├── CHANGELOG.md
├── LICENSE
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## Initialize Projects

```bash
pnpm init
pnpm add -D vite typescript @types/node
mkdir -p src/tokens src/base
touch src/index.ts .gitignore .npmignore  tsconfig.json vite.config.ts
```

Adapt `.gitignore`

```
.DS_Store
**.tgz
dist/
node_modules/
```

Adapt `.npmignore`

```
.DS_Store
*.log
src/
tsconfig.json
vite.config.ts
```

Adapt `package.json`

```json
{
  "name": "@yawnwest/css-library-test",
  "version": "0.1.0",
  "description": "Test project for a CSS library.",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./style.css": "./dist/style.css"
  },
  "files": ["dist"],
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "prepublishOnly": "pnpm build"
  },
  "keywords": ["CSS Library"],
  "author": "Yawn West",
  "license": "MIT",
  "packageManager": "pnpm@10.32.1",
  "devDependencies": {
    "@types/node": "^25.5.0",
    "typescript": "^5.9.3",
    "vite": "^8.0.0"
  }
}
```

Adapt `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationDir": "./dist",
    "emitDeclarationOnly": true,
    "strict": true,
    "skipLibCheck": true,
    "sourceMap": true
  },
  "include": ["src"]
}
```

Adapt `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'YawnwestCssLibraryTest',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: () => 'style.css',
      },
    },
  },
})
```

Add code, e.g., `src/*`.

## Lint & Format

```bash
pnpm add -D eslint prettier typescript-eslint eslint-config-prettier jiti
```

Add `.prettierignore`

```
dist/
node_modules/
pnpm-lock.yaml
tests/visual/snapshots/
```

Add `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100
}
```

Add `eslint.config.ts`

```ts
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
```

Adapt `package.json``

````json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

## Pre-Commit

```bash
pnpm add -D husky lint-staged
pnpm exec husky init
echo "pnpm exec lint-staged" > .husky/pre-commit
```

Adapt `package.json`
```json
"lint-staged": {
  "*.ts": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.css": [
    "prettier --write"
  ],
  "*.json": [
    "prettier --write"
  ]
}
```

## Testing

```bash
pnpm add -D vitest
````

### Unit Tests

Adapt `package.json`

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:ci": "pnpm build && vitest run"
}
```

Add `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: '.',
    exclude: ['**/node_modules/**', 'tests/visual/**'],
  },
})
```

See example tests here: `tests/build.test.ts` and `tests/tokens.test.ts`.

### e2e Tests

```bash
pnpm add -D @playwright/test
pnpm exec playwright install chromium webkit
```

Add `playwright.config.ts`

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/visual',
  snapshotDir: './tests/visual/snapshots',
  updateSnapshots: 'missing',
  snapshotPathTemplate:
    '{testDir}/snapshots/{testFilePath}-snapshots/{arg}-{projectName}-darwin{ext}',
  expect: {
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixelRatio: 0.15,
    },
  },
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
})
```

Adapt `package.json``

```json
"scripts": {
  "test:visual": "playwright test",
  "test:visual:update": "rm -rf tests/visual/snapshots && playwright test --update-snapshots"
}
```

Adapt .gitignore

```
test-results/
```

Example: `tests/visual/button.spec.ts`

Usage:

```bash
# Generate screenshots
pnpm test:visual:update
# test against screenshots
pnpm test:visual
```

## Size Check

```bash
pnpm add -D @size-limit/preset-small-lib size-limit
pnpm approve-builds
```

Adapt `package.json`

```json
"scripts": {
  "size": "size-limit"
},
...
"size-limit": [
  {
    "path": "dist/index.js",
    "limit": "1 kB"
  },
  {
    "path": "dist/style.css",
    "limit": "5 kB"
  }
]
```

## Publish

### Initialize Project at npmjs.org

```bash
# commit and merge to main
npm login
pnpm publish --access public
```

### Publish Project

```bash
git checkout -b chore/release-0.4.0
# CHANGELOG.md updaten
git add .
git commit -m "chore: release 0.4.0"
git push -u origin chore/release-0.4.0
pnpm version major --no-git-tag-version
# → open PR & merge on GitHub

git checkout main
git pull
git tag -a v0.4.0 -m "Release v0.4.0"
git push --follow-tags
pnpm publish --access public # if you don't have the publish GitHub Action
```

## Add Playgorund

Add files like `playground/index.html` and `playground/main.ts`.

Adapt `vite.config.ts`

```ts
...
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      root: "playground",
    };
  }

  return {
    build: {
      ...
    },
  };
});
```

## Add CI

### Basics

Add `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    # branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v6

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps chromium webkit

      - name: Build & Unit Tests
        run: pnpm test:ci

      - name: Visual Tests
        run: pnpm test:visual

      - name: Lint
        run: pnpm lint

      - name: Format check
        run: pnpm format:check

      - name: Bundle size
        run: pnpm size
```

Rewrite `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'playground',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'YawnwestCssLibraryTest',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: () => 'style.css',
      },
    },
  },
})
```

## Dependency Check

Enable _Dependecy graph_ on https://github.com/yawnwest/css-library-test/settings/security_analysis

Set _Require two-factor authentication and disallow tokens (recommended)_

Add `.github/workflows/dependency-review.yml`

## Enable GitHub Pages

On GitHub:

1. Settings → Pages
2. Source → GitHub Actions

Add `.github/workflows/deploy.yml`

## Publish

On `https://npmjs.org` enable \_Trusted Publisher` for your package.

Add `.github/workflows/publish.yml`
