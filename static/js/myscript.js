console.log("readJS");

// スムーススクロールの自作処理
// 参考: MDN / Qiita

const links = document.querySelectorAll('a[href^="#"]'); // #で始まるリンクをすべて取得

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // デフォルトのジャンプ動作を止める

    const href = link.getAttribute("href"); // 例: "#section1"
    const target = document.querySelector(href); // 対応するIDを持つ要素を取得

    if (!target) return; // 要素がなければ何もしない

    const offset = 90; // 固定ヘッダーなどがある場合のオフセット
    const elementPosition = target.getBoundingClientRect().top; // ビューポートからの位置
    const offsetPosition = elementPosition + window.scrollY - offset; // スクロール先を調整

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth", // スムースにスクロール
    });
  });
});

console.log("read_smooth");
