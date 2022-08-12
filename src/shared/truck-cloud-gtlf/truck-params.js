import { Icon } from "@fluentui/react";
import { BBAnchor as DreiBBAnchor, Html } from "@react-three/drei";
import { DEFAULT_TRUCK_CONFIG } from "../../config/constants";
import { UNIT_MAP } from "../../config/unit-mapping";
import { BBAnchor } from "../bb-anchor";

export default function TruckParams({ ...props }) {
  // const {
  const { engine, trans, pe, fe, chassis } = DEFAULT_TRUCK_CONFIG;
  //   isAllSelected,
  // } = useContext(SiteConfigContext);
  // console.log(engine === props.node.name && props.pump["Engine Load"]);
  // console.log(props.pump["Pump Rate"], props.pump["Pump Position"]);
  return (
    <>
      {props.node.name === engine && props.pump["Engine Load"] ? (
        <BBAnchor anchor={[0, 0, 0]}>
          <Html>
            <div className="content">
              <Icon iconName="LightningBolt" />
              {props.pump["Engine Load"].toFixed(1) + UNIT_MAP["Engine Load"]}
            </div>
          </Html>
        </BBAnchor>
      ) : null}
      {props.node.name === trans && props.pump["Trans Gear"] ? (
        <DreiBBAnchor anchor={[1, 1, 1]}>
          <Html>
            <div className="content">
              <Icon iconName="Settings" />
              {props.pump["Trans Gear"].toFixed(1) + UNIT_MAP["Trans Gear"]}
            </div>
          </Html>
        </DreiBBAnchor>
      ) : null}
      {props.node.name === fe && props.pump["Horse Power"] ? (
        <BBAnchor anchor={[0, 0, 0]}>
          <Html>
            <div className="content">
              {props.pump["Horse Power"].toFixed(1) +
                UNIT_MAP["Calc Horse Power"]}
            </div>
          </Html>
        </BBAnchor>
      ) : null}
      {props.node.name === pe && props.pump["Pump Rate"] ? (
        <BBAnchor anchor={[0, 0, 0]}>
          <Html>
            <div className="content">
              <Icon iconName="Drop" />

              {props.pump["Pump Rate"].toFixed(1) + UNIT_MAP["Pump Rate"]}
            </div>
          </Html>
        </BBAnchor>
      ) : null}
      {props.node.name === chassis ? (
        <BBAnchor anchor={[0, 0, 0]}>
          <Html>
            <div className="chassis-content">{props.pump["Pump Position"]}</div>
          </Html>
        </BBAnchor>
      ) : null}
    </>
  );
}
