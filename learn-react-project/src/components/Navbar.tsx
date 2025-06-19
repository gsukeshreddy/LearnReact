import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuItems : string[] = ['Home', 'Favorites', 'About'];
    
    return <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">ReactLearn</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"             aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
        {menuItems.map((item, index) => 
            (<li className={selectedIndex === index ? "nav-item active" : "nav-item" }>
            <Link className="nav-link" to={`/${item.toLowerCase()}`} onClick={() => setSelectedIndex(index)}>{item}</Link>
            </li>))}
    </ul>
  </div>
</nav>
    </>;
}

export default Navbar;