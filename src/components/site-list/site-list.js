import * as React from "react";

import { Text } from "@fluentui/react";

import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import { SearchBox } from "@fluentui/react/lib/SearchBox";

import classNames from "classnames";
import { CREWS } from "../../config/crews";
import "./site-list.scss";

function SiteList(props) {
  const [items, setItems] = React.useState(CREWS);

  const onFilterChanged = (text) => {
    setItems(
      CREWS.filter(
        (item) => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
      )
    );
  };
  return (
    <>
      <SearchBox
        placeholder="Search"
        className="m-2 search-bar"
        onSearch={(newValue) => onFilterChanged(newValue)}
      />

      <div className="side-bar-list overflow-auto pb-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={classNames(
              "p-2 ms-depth-4 cursor-pointer side-bar-list-item m-1",
              { disable: !item.isActive }
            )}
            onClick={() => (item.isActive ? props.onDismiss?.() : null)}
          >
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
    </>
  );
}

export default SiteList;
