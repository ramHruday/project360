import { Modal, Text } from "@fluentui/react";

function DataCard(props) {
  return props.assetId ? (
    <Modal
      isOpen={true}
      isModeless={true}
      dragOptions={true}
      className="data-card position-absolute"
      style={{ bottom: "5%", right: "2%", zIndex: 9999 }}
    >
      <Text>{props.assetId}</Text>
    </Modal>
  ) : null;
}

export default DataCard;
