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

export const login = async (payload) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/accounts/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // Parse the response to get the token
      const data = await response.json();
      const token = data.access;

      // Store user data in localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userID", data.user_id);
      localStorage.setItem("userType", data.user_type);
      localStorage.setItem("username", payload["username"]);

      // Return the token or any other relevant data
      return { success: true, token };
    } else {
      // Return the error status and message
      const errorData = await response.json();
      return {
        success: false,
        error: { status: response.status, message: errorData.detail },
      };
    }
  } catch (error) {
    // Handle other issues
    console.error("Login error:", error.message);
    return {
      success: false,
      error: { status: 500, message: "Internal Server Error" },
    };
  }
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

export const listShelters = async (url) => {
  if (url === undefined) {
    url = "http://127.0.0.1:8000/accounts/shelter/";
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return response.json();
};

export const updateUser = async (userID, userType, payload) => {
  const response = await fetch(
    `http://127.0.0.1:8000/accounts/${userType}/${userID}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(payload),
    },
  );

  return response.json();
};

export const updateUserImage = async (userID, userType, payload) => {
  const response = await fetch(
    `http://127.0.0.1:8000/accounts/${userType}/${userID}/`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: payload,
    },
  );

  return response.json();
};

export const getUser = async (userID, userType) => {
  const response = await fetch(
    `http://127.0.0.1:8000/accounts/${userType}/${userID}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  );

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("profile_pic_url", data["profile_image"]);
  }

  data["status"] = response.status;
  return data;
};
