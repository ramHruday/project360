import { useState } from "react";

function DataCard(props) {
  const [cameraType, setCameraType] = useState("map");
  return (
    <div className="data-card">
      <div className="data-card-head">{props.head}</div>
      <div className="data-card-body">{props.children}</div>
    </div>
  );
}

export default DataCard;
