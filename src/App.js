import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./pages/header";
import Main from "./pages/main/main";

function App() {
  return (
    <Container fluid className="h-100">
      <Header />
      <Main />
    </Container>
  );
}

export default App;
