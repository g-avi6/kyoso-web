// script.js
// - 初心者向けのコメントを多数記載しています
// - ページ内リンクのスムーズスクロール
// - カードのフェードイン（IntersectionObserverを使用）

// DOM が読み込まれたら処理を開始
document.addEventListener('DOMContentLoaded', function(){
  // 1) ページ内リンク（ハッシュリンク）をスムーズスクロールにする
  // a[href^="#"] は href が # で始まるリンクを選びます
  var links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function(link){
    link.addEventListener('click', function(e){
      // リンク先がページ内の要素ならスムーズスクロール
      var targetId = this.getAttribute('href');
      if(targetId.length > 1){
        var target = document.querySelector(targetId);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth'});
        }
      }
    });
  });

  // 2) カード要素をスクロール時にフェードインさせる
  var cards = document.querySelectorAll('.card');

  // IntersectionObserver が使えればそれを使う（パフォーマンス良）
  if('IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries, observer){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // 一度表示したら監視を止める
        }
      });
    }, {threshold:0.15});

    cards.forEach(function(card){ obs.observe(card); });
  } else {
    // 古いブラウザのためにフォールバック（すぐに表示）
    cards.forEach(function(c){ c.classList.add('visible'); });
  }
});

// 初心者向けメモ：
// - IntersectionObserverはスクロール連動のアニメーションに便利です。
// - より複雑な動きを付けたいときは、追加のクラスを切り替えてCSS側で制御します。
