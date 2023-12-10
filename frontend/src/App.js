import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PetDetailPage } from "./pages/petListings/PetDetailPage";
import PetSearchPage from "./pages/search";
import { LoginPage } from "./pages/accounts/LoginPage";
import { SignupPage } from "./pages/accounts/SignupPage";
import { PetCreatePage } from "./pages/petListings/PetCreatePage";
import { PetUpdatePage } from "./pages/petListings/PetUpdatePage";
import { PageNotFound } from "./pages/misc/PageNotFound";
import { ListSheltersPage } from "./pages/admin/ListSheltersPage";
import { createContext } from "react";
import { ProtectedRoute } from "./components/authentication/ProtectedRoute";
import { useAccountsContext } from "./hooks/useAccountsContext";
import { NavBar } from "./components/shared/NavBar";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { ShelterDetailPage } from "./pages/profile/ShelterDetailPage";
import { SeekerDetailPage } from "./pages/profile/SeekerDetailPage";
import { ApplicationDetailPage } from "./pages/applications/ApplicationDetailPage";
import { CreatePage } from "./pages/applications/CreatePage";
import { SeekerUpdateApplicationPage } from "./pages/applications/SeekerUpdateApplicationPage";
import { ShelterUpdateApplicationPage } from "./pages/applications/ShelterUpdateApplicationPage";
import { ApplicationListPage } from "./pages/applications/ApplicationListPage";


export const Context = createContext();

const App = () => {
  return (
    <Context.Provider value={useAccountsContext()}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route element={<NavBar />}>
              <Route index element={<PetSearchPage />} />
              <Route path="pet-listings/:petID" element={<PetDetailPage />} />
              <Route path="shelters">
                <Route
                  path="create-pet"
                  element={
                    <ProtectedRoute>
                      <PetCreatePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="update-pet/:listingId"
                  element={
                    <ProtectedRoute>
                      <PetUpdatePage />
                    </ProtectedRoute>
                  }
                />
                <Route path=":userID" element={<ShelterDetailPage />} />
              </Route>
              <Route path="seekers">
                <Route
                  path=":userID"
                  element={
                    <ProtectedRoute>
                      <SeekerDetailPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
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
              <Route path="applications">
                <Route
                  path="create/:petID"
                  element={
                    <ProtectedRoute>
                      <CreatePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="update/seekers/:applicationID"
                  element={
                      <SeekerUpdateApplicationPage />
                  }
                />
                <Route
                  path="update/shelters/:applicationID"
                  element={
                      <ShelterUpdateApplicationPage />
                  }
                />
                <Route
                  path=":applicationID"
                  element={
                    <ProtectedRoute>
                      <ApplicationDetailPage />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="list"
                  element={
                    <ProtectedRoute>
                      <ApplicationListPage />
                    </ProtectedRoute>
                  }
                ></Route>
              </Route>
            </Route>
            <Route path="accounts">
              <Route path="signup" element={<SignupPage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
