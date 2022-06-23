import { Container, Nav, Navbar, Row } from "react-bootstrap";
import "./header.css";

function Header() {
  return (
    <Navbar as={Row} bg="light" expand="lg" className="shadow navbar-header">
      <Container fluid className="d-flex justify-content-lg-between">
        <Navbar.Brand
          href="https://www.propetroservices.com/"
          className="d-flex"
        >
          <img
            src="https://d1io3yog0oux5.cloudfront.net/_095300291fa1e4b626a3ffdcc5fc423f/propetroservices/files/theme/images/header-logo.svg"
            className="d-inline-block align-top"
            alt="ProPetro logo"
            height="15px"
          />
        </Navbar.Brand>
        <Nav className="justify-content-end flex-row" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Site 360</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Configure</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
