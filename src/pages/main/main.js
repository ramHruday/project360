import { useState } from "react";
import { ButtonGroup, Col, Row, ToggleButton } from "react-bootstrap";
import "./main.css";
import SideBar from "./side-bar";
import SiteMap from "./site-map";

function Main() {
  const [cameraType, setCameraType] = useState("map");
  return (
    <Row md={4} className="main vh-100">
      <Col className="d-sm-none d-md-flex" md={2}>
        <SideBar />
      </Col>
      <Col xs="12" md="10" className="p-0">
        <ButtonGroup
          className="position-absolute shadow"
          style={{ right: 10, top: 10, zIndex: 99999 }}
        >
          {["map", "track", "orbit"].map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="dark"
              name="radio"
              value={radio}
              checked={cameraType === radio}
              onChange={(e) => setCameraType(radio)}
            >
              {radio}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <SiteMap cameraType={cameraType} />
      </Col>
    </Row>
  );
}

export default Main;
