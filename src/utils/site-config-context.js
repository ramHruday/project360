import React, { useState } from "react";

export const SiteConfigContext = React.createContext();

const defaultTruckConfig = {
  engine: "Body1",
  trans: "Body11",
  fe: "Body12",
  pe: "Body14",
  chassis: "Body1",
};
export const SiteConfigContextProvider = ({ children }) => {
  const [truckConfig, setTruckConfig] = useState(defaultTruckConfig);
  const [isAllSelected, setAllSelected] = useState(null);

  return (
    <SiteConfigContext.Provider
      value={{ truckConfig, setTruckConfig, isAllSelected, setAllSelected }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};
