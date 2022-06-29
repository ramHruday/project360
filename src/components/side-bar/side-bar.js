import { Stack, Text } from "@fluentui/react";
import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import * as React from "react";
import { CREWS } from "../../shared/dummy/crews";
import "./side-bar.scss";

function SideBar() {
  const [items, setItems] = React.useState(CREWS);

  const onFilterChanged = (text) => {
    setItems(
      CREWS.filter(
        (item) => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
      )
    );
  };

  return (
    <Stack className="side-bar" verticalFill>
      <h3>Sites</h3>

      <SearchBox
        placeholder="Search"
        className="m-2 search-bar"
        onSearch={(newValue) => onFilterChanged(newValue)}
      />

      <div className="side-bar-list overflow-auto">
        {items.map((item) => (
          <div className="p-2">
            <Text className="ms-fontWeight-bold">
              {item.state?.well_name?.data}
            </Text>
            <Persona text={item.name} size={PersonaSize.size24} />
            <Text>{item.state.client?.data}</Text>
          </div>
        ))}
      </div>
    </Stack>
  );
}

export default SideBar;
