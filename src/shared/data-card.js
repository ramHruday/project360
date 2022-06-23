import { Card } from "react-bootstrap";

function DataCard(props) {
  console.log(props.assetId);
  return props.assetId ? (
    <Card
      draggable="true"
      className="data-card position-absolute"
      style={{ bottom: "2%", right: 10, zIndex: 9999 }}
    >
      <Card.Header as="h5">Stats</Card.Header>
      <Card.Body>
        <Card.Title>Frac pump {props.assetId}</Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  ) : null;
}

export default DataCard;
