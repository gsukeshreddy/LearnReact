import { useEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuItems : string[] = ['Home', 'Favorites', 'About'];
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const index = menuItems.findIndex(item =>
        location.pathname.toLowerCase().includes(item.toLowerCase())
    );
    setSelectedIndex(index === -1 ? 0 : index);
  }, [location.pathname]);

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

const handleClearSearch = () => {
  setQuery('');
  const params = new URLSearchParams(location.search);
  params.delete("searchTerm");

  navigate(`${location.pathname}?${params.toString()}`);
};

    return <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid px-3">
  <a className="navbar-brand" href="#" style={{color: "dodgerblue" }}>MovieFlix</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"             aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto">  {/* use me-auto for Bootstrap 5 */}
  {menuItems.map((item, index) => (
    <li key={index} className={`nav-item ${selectedIndex === index ? 'fw-bold' : ''}`}>
      <Link className={`nav-link ${selectedIndex === index ? 'active' : ''}`}
        to={`/${item.toLowerCase()}`}
        onClick={() => setSelectedIndex(index)}
      >
        {item}
      </Link>
    </li>
  ))}
</ul>
  </div>
<Form onSubmit={handleSearch}>
  <Row className="align-items-center">
    <Col xs="auto" className="position-relative">
    <Form.Control
        type="text"
        placeholder="Search Movies"
        className="me-sm-2 pe-5" // pe-5 adds padding-end so the X doesn't overlap text
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
            <button
                type="button"
                onClick={handleClearSearch}
                className="position-absolute end-0 top-50 translate-middle-y me-4 p-0 border-0 bg-transparent"
                style={{ fontSize: '1.2rem', lineHeight: 1, color: '#888', cursor: 'pointer' }}
                aria-label="Clear search"
                >
                X
            </button>
        )}
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