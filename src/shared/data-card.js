import { FontWeights, mergeStyleSets, Modal, Text } from "@fluentui/react";
import { getTheme } from "@fluentui/react/lib/Styling";

import { IconButton } from "@fluentui/react/lib/Button";

function DataCard(props) {
  const theme = getTheme();
  const iconButtonStyles = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: "auto",
      marginTop: "4px",
      marginRight: "2px",
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
  };

  const contentStyles = mergeStyleSets({
    container: {
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "stretch",
    },
    header: [
      {
        flex: "1 1 auto",
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: "flex",
        alignItems: "center",
        fontWeight: FontWeights.semibold,
        padding: "12px 12px 14px 24px",
      },
    ],
    body: {
      flex: "4 4 auto",
      padding: "0 24px 24px 24px",
      overflowY: "hidden",
      selectors: {
        p: { margin: "14px 0" },
        "p:first-child": { marginTop: 0 },
        "p:last-child": { marginBottom: 0 },
      },
    },
  });

  return (
    <Modal
      isOpen={props.openModal}
      isModeless
      isBlocking
      dragOptions
      className="data-card modeless-modal"
    >
      <div className={contentStyles.header}>
        <div>Pump Stats</div>
        <IconButton
          styles={iconButtonStyles}
          iconProps={{ iconName: "cancel" }}
          ariaLabel="Close popup modal"
          onClick={props.hideModal}
        />
      </div>
      <div className={contentStyles.body}>
        <Text>{props.assetId}</Text>
      </div>
    </Modal>
  );
}

export default DataCard;
