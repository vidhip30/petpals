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
