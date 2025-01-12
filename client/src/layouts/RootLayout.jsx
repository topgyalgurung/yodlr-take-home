import { Link, Outlet } from "react-router-dom";
import Signup from "../pages/Signup";
import { useState } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="me-auto">
          Home
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/signup" onClick={toggleNavbar}>
                Signup
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/admin" onClick={toggleNavbar}>
                Admin
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
{
  /* <header>
        <nav>
          <NavLink to="/"> Home</NavLink>
          <NavLink to="signup"> Signup</NavLink>
          <NavLink to="admin">Admin</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}; */
}

export default RootLayout;
