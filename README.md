# Text Comparison Tool / テキスト比較ツール

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

IIIF マニフェストを用いて、2つの資料のテキストと画像を並べて比較するためのWebアプリケーションです。

**デモ**: https://iiif-text.vercel.app/

## 主な機能

- **画像比較** — IIIF画像を左右に並べて表示（ズーム・パン・回転対応）
- **テキスト差分（Diff）** — 2つのテキストの差分を文字単位でハイライト表示
- **テキスト編集距離（Levenshtein）** — 編集距離に基づく類似度の算出・ネットワークグラフ可視化
- **多言語対応** — 日本語 / English
- **URL共有** — 比較結果をURLパラメータで共有可能
- **埋め込み** — iframeによる外部サイトへの埋め込みに対応

## 技術スタック

- [Next.js](https://nextjs.org) (TypeScript / App Router / Static Export)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Radix UI](https://www.radix-ui.com) — UIコンポーネント
- [OpenSeadragon](https://openseadragon.github.io) — IIIF画像ビューア
- [vis-network](https://visjs.github.io/vis-network/docs/network/) — ネットワークグラフ可視化
- [next-intl](https://next-intl.dev) — 国際化
- [Zustand](https://zustand.docs.pmnd.rs) — 状態管理

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動（localhost:3109）
npm run dev

# 本番ビルド（静的サイト出力）
npm run build
```

## 使い方

1. トップページでIIIFマニフェストURLとカンバスURLを入力
2. 「比較を始める」ボタンで比較を実行
3. 「画像」「テキスト（差分）」「テキスト（編集距離）」タブで表示を切り替え

### URLパラメータ

| パラメータ | 説明 |
|---|---|
| `manifest1` | 左側のIIIFマニフェストURL |
| `manifest2` | 右側のIIIFマニフェストURL |
| `canvas1` | 左側のカンバスURL（任意） |
| `canvas2` | 右側のカンバスURL（任意） |
| `label1` | 左側のラベル（任意） |
| `label2` | 右側のラベル（任意） |
| `mode` | 表示モード: `0`=画像, `1`=テキスト差分, `2`=編集距離 |
| `embed` | `1` を指定すると埋め込みモード |

### 埋め込み例

```html
<iframe
  src="https://iiif-text.vercel.app/ja/?manifest1=...&manifest2=...&embed=1"
  width="100%"
  height="500px">
</iframe>
```

## ライセンス

[MIT](LICENSE)
