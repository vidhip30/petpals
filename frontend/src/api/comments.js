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

export const listComments = async (commentType, modelID, url) => {
  
  if (url === undefined){
    if (commentType === "application") {
      url = `http://127.0.0.1:8000/comments/application/${modelID}/`;
    } else {
      url = `http://127.0.0.1:8000/comments/shelters/${modelID}/`;
    }
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  
    if (response.ok) {
      // Process the response when it is successful
      // For example, parse the JSON response or do something with the data
      const data = await response.json();
      console.log("Successful response:", data);
      return data;
    } else {
      // Handle the case when the response is not okay (e.g., status code is not in the 200 range)
      console.error("Response not okay:", response.status, response.statusText);
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching object:", error.message);
    return null;
  }

};
