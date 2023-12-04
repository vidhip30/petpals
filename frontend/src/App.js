import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import PetSearchPage from './components/PetSearch';
import { LoginPage } from "./pages/accounts/LoginPage";
import { SignupPage } from "./pages/accounts/SignupPage";
import { PetCreatePage } from "./pages/petListings/PetCreatePage";
import { PageNotFound } from "./pages/misc/PageNotFound";
import { ListSheltersPage } from "./pages/admin/ListSheltersPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="accounts">
            <Route path="signup" element={<SignupPage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
          </Route>

          <Route path="petlistings" element={<PetSearchPage />}></Route>

          <Route path="shelters">
            <Route path="create-pet" element={<PetCreatePage />}></Route>
          </Route>
          <Route path="admin">
            <Route path="shelters" element={<ListSheltersPage />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
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
