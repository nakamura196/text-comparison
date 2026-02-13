# Text Comparison Tool / テキスト比較ツール

IIIF マニフェストを用いて、2つの資料のテキストと画像を並べて比較するためのWebアプリケーションです。

## 主な機能

- **画像比較** — IIIF画像を左右に並べて表示
- **テキスト差分（Diff）** — 2つのテキストの差分をハイライト表示
- **テキスト編集距離（Levenshtein）** — 編集距離に基づく類似度の算出・可視化
- **多言語対応** — 日本語 / English
- **URL共有** — 比較結果をURLパラメータで共有可能

## 技術スタック

- [Next.js](https://nextjs.org) (TypeScript / App Router)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Radix UI](https://www.radix-ui.com) — UIコンポーネント
- [OpenSeadragon](https://openseadragon.github.io) — IIIF画像ビューア
- [next-intl](https://next-intl.dev) — 国際化
- [Zustand](https://zustand.docs.pmnd.rs) — 状態管理

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動（localhost:3109）
npm run dev

# 本番ビルド
npm run build
```

## 使い方

1. 画面上部の「入力」ボタンをクリック
2. 比較したい2つの IIIF マニフェストURLとカンバスURLを入力
3. 「登録」ボタンで比較を実行
4. 「画像」「テキスト（差分）」「テキスト（編集距離）」タブで表示を切り替え

### URLパラメータ

| パラメータ | 説明 |
|---|---|
| `manifest1` | 左側のIIIFマニフェストURL |
| `manifest2` | 右側のIIIFマニフェストURL |
| `canvas1` | 左側のカンバスURL |
| `canvas2` | 右側のカンバスURL |
| `label1` | 左側のラベル（任意） |
| `label2` | 右側のラベル（任意） |
| `mode` | 表示モード: `0`=画像, `1`=テキスト差分, `2`=編集距離 |
| `embed` | `1` を指定すると埋め込みモード |
