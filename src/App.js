import { Stack } from "@fluentui/react";
import "./App.scss";
import { ProfileContextProvider } from "./auth/profile-context";
import Header from "./components/header/header";
import Main from "./pages/main/main";

function App() {
  return (
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
  );
}

export default App;
