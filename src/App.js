import { Stack } from "@fluentui/react";
import "./App.scss";
import { ProfileContextProvider } from "./auth/profile-context";
import Header from "./components/header/header";
import Main from "./pages/main/main";
import { SiteConfigContextProvider } from "./utils/site-config-context";

function App() {
  return (
    <SiteConfigContextProvider>
      <ProfileContextProvider disablePopup>
        <div className="app">
          <Stack verticalFill>
            <Stack.Item>
              <Header />
            </Stack.Item>
            <Stack.Item verticalFill>
              <Main />
            </Stack.Item>
          </Stack>
        </div>
      </ProfileContextProvider>
    </SiteConfigContextProvider>
  );
}

export default App;
