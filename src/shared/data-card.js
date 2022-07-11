import { FontWeights, mergeStyleSets, Modal, Text } from "@fluentui/react";
import { getTheme } from "@fluentui/react/lib/Styling";

import { IconButton } from "@fluentui/react/lib/Button";
import { HIDE_KEYS } from "./dummy/hide-keys";
import { PUMPS } from "./dummy/pumps";
import { UNIT_MAP } from "./dummy/unit-mapping";

function DataCard(props) {
  const asset = PUMPS.find((x) => x["Pump Name"] === props.assetId);
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
        <div>
          Pump Stats{" "}
          <span className="text-themePrimary mx-1">{props.assetId}</span>
        </div>
        <IconButton
          styles={iconButtonStyles}
          iconProps={{ iconName: "cancel" }}
          ariaLabel="Close popup modal"
          onClick={props.hideModal}
        />
      </div>
      {asset ? (
        <div className={contentStyles.body}>
          {Object.entries(asset)
            .filter((x) => !!x[1] && !HIDE_KEYS.includes(x[0]))
            .map((e, i) => (
              <Text key={i} block variant="small">
                <span className="ms-fontWeight-bold">{e[0]} </span> : {e[1]}{" "}
                {UNIT_MAP[e[0]]}
              </Text>
            ))}
        </div>
      ) : null}
    </Modal>
  );
}

export default DataCard;
