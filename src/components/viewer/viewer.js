import { useEffect } from "react";
import { initializeViewer } from "./viewer-helper";

const Viewer = () => {
  const urn =
    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bWFsbGF2ZW50dXJhc2FuanVhbmRlbHVyaWdhbmNob19idWNrZXQvMTU3OTUyNjAwMzkwM19NYWxsJTIwQXZlbnR1cmElMjBTSkxfRXN0cnVjdHVyYXMucnZ0";
  useEffect(() => {
    initializeViewer(urn);
  }, []);

  return (
    <div>
      <div id="viewerContainer"></div>
    </div>
  );
};

export default Viewer;
