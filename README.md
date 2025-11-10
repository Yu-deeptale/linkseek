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
