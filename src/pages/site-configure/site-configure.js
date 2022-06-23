import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SiteMap from "../../components/site-map/site-map";
import DataCard from "../../shared/data-card";

function SiteConfigure() {
  const [cameraType, setCameraType] = useState("map");
  const [selected, setSelected] = useState(null);
  return (
    <Row md={4} className="site-configure-page px-1 pb-2">
      <Col className="d-sm-none d-md-flex" md={2}></Col>
      <Col xs="12" md="10" className="p-0">
        <SiteMap
          cameraType={cameraType}
          setCameraType={setCameraType}
          selected={selected}
          setSelected={setSelected}
        />
        <DataCard assetId={selected} />
      </Col>
    </Row>
  );
}

export default SiteConfigure;
