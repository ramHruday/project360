import { ButtonGroup, ToggleButton } from "react-bootstrap";
import "./camera-btn.scss";

function CameraButton(props) {
  return (
    <ButtonGroup
      className="position-absolute shadow"
      style={{ left: "50%", bottom: "2rem", zIndex: 99999 }}
    >
      {["map", "track", "orbit"].map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          // className="rounded-0"
          variant="propetro-red"
          name="radio"
          value={radio}
          checked={props.cameraType === radio}
          onChange={(e) => props.setCameraType(radio)}
        >
          {radio}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export default CameraButton;
