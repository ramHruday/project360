import { Stack } from "@fluentui/react";
import { useState } from "react";
import SideBar from "../../components/side-bar/side-bar";
import SiteMap from "../../components/site-map/site-map";
import "./main.css";

function Main() {
  const [cameraType, setCameraType] = useState("map");
  const [selected, setSelected] = useState(null);
  const [alertedParts, setAlertedParts] = useState(null);

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
        <SiteMap
          cameraType={cameraType}
          setCameraType={setCameraType}
          selected={selected}
          setSelected={toggleSelected}
          alertedParts={alertedParts}
          setAlertedParts={(p) => {
            setAlertedParts(p);
          }}
        />
      </Stack.Item>
    </Stack>
  );
}

export default Main;
