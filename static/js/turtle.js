// turtle.js
console.log("turtle.js 読み込み完了");

let lastTurtleIndex = 0;

function updateTurtlePosition(currentIndex) {
  const turtle = document.getElementById("turtle");
  if (!turtle) return;

  // 現在のクラスを削除
  turtle.className = "";

  // 移動先の位置クラスを付ける
  turtle.classList.add(`turtle-pos${currentIndex + 1}`);

  // 向きを変更（戻ったときに反転）
  if (currentIndex < lastTurtleIndex) {
    turtle.classList.add("turtle-flip");
  } else {
    turtle.classList.remove("turtle-flip");
  }

  lastTurtleIndex = currentIndex;
}

// 外から呼び出せるように export っぽく window に登録
window.updateTurtlePosition = updateTurtlePosition;
