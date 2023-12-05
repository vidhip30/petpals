import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/accounts/LoginPage";
import { SignupPage } from "./pages/accounts/SignupPage";
import { PetCreatePage } from "./pages/petListings/PetCreatePage";
import { PetUpdatePage } from "./pages/petListings/PetUpdatePage";
import { PageNotFound } from "./pages/misc/PageNotFound";
import { ListSheltersPage } from "./pages/admin/ListSheltersPage";
import { createContext, useState } from "react";
import { ProtectedRoute } from "./components/authentication/ProtectedRoute";

export const Context = createContext();

function App() {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("accessToken"),
  );

  return (
    <Context.Provider value={{ authenticated, setAuthenticated }}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="accounts">
              <Route path="signup" element={<SignupPage />}></Route>
              <Route path="login" element={<LoginPage />}></Route>
            </Route>
            <Route path="shelters">
              <Route
                path="create-pet"
                element={
              
                    <PetCreatePage />
                  
                }
              ></Route>
              <Route
                path="update-pet"
                element={
                    <PetUpdatePage />
                }
              ></Route>
            </Route>
            <Route path="admin">
              <Route
                path="shelters"
                element={
                  <ProtectedRoute>
                    <ListSheltersPage />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

const Landing = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
