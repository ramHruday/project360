import { DefaultButton, Stack } from "@fluentui/react";

import "./camera-btn.scss";

function CameraButton(props) {
  const options = [
    { key: "map", text: "Map", iconProps: { iconName: "HandsFree" } },
    { key: "track", text: "Track", iconProps: { iconName: "Video360Generic" } },
    { key: "orbit", text: "Orbit", iconProps: { iconName: "Add" } },
  ];
  return (
    <div
      className="position-absolute"
      style={{ left: "35%", bottom: "1.5rem", zIndex: 99999 }}
    >
      <Stack horizontal>
        {options.map((op) => (
          <DefaultButton
            className="bg-themeLighter"
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
