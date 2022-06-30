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
      <h3 className="px-2">Sites</h3>

      <SearchBox
        placeholder="Search"
        className="m-2 search-bar"
        onSearch={(newValue) => onFilterChanged(newValue)}
      />

      <div className="side-bar-list overflow-overlay">
        {items.map((item) => (
          <div className="p-2 ms-depth-16 cursor-pointer side-bar-list-item m-1">
            <p className="ms-fontWeight-bold">
              {item.state?.well_name?.data || "Not available (N/A)"}
            </p>
            <Persona
              text={item.name}
              className="mb-2"
              size={PersonaSize.size24}
            />
            <span className="ms-fontWeight-semibold">Client: </span>
            <Text>{item.state.client?.data || "Not available (N/A)"}</Text>
          </div>
        ))}
      </div>
    </Stack>
  );
}

export default SideBar;
