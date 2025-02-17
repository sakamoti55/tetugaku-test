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

  // ホイールイベントでスクロールの端に達したかをチェック
  const handleWheel = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // 
    // ・上端にいて上方向（deltaY < 0）のスクロールの場合、または
    // ・下端にいて下方向（deltaY > 0）のスクロールの場合に onScrollToClose を呼び出す
    if (
      (scrollTop === 0 && e.deltaY < 0) ||
      (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0)
    ) {
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
