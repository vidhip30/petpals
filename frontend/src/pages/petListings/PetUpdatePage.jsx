import { PetUpdateForm } from "../../components/shelter/PetUpdateForm";
import { useState, useEffect } from "react";
import { getPetListing } from "../../api/shelter";

export const PetUpdatePage = () => {

    const [formInfo, setFormInfo] = useState({
        name: "",
        breed: "",
        size: "",
        gender: "",
        age: 0,
        status: "",
        description: "",
        picture: null,
      });

    const listingId  = 1;
    const fetchInitialPetListing = async () => {
        const response = await getPetListing(listingId);
        const petData = await response.json();
        console.log(petData);
        setFormInfo(petData);
    };
    useEffect(() => {
        fetchInitialPetListing();
        console.log("hi")
    }, []);
    console.log(formInfo);
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
      <PetUpdateForm listingId = {listingId} formInfo = {formInfo} setFormInfo = {setFormInfo}/>
    </>
  );
};