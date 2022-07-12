import { Icon } from "@fluentui/react";
import { Html } from "@react-three/drei";
import { BBAnchor } from "../../shared/bb-anchor";
import { PUMPS } from "../../shared/dummy/pumps";
import { UNIT_MAP } from "../../shared/dummy/unit-mapping";

export default function TruckParams({ ...props }) {
  const asset = PUMPS.find((x) => x["Pump Name"] === props.assetId);
  return (
    <>
      <BBAnchor anchor={[1, 1, 0]}>
        <Html>
          {props.isActive &&
          props.node.name === "Body1" &&
          asset["Engine Load"] ? (
            <div className="content">
              <Icon iconName="LightningBolt" />
              {asset["Engine Load"] + UNIT_MAP["Engine Load"]}
            </div>
          ) : null}
        </Html>
      </BBAnchor>
      <BBAnchor anchor={[1, 0, 1]}>
        <Html>
          {props.isActive &&
          props.node.name === "Body11" &&
          asset["Trans Gear"] ? (
            <div className="content">
              <Icon iconName="Settings" />
              {asset["Trans Gear"] + UNIT_MAP["Trans Gear"]}
            </div>
          ) : null}
        </Html>
      </BBAnchor>
      <BBAnchor anchor={[1, 1, 0]}>
        <Html>
          {props.isActive &&
          props.node.name === "Body12" &&
          asset["Calc Horse Power"] ? (
            <div className="content">
              {asset["Calc Horse Power"] + UNIT_MAP["Calc Horse Power"]}
            </div>
          ) : null}
        </Html>
      </BBAnchor>
      <BBAnchor anchor={[0, 0, 0]}>
        <Html>
          {props.isActive &&
          props.node.name === "Body14" &&
          asset["Discharge Pressure"] ? (
            <div className="content">
              <Icon iconName="Drop" />

              {asset["Discharge Pressure"] + UNIT_MAP["Discharge Pressure"]}
            </div>
          ) : null}
        </Html>
      </BBAnchor>
      {props.node.name === "Body1" ? (
        <Html transform top>
          <div className="chassis">
            <img
              src="https://d1io3yog0oux5.cloudfront.net/_095300291fa1e4b626a3ffdcc5fc423f/propetroservices/files/theme/images/header-logo.svg"
              alt="ProPetro logo"
              style={{ width: "3rem" }}
            />
          </div>
        </Html>
      ) : null}
    </>
  );
}
