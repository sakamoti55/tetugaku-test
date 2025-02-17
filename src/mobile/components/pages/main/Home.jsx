import { useState, useEffect } from "react";
import Network from "@m/components/organisms/network/Network.jsx";
import BottomSheet from "@m/components/organisms/bottom-sheet/BottomSheet.jsx";
// import { fetchData } from "@m/api/fetchData";
import processedData from "/create_json/output_data/processed_data";

export default function Home() {
  const [nodeId, setNodeId] = useState(5);

  // useEffect(() => {
  //   fetchData().then((data) => setProcessedData(data));
  // }, []);

  return (
    <>
      <Network />
      <BottomSheet data={processedData} nodeId={nodeId} />
    </>
  );
}
