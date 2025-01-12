import { NavLink, Outlet } from "react-router-dom";
// import RootLayout from "../layouts/RootLayout";
const Home = () => {
  return (
    <div>
      {/* <RootLayout /> */}
      <h1>Yodlr Design Challenge</h1>
      <p>
        <nav>
          <NavLink to="signup"> Registration Page</NavLink>
          <NavLink to="admin">Admin Page</NavLink>
        </nav>
        <Outlet />
        {/* <a href="/signup.html">Registration Page</a>
        <br />
        <a href="/admin.html">Admin Page</a> */}
      </p>
    </div>
  );
};

export default Home;
