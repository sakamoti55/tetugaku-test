import React, { useState, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import Information from "../information/Information";
import "./BottomSheet.css";

const BottomSheetPage = ({ data, nodeId }) => {
  // openVh: シートが開いたときの上限（画面上部からの位置、0 なら完全に上まで）
  // closedVh: シートが閉じたときの下限（画面上部からの位置）
  const openVh = 10; // 必要に応じて変更（例：0なら完全に開く）
  const closedVh = 80; // 必要に応じて変更（例：90なら画面上部から 90vh の位置）

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

  const onScrollToClose = () => {
    setSheetY(sheetY + 0.00000000001);
  };

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [, my], first, memo = sheetY }) => {
        if (sheetY === openPosition) return; // 開ききっていたらドラッグ無効

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

      <Information
        data={data}
        nodeId={nodeId}
        onScrollToClose={onScrollToClose}
      />
    </div>
  );
};

export default BottomSheetPage;
