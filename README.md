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

## Publish

### Initialize Project at npmjs.org

```bash
# commit and merge to main
npm login
pnpm publish --access public
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
