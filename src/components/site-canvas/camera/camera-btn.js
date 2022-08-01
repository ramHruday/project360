import { DefaultButton, Stack } from "@fluentui/react";
import classNames from "classnames";

import "./camera-btn.scss";

function CameraButton(props) {
  const options = [
    { key: "map", text: "Map", iconProps: { iconName: "HandsFree" } },
    // { key: "track", text: "Track", iconProps: { iconName: "Video360Generic" } },
    { key: "orbit", text: "Orbit", iconProps: { iconName: "Add" } },
  ];
  return (
    <div className="position-absolute camera-toggle-btn">
      <Stack horizontal>
        {options.map((op) => (
          <DefaultButton
            key={op.key}
            className={classNames("bg-themeLighter", {
              active: props.cameraType === op.key,
            })}
            toggle
            checked={props.cameraType === op.key}
            iconProps={op.iconProps}
            onClick={(e) => props.setCameraType(op.key)}
          >
            <span className="ms-hiddenLgDown">{op.text}</span>
          </DefaultButton>
        ))}
      </Stack>
    </div>
  );
}

export default CameraButton;
