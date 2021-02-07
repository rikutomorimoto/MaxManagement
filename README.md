# 本ポートフォリオの概要
本ポートフォリオは，開発者である森本陸斗が趣味とする筋肉トレーニングでの，以下の悩みを解決するものとして開発しました．
    ・筋トレである程度の成長をすると，見た目の変化がわかりづらくなる
    ・毎回の筋トレでの，自分が成長しているのか，停滞しているのかの判断が難しい
そこで，上記の問題を解決するために，以下の要件を満たしたwebアプリケーションを開発しようと考えました．
    ・トレーニングの1stSetの重量，反復回数から，最大重量(=1Rep Max=1RM)を算出し，記録
    ・記録したデータをグラフ化
    ・体の各部位に対する幅広い筋トレ種目に対応

## 開発環境
フロントエンド：javascript, react, material-ui
バックエンド：python, django, nginx, gunicorn
インフラ：AWS(EC2, S3, CloudFront)

## 実装した機能
    ・ログイン認証機能(djangorestframeworkのtoken認証を使用)
    ・reactによる完全SPA化されたアプリケーション
    ・各トレーニング種目に応じたトレーニング結果の取得，記録，更新，削除(CRUD)
    ・各トレーニング種目の最大重量の記録，グラフ化
    
## 言語，フレームワーク等の選定について
    ・python・・・大学4年次での研究活動にて使用していた言語であり，現職でも使用している言語である故に，馴染みが深いため．
    ・django・・・pythonでwebアプリケーションを開発するなら最も使われているdjangoを使おうと考えたため．
    ・react・・・2020年12月時点で，フロントエンド側にreactやvue.jsを用いたSPAのWEBアプリケーションがトレンドの技術であり，魅力を感じたため．
    ・AWS・・・現在求職市場ではWEBアプリケーションはインフラにAWSを使用している企業が多く，アピール材料となると考えたため．
    
## 
