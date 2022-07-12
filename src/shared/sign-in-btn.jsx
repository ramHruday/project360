import { useMsal } from "@azure/msal-react";

import { PrimaryButton } from "@fluentui/react/lib/Button";
import { loginRequest } from "../authConfig";

import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  function handleLogin(instance) {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  }
  return (
    <PrimaryButton
      text="Login"
      onClick={() => handleLogin(instance)}
      allowDisabledFocus
    >
      <FontAwesomeIcon icon={faMicrosoft} />
    </PrimaryButton>
  );
};
