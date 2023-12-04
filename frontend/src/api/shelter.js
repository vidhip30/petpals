export const createPetListing = async (payload) => {
  const response = await fetch("http://127.0.0.1:8000/shelters/petlistings/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: payload,
  });

  return response;
};
