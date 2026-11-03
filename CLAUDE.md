# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build — must pass before any deploy
npm run start    # Serve production build locally
npm run lint     # ESLint with Next.js core-web-vitals + TypeScript rules
```

No test runner is configured. Acceptance is verified by `npm run build` succeeding and manual testing per the checklist in `../requirements.md`.

## Architecture

Single-page app (`src/app/page.tsx`) — no routing. All state lives in a single React client component that reads/writes `localStorage` under the key `priority-flow-tasks`.

Planned source layout once implemented:

```
src/
  app/
    layout.tsx       # Root layout, Geist fonts, metadata
    page.tsx         # Home page — composes all sections
    globals.css      # Tailwind v4 import + CSS custom properties
  components/
    TaskForm.tsx     # Input form (name, urgency, importance, submit)
    Matrix.tsx       # 2×2 Eisenhower grid — receives task array as prop
    Quadrant.tsx     # Single quadrant card with header, task list, delete buttons
  lib/
    storage.ts       # localStorage read/write helpers
    types.ts         # Task type and Quadrant enum
```

## Key constraints

- **Tailwind v4**: uses `@import "tailwindcss"` (not `@tailwind` directives). CSS custom properties for theme tokens go inside `@theme inline {}`.
- **App Router only**: all interactive components must be `"use client"` — no server actions needed.
- **No external data**: no API routes, no server components that fetch data. `localStorage` is the only persistence.
- **No `dangerouslySetInnerHTML`**: user input is always rendered as React text nodes.
- **Responsive breakpoint**: 375 px is the minimum supported width; use `sm:` (640 px) for the 2-column matrix layout on desktop.
- **TypeScript strict**: `strict: true` is set; avoid `any` and non-null assertions.
- **Path alias**: `@/` resolves to `src/`.
- **Next.js version notice**: see `AGENTS.md` — this project uses a recent Next.js version that may differ from LLM training data. Check `node_modules/next/dist/docs/` for authoritative API docs.

## Project-specific rules

### MVP scope
実装するのは F-01〜F-11（requirements.md §3）のみ。F-12以降（編集・完了・期限・AI・共有）はコードに含めない。

### Task data model
```ts
type Task = {
  id: string;        // crypto.randomUUID()
  name: string;      // 1–100文字
  urgent: boolean;   // true = 高, false = 低
  important: boolean;
};
```
4象限の分類は `urgent` × `important` の組合せで決定する。DB・サーバーは使用しない。

### Quadrant labels
| urgent | important | 象限名 | 行動指針 |
|--------|-----------|--------|----------|
| true   | true      | 重要・緊急 | 今すぐ取りかかる |
| false  | true      | 重要・非緊急 | 計画して実行する |
| true   | false     | 非重要・緊急 | 委任を検討する |
| false  | false     | 非重要・非緊急 | 後回しまたは手放す |

### Deletion confirmation
削除ボタンは `window.confirm()` で確認してから `localStorage` を更新する（F-08）。

### Input validation rules (F-04)
- 空文字・空白のみ → エラー表示、登録拒否
- 101文字以上 → エラー表示、登録拒否
- バリデーションエラーはフォーム内インラインで表示（アラート不使用）

### Accessibility
- `<input>` / `<select>` には必ず対応する `<label>` を付与する
- 象限の区別はカード見出し（`<h2>`等）で行い、色だけに依存しない
- 削除ボタンには `aria-label="タスク名を削除"` を付与する

### Styling conventions
- Tailwind ユーティリティクラスのみ使用。インラインスタイルや CSS Modules は使わない。
- ダークモードは実装しない（Tailwind の `dark:` バリアントは使わない）。
- 象限カードの色は背景色で薄く区別するが、見出しテキストで必ず象限名を示す。

### localStorage
- キー: `"priority-flow-tasks"`
- 値: `JSON.stringify(Task[])`
- `JSON.parse` は `try/catch` で囲み、パース失敗時は空配列にフォールバックする

### Build gate
`npm run build` が成功することがすべての変更の前提条件。lint エラーも同様。
