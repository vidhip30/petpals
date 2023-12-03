import { PetCreateForm } from "../../components/shelter/PetCreateForm";

export const PetCreatePage = () => {
  return (
    <>
      <div>
        <button
          id="brand-name"
          className="navbar-brand fs-1 text-decoration-none"
        >
          PetPals
        </button>
        <img id="logo" src="/images/paw.png" alt="PetPal logo" width="50px" />
      </div>
      <PetCreateForm />
    </>
  );
};
