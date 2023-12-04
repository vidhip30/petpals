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
