import { createNotification } from "./notifications";

export const createComment = async (
  modelID,
  payload,
  commentType,
  seeker,
  shelter,
) => {
  var url;
  if (commentType === "application") {
    var url = `http://127.0.0.1:8000/comments/application/${modelID}/`;
  } else {
    var url = `http://127.0.0.1:8000/comments/shelters/${modelID}/`;
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
      var userType = localStorage.getItem("userType");

      if (userType === "shelter" && commentType == "application") {
        payload = {
          text: "New comment on your application",
        };

        createNotification(seeker, "seeker", payload);
      } else {
        if (commentType === "application") {
          payload = {
            text: "New comment on an application",
          };
        } else {
          payload = {
            text: "New comment on your shelter",
          };
        }

        createNotification(shelter, "shelter", payload);
      }
      return response;
    } else {
      console.error(
        "Failed to fetch object:",
        response.status,
        response.statusText,
        payload,
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching object:", error.message);
    return null;
  }
};
