import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/header/header";
import Main from "./pages/main/main";

function App() {
  return (
    <Container fluid className="vh-100">
      <Header />
      <Main />
    </Container>
  );
}

export default App;
