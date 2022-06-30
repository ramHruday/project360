import { useMsal } from "@azure/msal-react";
import { DefaultButton, Persona, PersonaSize, Stack } from "@fluentui/react";
import { useContext } from "react";
import { ProfileContext } from "../auth/profile-context";

function handleLogout(instance) {
  instance.logoutPopup().catch((e) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
  const { instance, accounts } = useMsal();
  const { graphData } = useContext(ProfileContext);
  console.log(accounts);

  return (
    <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
      <DefaultButton
        className="ml-auto hiddenLgDown"
        onClick={() => handleLogout(instance)}
      >
        Sign out
      </DefaultButton>
      <Persona
        className="px-2"
        text={accounts[0].name}
        size={PersonaSize.size24}
        hidePersonaDetails
      />
    </Stack>
  );
};
