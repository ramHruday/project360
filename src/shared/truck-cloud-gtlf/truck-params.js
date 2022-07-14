import { Icon } from "@fluentui/react";
import { Html } from "@react-three/drei";
import { DEFAULT_TRUCK_CONFIG } from "../../config/constants";
import { PUMPS } from "../../config/pumps";
import { UNIT_MAP } from "../../config/unit-mapping";
import { BBAnchor } from "../bb-anchor";

export default function TruckParams({ ...props }) {
  const asset = PUMPS.find((x) => x["Pump Name"] === props.assetId);
  // const {
  const { engine, chassis, trans, pe, fe } = DEFAULT_TRUCK_CONFIG;
  //   isAllSelected,
  // } = useContext(SiteConfigContext);
  // console.log(isAllSelected, engine);

  return (
    <>
      <BBAnchor anchor={[1, 1, 0]}>
        <Html>
          {props.isActive &&
          props.node.name === engine &&
          asset["Engine Load"] ? (
            <div className="content">
              <Icon iconName="LightningBolt" />
              {asset["Engine Load"] + UNIT_MAP["Engine Load"]}
            </div>
          ) : null}
        </Html>{" "}
      </BBAnchor>
      <BBAnchor anchor={[1, 0, 1]}>
        <Html>
          {props.isActive &&
          props.node.name === trans &&
          asset["Trans Gear"] ? (
            <div className="content">
              <Icon iconName="Settings" />
              {asset["Trans Gear"] + UNIT_MAP["Trans Gear"]}
            </div>
          ) : null}
        </Html>{" "}
      </BBAnchor>
      <BBAnchor anchor={[1, 1, 0]}>
        <Html>
          {props.isActive &&
          props.node.name === fe &&
          asset["Calc Horse Power"] ? (
            <div className="content">
              {asset["Calc Horse Power"] + UNIT_MAP["Calc Horse Power"]}
            </div>
          ) : null}
        </Html>{" "}
      </BBAnchor>
      <BBAnchor anchor={[0, 0, 0]}>
        <Html>
          {props.isActive &&
          props.node.name === pe &&
          asset["Discharge Pressure"] ? (
            <div className="content">
              <Icon iconName="Drop" />

              {asset["Discharge Pressure"] + UNIT_MAP["Discharge Pressure"]}
            </div>
          ) : null}
        </Html>{" "}
      </BBAnchor>
      {props.node.name === chassis ? (
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
