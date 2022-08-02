import { Spinner, Stack } from "@fluentui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { getIntelliData } from "../../api/post";
import SideBar from "../../components/side-bar/side-bar";
import { convertIntelliData } from "../../utils/pump";
import { useInterval } from "../../utils/utils";
import "./main.css";
const SiteCanvas = lazy(() =>
  import("../../components/site-canvas/site-canvas")
);

function Main() {
  const [cameraType, setCameraType] = useState("map");
  const [pumpsData, setPumpsData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isAllSelected, setIsAllSelected] = useState(null);
  const [alertedParts, setAlertedParts] = useState(null);
  const [loading, setLoading] = useState(null);

  const callAPI = (shouldLoad) => {
    shouldLoad ?? setLoading(true);
    getIntelliData().then((d) => {
      const copy = convertIntelliData(d);
      setPumpsData(copy);
      shouldLoad ?? setLoading(false);
    });
  };

  // just first call
  useEffect(() => {
    callAPI(true);
  }, []);

  useInterval(() => {
    callAPI(false);
  }, 1000 * 100);

  const toggleSelected = (id) => {
    if (selected && selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  };

  return (
    <Stack horizontal wrap verticalFill className="main-page">
      <Stack.Item grow={1} className="p-0 ms-hiddenLgDown">
        <SideBar />
      </Stack.Item>
      <Stack.Item grow={1} className="pb-2 m-2">
        {!loading ? (
          <Suspense fallback={<Spinner />}>
            <SiteCanvas
              cameraType={cameraType}
              setCameraType={setCameraType}
              selected={selected}
              setSelected={setSelected}
              isAllSelected={isAllSelected}
              setIsAllSelected={setIsAllSelected}
              alertedParts={alertedParts}
              pumpsData={pumpsData}
              setAlertedParts={(p) => {
                setAlertedParts(p);
              }}
            />
          </Suspense>
        ) : (
          <Spinner />
        )}
      </Stack.Item>
    </Stack>
  );
}

export default Main;
