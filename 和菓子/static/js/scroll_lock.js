console.log("reading_scrolllock");

let sections = [];
let index = 1; // 初期値は1
let isScrolling = false;

document.querySelector(".logo").addEventListener("click", (e) => {
  e.preventDefault();
  index = 1;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // スマホサイズなら何もしない
  if (window.innerWidth <= 460) return;

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

  index = closestIndex + 1; // 1スタートに修正

  console.log("🌀 index: ", index);
  if (typeof updateTurtlePosition === "function") {
    updateTurtlePosition(index);
  }
});

const scrollToSection = (i) => {
  if (sections[i - 1]) {
    window.scrollTo({
      top: sections[i - 1].offsetTop,
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
      event.preventDefault();
      if (isScrolling || sections.length === 0) return;

      isScrolling = true;

      if (event.deltaY > 0) {
        index = Math.min(index + 1, sections.length);
      } else {
        index = Math.max(index - 1, 1);
      }

      scrollToSection(index);

      if (typeof updateTurtlePosition === "function") {
        updateTurtlePosition(index);
      }

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    },
    { passive: false }
  );

  console.log("read_scrolllock 完了");
}

document.addEventListener("DOMContentLoaded", setupScrollSnap);
