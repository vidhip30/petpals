import { PetUpdateForm } from "../../components/shelter/PetUpdateForm";
import { useState, useEffect } from "react";
import { getPetListing } from "../../api/shelter";
import { useParams } from "react-router";

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

  const { listingId } = useParams();
  const fetchInitialPetListing = async () => {
    const response = await getPetListing(listingId);
    const petData = await response.json();
    setFormInfo(petData);
  };
  useEffect(() => {
    fetchInitialPetListing();
  }, []);
  return (
    <PetUpdateForm
      listingId={listingId}
      formInfo={formInfo}
      setFormInfo={setFormInfo}
    />
  );
};
