import { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuItems : string[] = ['Home', 'Favorites', 'About'];
  const [query, setQuery] = useState('');
  const location = useLocation();
const navigate = useNavigate();

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();

  const trimmed = query.trim();
  const params = new URLSearchParams(location.search);

  if (trimmed) {
    params.set("searchTerm", trimmed);
  } else {
    params.delete("searchTerm");
  }

  navigate(`${location.pathname}?${params.toString()}`);
};

    return <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid px-3">
  <a className="navbar-brand" href="#">Movies React</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"             aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
        {menuItems.map((item, index) => 
            (<li key={index} className={selectedIndex === index ? "nav-item active" : "nav-item" }>
            <Link className="nav-link" to={`/${item.toLowerCase()}`} onClick={() => setSelectedIndex(index)}>{item}</Link>
            </li>))}
    </ul>
  </div>
  <Form onSubmit={handleSearch}>
  <Row className="align-items-center">
    <Col xs="auto">
      <Form.Control
        type="text"
        placeholder="Search Movies"
        className="me-sm-2"  // use 'me-sm-2' (margin-end) instead of 'mr-sm-2' for Bootstrap 5
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </Col>
    <Col xs="auto">
      <Button type="submit" variant="outline-primary">Search</Button>
    </Col>
  </Row>
</Form>
</div>
</nav>
    </>;
}

export default Navbar;