import InformationCard from "./InformationCard.jsx";
import "./Information.css";
import { useRef } from "react";

export default function Information({
  data,
  nodeId,
  sheetY,
  openPosition,
  onScrollToClose,
}) {
  const containerRef = useRef(null);

// Information.jsx 内
const handleWheel = (e) => {
  const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
  // 先頭か末端の場合は親のドラッグ処理に切り替える前にデフォルトの動作を防止
  if (
    (scrollTop === 0 && e.deltaY < 0) ||
    (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0)
  ) {
    e.preventDefault(); // これにより親へスクロールイベントが伝播しないようにする
    onScrollToClose();
  }
};


  return (
    <div
      ref={containerRef}
      className="information-container-fm"
      style={{
        // シートが完全に開いているときのみ内部スクロール可能にする
        overflowY: sheetY === openPosition ? "auto" : "hidden",
        scrollBehavior: "smooth",
      }}
      onWheel={handleWheel}  // onScroll ではなく onWheel を利用
    >
      <div className="information-header-fm">解説</div>
      <InformationCard data={data} nodeId={nodeId} />
    </div>
  );
}
