# 本ポートフォリオの概要

URL:http://release-max-management-service.s3-website-ap-northeast-1.amazonaws.com/

本ポートフォリオは，開発者である森本陸斗が趣味とする筋肉トレーニングでの，以下の悩みを解決するものとして開発しました．

    ・筋トレである程度の成長をすると，見た目の変化がわかりづらくなる
    ・毎回の筋トレでの，自分が成長しているのか，停滞しているのかの判断が難しい
そこで，上記の問題を解決するために，以下の要件を満たしたwebアプリケーションを開発しようと考えました．

    ・トレーニングの1stSetの重量，反復回数から，最大重量(=1Rep Max=1RM)を算出し，記録
    ・記録したデータをグラフ化
    ・体の各部位に対する幅広い筋トレ種目に対応

## 開発環境

    ・フロントエンド：javascript, react, material-ui
    ・バックエンド：python, django, nginx, gunicorn
    ・インフラ：AWS(EC2, S3, CloudFront)

## 実装した機能
    ・ログイン認証機能(djangorestframeworkのtoken認証を使用)
    ・reactによる完全SPA化されたアプリケーション
    ・各トレーニング種目に応じたトレーニング結果の取得，記録，更新，削除(CRUD)
    ・各トレーニング種目の最大重量の記録，グラフ化
    
## 今後の改善点
    ・ローカル環境では動作していたuseEffectの機能不全の解消
    ・新機能の追加（他ユーザーとの比較，プロフィール機能）
    ・レスポンシブ対応
    
## 言語，フレームワーク等の選定について
    ・python・・・大学4年次での研究活動にて使用していた言語であり，現職でも使用している言語である故に，馴染みが深いため．
    ・django・・・pythonでwebアプリケーションを開発するなら最も使われているdjangoを使おうと考えたため．
    ・react・・・2020年12月時点で，フロントエンド側にreactやvue.jsを用いたSPAのWEBアプリケーションがトレンドの技術であり，魅力を感じたため．
    ・AWS・・・現在求職市場ではWEBアプリケーションはインフラにAWSを使用している企業が多く，アピール材料となると考えたため．
    
## 経歴
    ・2020年3月　関西大学　環境都市工学部　都市システム工学科を卒業
        在学中にC,C++,javascriptを授業で学ぶが興味はゼロ
        その後大学4年次に研究室に配属され，研究の補助としてpythonを学び，プログラミングの面白さに気づく
        研究の中でpythonの他に統計学（スチューデントのt検定,ウェルチのt検定，回帰分析）を学び，定量的かつロジカルに物事を考える重要さを知り始める
    ・2020年4月~　某東証一部上場企業のSEとして勤務
        ■お客様先でopenstackを用いた大規模NFVシステムにおける，自動試験スクリプト開発の保守，新規機能分の開発を担当
        言語はpython，ライブラリはselenium,request,unittest等を使用
        ■突如自社で同期が退職したことにより，自社に戻りカメラ，レコーダーの複合検証プロジェクトに参画
        基本は試験であるため単調な作業ではあるが，上司の手作業や試験の一部を自ら提案しpythonを用いて自動化し，工数削減に貢献
   
## なぜ転職がしたいのか
現職では，現状開発担当になるまでに数年程度の検証作業を積む必要があると言われたため．

また，希望していたWEB系のプロジェクトは現職ではアサインが難しいと言われたため（現職はハードウェア系のプロジェクトがマジョリティ）．

### 自分の手で顧客が喜ぶようなWEBアプリケーションを作成し，エンジニアとして世の中に貢献したい．

ここまでReadmeを閲覧していただきありがとうございます．
もしご興味をお持ちいただけましたら，以下にご連絡をお願いいたします．

メールアドレス：riku10da.shh@gmail.com
    
