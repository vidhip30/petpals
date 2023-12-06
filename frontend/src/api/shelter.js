export const createPetListing = async (payload) => {
  const response = await fetch("http://127.0.0.1:8000/shelters/petlistings/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: payload,
  });
  console.log(response);
  return response;
};

export const updatePetListing = async (listingId, payload) =>{
  const response = await fetch(`http://127.0.0.1:8000/shelters/petlistings/${listingId}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: payload,
  });


  return response;
}

export const getPetListing = async (listingId) =>{
  const response = await fetch(`http://127.0.0.1:8000/shelters/petlistings/${listingId}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  console.log(response);
  return response;
}


