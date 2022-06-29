import { Stack } from "@fluentui/react";
import "./App.scss";
import Header from "./components/header/header";
import Main from "./pages/main/main";

function App() {
  return (
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
  );
}

export default App;
