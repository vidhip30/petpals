export const getApplication = async (applicationID) => {
  const response = await fetch(
    `http://127.0.0.1:8000/pet_listings/applications/${applicationID}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
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
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching pet listing:", error.message);
    return null;
  }
};

export const getPetListingID = async (applicationID) => {
  const url = `http://127.0.0.1:8000/pet_listings/applications/${applicationID}/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      const applicationData = await response.json();

      const petID = applicationData.pet_listing;
      return petID;
    } else {
      console.error(
        "Failed to fetch application:",
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching application:", error.message);
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
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching pet listing:", error.message);
    return null;
  }
};

export const fetchPetDetails = async (applicationID) => {
  const application = await getApplication(applicationID);
  const listingID = application.pet_listing;
  const url = `http://127.0.0.1:8000/petlistings/${listingID}/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status with pet details: ${response.status}`
      );
    }

    if (response.ok) {
      const data = await response.json();
      const shelterID = data.shelter;
      const userID = data.user;
      // Call getShelterName to get shelter details
      const shelterData = await getShelterName(shelterID);

      // Extract shelter name from the shelterData
      const shelterName = shelterData.name;
      return {
        picture: data.picture,
        name: data.name,
        gender: data.gender,
        shelterName: shelterName,
        shelter: shelterID,
        breed: data.breed,
        size: data.size,
        age: data.age,
        user: shelterID,
      };
    }
  } catch (error) {
    console.error("Error fetching pet details:", error);
  }
};

const getShelterName = async (shelterID) => {
  const response = await fetch(
    `http://127.0.0.1:8000/accounts/shelter/${shelterID}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  return response.json();
};

export const listApplications = async (searchStatus, sortBy, url) => {
  if (url === undefined) {
    url = `http://127.0.0.1:8000/applications/?status=${searchStatus}&sort_by=${sortBy}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error with list applications", error);
    return "";
  }
};

export const updateApplication = async (applicationID, payload) => {
  const url = `http://127.0.0.1:8000/applications/${applicationID}/`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
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
        "Failed to fetch application",
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching application:", error.message);
    return null;
  }
};
