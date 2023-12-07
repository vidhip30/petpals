import { LoginForm } from "../../components/accounts/login/LoginForm";

export const LoginPage = () => {
  return (
    <div id="account-container">
      <div id="brand-container">
        <img id="logo" src="/images/paw.png" alt="PetPal logo" width="50px" />
        <button
          id="brand-name-accounts"
          className="navbar-brand fs-1 text-decoration-none"
        >
          PetPals
        </button>
      </div>
      <LoginForm />
    </div>
  );
};
