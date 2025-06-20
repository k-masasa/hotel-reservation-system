## Vue.js の書き方について

- temlate, script, style の順で書く
- script の中では、`<script setup lang="ts">` を使用する
- TypeScript の型は `type` を使用する
- SCSS を使用する
- 汎用的なロジックやスタイルは切り出すこと
- 定数は lib/constants.ts に定義する

## UI デザインについて

- マテリアルデザインを心がけてください。
- 可能な範囲で Vueitfy のコンポーネントやクラスを使用してください。
- アイコンは Material Icons を使用してください。
