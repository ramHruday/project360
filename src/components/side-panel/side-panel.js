import { IconButton, Panel } from "@fluentui/react";
import * as React from "react";

import { useBoolean } from "@fluentui/react-hooks";
import SiteList from "../site-list/site-list";
import "./side-panel.scss";

function SidePanelBtn() {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  return (
    <>
      <IconButton
        className="ms-hiddenLgUp bg-themeLighter"
        iconProps={{ iconName: "ExpandMenu" }}
        onClick={openPanel}
      />
      <Panel
        isLightDismiss
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        headerText="Select Frac Site"
      >
        <SiteList onDismiss={dismissPanel} />
      </Panel>
    </>
  );
}

export default SidePanelBtn;
