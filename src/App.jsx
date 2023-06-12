import React, { useState } from "react";
import facade from "./apiFacade";
import LogIn from "./components/LoginForm";
import LoggedIn from "./components/LoggedIn";
import TripForm from "./components/TripForm";
import GuideForm from "./components/GuideForm";
import GetAllGuides from "./components/GetAllGuides";
import { NavLink, Route, Routes } from "react-router-dom";
import AssignToTrips from "./components/AssignToTrips";
import EditTrips from "./components/EditTrips";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("setLoggedIn") || false
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || { username: "", roles: "" }
  );

  const logout = () => {
    facade.logout();
    setUser({ username: "", roles: "" });
    setLoggedIn(false);
    localStorage.removeItem("setLoggedIn");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  const login = (user, pass) => {
    facade.login(user, pass).then(() => {
      const token = facade.readJwtToken(facade.getToken());
      setUser({ username: token.username, roles: token.roles });
      setLoggedIn(true);
      localStorage.setItem("setLoggedIn", true);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: token.username, roles: token.roles })
      );
    });
  };

  const Header = () => {
    const handleLogout = () => {
      logout();
    };

    return (
      <div>
        <ul className="header">
        <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {loggedIn && (
            <>
              {user.roles === "admin" && (
                <>
                  <li>
                    <NavLink to="/guideform">Guide Form</NavLink>
                  </li>
                  <li>
                    <NavLink to="/tripform">Trip Form</NavLink>
                  </li>
                  <li>
                    <NavLink to="/getallguides">All guides</NavLink>
                  </li>
                  <li>
                    <NavLink to="/edittrips">Edit Trip</NavLink>
                  </li>
                </>
              )}
              
          <li>
            <NavLink to="/assigntotrips">Tilmeld trip</NavLink>
          </li>
              <li>
                <NavLink to="/profilepage">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/logout" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <br />
      </div>
    );
  };

  const Home = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>Home</h2>
            {!loggedIn ? (
              <LogIn login={login} />
            ) : (
              <div>
                <h3>Here is your homepage</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Logout = () => {
    return (
      <div>
        <h2>Logout</h2>
        <div>
          <LoggedIn LoggedIn user={user} logout={logout} loggedIn={loggedIn} />
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
         <Route path="/assigntotrips" element={<AssignToTrips  user={user} />} />
        <Route path="/logout" element={<Logout />} />
        {user.roles === "admin" && (
          <>
            <Route path="/guideform" element={<GuideForm />} />
            <Route path="/edittrips" element={<EditTrips />} />
            <Route path="/tripform" element={<TripForm />} />
            <Route path="/getallguides" element={<GetAllGuides />} />
          </>
        )}
        <Route
          path="/profilepage"
          element={<LoggedIn user={user} logout={logout} loggedIn={loggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;