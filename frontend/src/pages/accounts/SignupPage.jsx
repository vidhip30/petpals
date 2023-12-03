import { SignupForm } from "../../components/accounts/signup/SignupForm";

export const SignupPage = () => {
  return (
    <>
      <div id="brand-container">
        <img id="logo" src="/images/paw.png" alt="PetPal logo" width="50px" />
        <button
          id="brand-name"
          className="navbar-brand fs-1 text-decoration-none"
        >
          PetPals
        </button>
      </div>
      <SignupForm />
    </>
  );
};
