import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PetSearchPage from "./pages/search";
import { LoginPage } from "./pages/accounts/LoginPage";
import { SignupPage } from "./pages/accounts/SignupPage";
import { PetCreatePage } from "./pages/petListings/PetCreatePage";
import { PageNotFound } from "./pages/misc/PageNotFound";
import { ListSheltersPage } from "./pages/admin/ListSheltersPage";
import { createContext } from "react";
import { ProtectedRoute } from "./components/authentication/ProtectedRoute";
import { useAccountsContext } from "./hooks/useAccountsContext";
import { NavBar } from "./components/shared/NavBar";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { ShelterDetailPage } from "./pages/profile/ShelterDetailPage";
import { SeekerDetailPage } from "./pages/profile/SeekerDetailPage";

export const Context = createContext();

function App() {
  return (
    <Context.Provider value={useAccountsContext()}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="accounts">
              <Route path="signup" element={<SignupPage />}></Route>
              <Route path="login" element={<LoginPage />}></Route>
            </Route>
            <Route element={<NavBar />}>
              <Route path="petlistings" element={<PetSearchPage />}></Route>
              <Route path="shelters">
                <Route
                  path="create-pet"
                  element={
                    <ProtectedRoute>
                      <PetCreatePage />
                    </ProtectedRoute>
                  }
                />
                <Route path=":userID" element={<ShelterDetailPage />} />
              </Route>
              <Route path="seekers">
                <Route path=":userID" element={<SeekerDetailPage />} />
              </Route>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="admin">
                <Route
                  path="shelters"
                  element={
                    <ProtectedRoute>
                      <ListSheltersPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
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
