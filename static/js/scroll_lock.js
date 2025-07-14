console.log("reading_scrolllock");

document.querySelector(".logo").addEventListener("click", (e) => {
  e.preventDefault();
  index = 0;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  sections = document.querySelectorAll(".section");

  // 初期indexの計算（現在のスクロール位置に近いセクションを探す）
  const scrollY = window.scrollY;
  let minDiff = Infinity;
  let closestIndex = 0;

  sections.forEach((section, i) => {
    const offsetTop = section.offsetTop;
    const diff = Math.abs(scrollY - offsetTop);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  });

  index = closestIndex; // ← 最も近いセクションを index に設定
});

let sections = [];
let index = 0;
let isScrolling = false;

const scrollToSection = (i) => {
  if (sections[i]) {
    window.scrollTo({
      top: sections[i].offsetTop,
      behavior: "smooth",
    });
  }
};

function setupScrollSnap() {
  if (window.innerWidth <= 460) {
    console.log("スマホ表示のためスナップスクロール無効");
    return;
  }

  console.log("PC表示でスクロール制御を有効化");

  sections = document.querySelectorAll(".section");

  window.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault(); // 通常スクロールを無効化
      if (isScrolling || sections.length === 0) return;

      isScrolling = true;

      if (event.deltaY > 0) {
        index = Math.min(index + 1, sections.length - 1);
      } else {
        index = Math.max(index - 1, 0);
      }

      scrollToSection(index);

      // 次の入力まで待機（1秒間）
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    },
    { passive: false }
  );

  console.log("read_scrolllock 完了");
}

document.addEventListener("DOMContentLoaded", setupScrollSnap);
