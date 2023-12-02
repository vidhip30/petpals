export const registerPetSeeker = async (payload) => {
  const response = await fetch("http://127.0.0.1:8000/accounts/seeker/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
};

export const registerShelter = async (payload) => {
  const response = await fetch("http://127.0.0.1:8000/accounts/shelter/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
};
