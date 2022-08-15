import { Stack } from "@fluentui/react";
import { useGLTF } from "@react-three/drei";
import "./App.scss";
import { ProfileContextProvider } from "./auth/profile-context";
import Header from "./components/header/header";
import { MODELS } from "./config/azure-gltf";
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
Object.entries(MODELS).forEach((x) => useGLTF.preload(x));
