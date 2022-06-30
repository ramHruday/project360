import { useMsal } from "@azure/msal-react";
import {
  DefaultButton,
  Icon,
  Persona,
  PersonaSize,
  Stack,
} from "@fluentui/react";

export const SignOutButton = () => {
  const { instance, accounts } = useMsal();
  function handleLogout(instance) {
    instance.logoutPopup().catch((e) => {
      console.error(e);
    });
  }

  return (
    <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
      <DefaultButton
        className="ml-auto ms-hiddenLgDown"
        onClick={() => handleLogout(instance)}
      >
        Sign out
      </DefaultButton>

      <Icon
        className="ms-hiddenMdUp"
        onClick={() => handleLogout(instance)}
        iconName="SignOut"
      ></Icon>
      {accounts[0] ? (
        <Persona
          className="px-2"
          text={accounts[0]?.name}
          size={PersonaSize.size24}
          hidePersonaDetails
        />
      ) : null}
    </Stack>
  );
};
