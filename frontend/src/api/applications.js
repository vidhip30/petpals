export const getApplication = async (applicationID) => {
  const response = await fetch(
    `http://127.0.0.1:8000/pet_listings/applications/${applicationID}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA0Mzk2MDA0LCJpYXQiOjE3MDIyMzYwMDQsImp0aSI6ImZjNWNhNTk5NGI3MjQ3YjViZDYwYjA3ZTA1MTMxY2ZiIiwidXNlcl9pZCI6NH0.TdAEluWsh7NMS5iXxhUH1zDs3DdkaWC-SkmbusToT_4`,
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzQxMzYxLCJpYXQiOjE3MDE1ODEzNjEsImp0aSI6IjU4NGMxZGVjZGZlNjQ1MjY5Yzg4NDgzYjdjZmJjODZjIiwidXNlcl9pZCI6MX0.3viiz2gssHrK9OV57yekc1Q5E7SNhF-Ru-N7nWFjRco`,
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzQxMzYxLCJpYXQiOjE3MDE1ODEzNjEsImp0aSI6IjU4NGMxZGVjZGZlNjQ1MjY5Yzg4NDgzYjdjZmJjODZjIiwidXNlcl9pZCI6MX0.3viiz2gssHrK9OV57yekc1Q5E7SNhF-Ru-N7nWFjRco`,
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

export const updateApplication = async (applicationID, payload) => {
  const url = `http://127.0.0.1:8000/applications/${applicationID}/`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA0Mzk2MDA0LCJpYXQiOjE3MDIyMzYwMDQsImp0aSI6ImZjNWNhNTk5NGI3MjQ3YjViZDYwYjA3ZTA1MTMxY2ZiIiwidXNlcl9pZCI6NH0.TdAEluWsh7NMS5iXxhUH1zDs3DdkaWC-SkmbusToT_4`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return response;
    } else {
      console.error(
        "Failed to fetch application",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching application:", error.message);
    return null;
  }
};

