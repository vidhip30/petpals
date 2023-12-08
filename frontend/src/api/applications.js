export const getApplication = async (applicationID) => {
  const response = await fetch(
    `http://127.0.0.1:8000/pet_listings/applications/${applicationID}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  );

  return response.json();
};

export const getPetListingName = async (listingId) => {
  const url = `http://127.0.0.1:8000/petlistings/${listingId}/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      const petData = await response.json();

      const petName = petData.name;

      return petName;
    } else {
      console.error(
        "Failed to fetch pet listing:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching pet listing:", error.message);
    return null;
  }
};

export const createApplication = async (listingID, payload) => {
  const url = `http://127.0.0.1:8000/pet_listings/${listingID}/applications/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return response;
    } else {
      console.error(
        "Failed to fetch pet listing:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching pet listing:", error.message);
    return null;
  }
};
