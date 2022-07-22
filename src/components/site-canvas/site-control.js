import { Leva, useControls } from "leva";

function SiteControls(props) {
  const activePumps = useControls(props.pump_id, {
    show: props.show,
    active: props.selected,
  });

  return <Leva fill />;
}

export default SiteControls;
