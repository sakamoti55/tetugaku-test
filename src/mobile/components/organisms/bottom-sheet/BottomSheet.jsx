import React, { useState, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import Information from "../information/Information";
import "./BottomSheet.css";

const BottomSheetPage = ({ data, nodeId }) => {
  // シートが開いたときと閉じたときの位置（vh の割合で指定）
  const openVh = 10; // 例：10vh の位置＝上部から 10vh
  const closedVh = 80; // 例：80vh の位置＝上部から 80vh

  const [openPosition, setOpenPosition] = useState(0);
  const [closedPosition, setClosedPosition] = useState(0);
  const [sheetY, setSheetY] = useState(0);

  useEffect(() => {
    const updatePositions = () => {
      const vh = window.innerHeight;
      setOpenPosition(vh * (openVh / 100));
      setClosedPosition(vh * (closedVh / 100));
      setSheetY(vh * (closedVh / 100));
    };
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  // Information 内でスクロールが端に達したときに呼ばれる
  const onScrollToClose = () => {
    // ※ onScrollToClose 呼び出しで、親側の translate（＝ドラッグ挙動）を開始させるための処理例
    setSheetY((prev) => prev + 0.00000000001);
  };

  const bind = useGesture(
    {
      onDrag: ({ movement: [, my], first, memo = sheetY }) => {
        // 既に完全に開いている場合はドラッグ無効
        if (sheetY === openPosition) return;

        if (first) memo = sheetY;
        const newY = memo + my;
        const clamped = Math.min(Math.max(newY, openPosition), closedPosition);
        setSheetY(clamped);
        return memo;
      },
    },
    { drag: { axis: "y" } }
  );

  return (
    <div
      {...bind()}
      className="bottom-sheet-container"
      style={{ transform: `translateY(${sheetY}px)` }}
    >
      <div className="drag-handle">
        <div className="handle" />
      </div>

      {/* sheetY と openPosition を props として渡す */}
      <Information
        data={data}
        nodeId={nodeId}
        sheetY={sheetY}
        openPosition={openPosition}
        onScrollToClose={onScrollToClose}
      />
    </div>
  );
};

export default BottomSheetPage;
