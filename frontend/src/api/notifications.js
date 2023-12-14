export const getNotifications = async (userID, userType, url) => {
  if (url === undefined) {
    url = `http://127.0.0.1:8000/accounts/${userType}/${userID}/notifications/`;
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

export const getFilteredNotifications = async (userID, userType, read) => {
  const response = await fetch(
    `http://127.0.0.1:8000/accounts/${userType}/${userID}/notifications/?read=${read}`,
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

export const updateNotification = async (
  userID,
  userType,
  notifyID,
  payload,
) => {
  const response = await fetch(
    `http://127.0.0.1:8000/accounts/${userType}/${userID}/notifications/${notifyID}/`,
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

export const deleteNotification = async (userID, userType, notifyID) => {
  const response = await fetch(
    `http://127.0.0.1:8000/accounts/${userType}/${userID}/notifications/${notifyID}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  );

  return response;
};

export const createNotification = async (userID, userType, payload) => {
  console.log(userID);

  var url;
  if (userType === "shelter") {
    var url = `http://127.0.0.1:8000/accounts/shelter/${userID}/notifications/`;
  } else {
    var url = `http://127.0.0.1:8000/accounts/seeker/${userID}/notifications/`;
  }

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
        "Failed to fetch account:",
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching account:", error.message);
    return null;
  }
};
