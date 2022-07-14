import { Stack } from "@fluentui/react";
import * as React from "react";
import SiteList from "../site-list/site-list";
import "./side-bar.scss";

function SideBar() {
  return (
    <Stack className="side-bar ms-hiddenLgDown" verticalFill>
      <h3 className="px-2">Sites</h3>
      <SiteList />
    </Stack>
  );
}

export default SideBar;
