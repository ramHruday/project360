import { IconButton } from "@fluentui/react";

function ExpandBtn(props) {
  return (
    <div
      className="position-absolute card p-2 ms-hiddenLgDown"
      style={{
        top: "45%",
        left: props.showSideBar ? "16.5%" : "1rem",
        zIndex: 999999,
      }}
    >
      <IconButton
        className="text-neutralPrimary bg-themeLighterAlt"
        iconProps={{
          iconName: props.showSideBar
            ? "MiniExpandMirrored"
            : "CollapseContentSingle",
        }}
        onClick={() => props.setShowSideBar(!props.showSideBar)}
        text="Back to Frac site"
      />
    </div>
  );
}

export default ExpandBtn;
