import { Stack } from "@fluentui/react";
import { useState } from "react";
import SideBar from "../../components/side-bar/side-bar";
import SiteMap from "../../components/site-map/site-map";
import "./main.css";

function Main() {
  const [cameraType, setCameraType] = useState("map");
  const [selected, setSelected] = useState(null);
  return (
    <Stack horizontal wrap verticalFill className="main-page p-1">
      <Stack.Item grow={1} className="p-0">
        <SideBar />
      </Stack.Item>
      <Stack.Item grow={1} className="pb-2">
        <SiteMap
          cameraType={cameraType}
          setCameraType={setCameraType}
          selected={selected}
          setSelected={setSelected}
        />
      </Stack.Item>
    </Stack>
  );
}

export default Main;
