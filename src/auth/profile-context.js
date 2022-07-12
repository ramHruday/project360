import { useMsal } from "@azure/msal-react";
import React, { useEffect, useState } from "react";
import { loginRequest } from "../authConfig";
import { callMsGraph } from "./graph";

export const ProfileContext = React.createContext(null);

export const ProfileContextProvider = ({ children, disablePopup }) => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    if (!disablePopup) {
      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance
        .acquireTokenSilent(request)
        .then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        })
        .catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
            callMsGraph(response.accessToken).then((response) =>
              setGraphData(response)
            );
          });
        });
    }
  }, [accounts, disablePopup, instance]);

  return (
    <ProfileContext.Provider value={{ graphData }}>
      {children}
    </ProfileContext.Provider>
  );
};
