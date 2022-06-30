import { useMsal } from "@azure/msal-react";
import React, { useEffect, useState } from "react";
import { callApiWithToken } from "../api/fetch";
import { loginRequest } from "../authConfig";
import { callMsGraph } from "./graph";

export const ProfileContext = React.createContext(null);

export const ProfileContextProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );

        callApiWithToken(
          response.accessToken,
          "https://propetro.intelie.com/rest/settings/download"
        );
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        });
      });
  }, [accounts, instance]);

  return (
    <ProfileContext.Provider value={{ graphData }}>
      {children}
    </ProfileContext.Provider>
  );
};
