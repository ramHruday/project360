import { IconButton, Spinner, Stack } from "@fluentui/react";

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
  const [cameraType, setCameraType] = useState("orbit");
  const [showSideBar, setShowSideBar] = useState(true);
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

  return (
    <Stack horizontal wrap verticalFill className="main-page">
      <div
        className="position-absolute card p-2"
        style={{
          top: "45%",
          left: showSideBar ? "16.5%" : "1rem",
          zIndex: 99999,
        }}
      >
        <IconButton
          className="text-neutralPrimary bg-themeLighterAlt"
          iconProps={{
            iconName: showSideBar ? "CaretLeftSolid8" : "FlickLeft",
          }}
          onClick={() => setShowSideBar(!showSideBar)}
          text="Back to Frac site"
        />
      </div>
      {showSideBar ? (
        <Stack.Item grow={1} className="p-0 ms-hiddenLgDown position-relative">
          <SideBar />
        </Stack.Item>
      ) : null}
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
