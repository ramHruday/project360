import ListGroup from "react-bootstrap/ListGroup";

function SideBar() {
  return (
    <div className="side-bar w-100">
      <h2>Sites</h2>
      <ListGroup variant="flush">
        <ListGroup.Item action>Frac Site 1</ListGroup.Item>
        <ListGroup.Item action>Frac Site 2</ListGroup.Item>
        <ListGroup.Item action>Frac Site 3</ListGroup.Item>
        <ListGroup.Item action>Frac Site 4</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default SideBar;
