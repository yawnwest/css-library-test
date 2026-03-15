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
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "YawnwestCssProjectTest",
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: () => "style.css",
      },
    },
  },
});
```

Add code, e.g., `src/*`.

## Testing

```bash
pnpm add -D vitest
```

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
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    root: ".",
    exclude: ["**/node_modules/**", "tests/visual/**"],
  },
});
```

See example tests here: `tests/build.test.ts` and `tests/tokens.test.ts`.

### e2e Tests

```bash
pnpm add -D @playwright/test
pnpm exec playwright install chromium webkit
```

Add `playwright.config.ts`

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  snapshotDir: "./tests/visual/snapshots",
  updateSnapshots: "missing",
  snapshotPathTemplate:
    "{testDir}/snapshots/{testFilePath}-snapshots/{arg}-{projectName}-darwin{ext}",
  expect: {
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixelRatio: 0.05,
    },
  },
  use: {
    baseURL: "http://localhost:5173",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
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
