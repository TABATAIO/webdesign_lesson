// turtle.js
console.log("turtle.js 読み込み");

let lastTurtleIndex = 0;

const positions = [
  {top: "0px", left: "1440px", scaleX: "-1"},
  {top: "-110px", left: "1100px", scaleX: "-1"},
  {top: "0px", left: "300px", scaleX: "1"},
  {top: "10px", left: "700px", scaleX: "1"},
  {top: "900px", left: "10px", scaleX: "-1"},
];

// 下方向（進むとき）のミドル
const middlePositionsDown = [
  {top: "0px", left: "0px", scaleX: "-1"},
  {top: "-200px", left: "1200px", scaleX: "-1"},
  {top: "-100px", left: "-100px", scaleX: "1"},
  {top: "10px", left: "700px", scaleX: "1"},
  {top: "900px", left: "1440px", scaleX: "-1"},
];

// 上方向（戻るとき）のミドル
const middlePositionsUp = [
  {top: "0px", left: "0px", scaleX: "-1"},
  {top: "-100px", left: "1440px", scaleX: "-1"},
  {top: "200px", left: "500px", scaleX: "-1"},
  {top: "50px", left: "400px", scaleX: "1"},
  {top: "900px", left: "1100px", scaleX: "1"},
];

function updateTurtlePosition(currentIndex) {
  // モバイルサイズなら何もしない
  if (window.innerWidth <= 460) return;

  console.log("🐢 updateTurtlePosition 呼び出し成功 → index:", currentIndex);
  const turtle = document.getElementById("turtle");
  if (!turtle) return;

  // 範囲外なら何もしない
  if (
    currentIndex < 1 ||
    currentIndex > positions.length ||
    currentIndex > middlePositionsDown.length ||
    currentIndex > middlePositionsUp.length
  ) {
    console.warn("🐢 currentIndexが範囲外です:", currentIndex);
    return;
  }

  const pos = positions[currentIndex - 1];
  const isGoingDown = currentIndex > lastTurtleIndex;
  const middlepos = isGoingDown
    ? middlePositionsDown[currentIndex - 1]
    : middlePositionsUp[currentIndex - 1];
  const scaleY = isGoingDown ? -1 : 1;

  // index 4→5 の時だけ左右反転
  let scaleX_middle = middlepos.scaleX;
  let scaleX_final = pos.scaleX;
  if (lastTurtleIndex === 4 && currentIndex === 5) {
    scaleX_middle = scaleX_middle === "1" ? "-1" : "1";
    scaleX_final = scaleX_final === "1" ? "-1" : "1";
  }

  // ミドル地点へ
  turtle.style.transform = `translate(${middlepos.left}, ${middlepos.top}) scaleX(${scaleX_middle}) scaleY(${scaleY})`;

  setTimeout(() => {
    turtle.style.transform = `translate(${pos.left}, ${pos.top}) scaleX(${scaleX_final}) scaleY(${scaleY})`;
    lastTurtleIndex = currentIndex;
  }, 500);
}

// 外から呼び出せるように export っぽく window に登録
window.updateTurtlePosition = updateTurtlePosition;

console.log("turtle.js 読み込み完了");
// turtle.js 読み込み完了