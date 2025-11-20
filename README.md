# linkseek

Flutter 日程調整アプリの雛形

セットアップと実行手順:

1. Flutter SDK をインストールしてください（https://flutter.dev）。
2. プロジェクトルートで依存をインストールします:

```powershell
flutter pub get
```

3. アプリを実行します:

```powershell
flutter run
```

備考:
- この雛形はローカルの in-memory イベントストアを使用します。Firebase 等はまだ組み込んでいません。
- 実運用では `flutterfire configure` により `lib/firebase_options.dart` を生成して Firebase を組み込んでください。
 
CI で iOS ビルド (unsigned IPA) を実行するワークフローを追加しました。GitHub Actions が macOS ランナー上でビルドし、IPA をアーティファクトとして出力します。

- ワークフロー名: `.github/workflows/ios-build.yml`
- 実行: `Actions` タブから `Build iOS IPA (CI)` を実行するか、main ブランチに push するとトリガされます。

注意: CI は署名なしの IPA を生成します。TestFlight へ配布するにはダウンロード後にローカルで署名するか、証明書／プロビジョニングプロファイルを GitHub Secrets に追加して自動署名・アップロードするワークフローを作成してください。
