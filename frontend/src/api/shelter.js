export const createPetListing = async (payload) => {
  const response = await fetch("http://127.0.0.1:8000/shelters/petlistings/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: payload,
  });
  console.log(response);
  return response;
};

export const updatePetListing = async (listingId, payload) =>{
  const response = await fetch(`http://127.0.0.1:8000/shelters/petlistings/${listingId}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzQxMzYxLCJpYXQiOjE3MDE1ODEzNjEsImp0aSI6IjU4NGMxZGVjZGZlNjQ1MjY5Yzg4NDgzYjdjZmJjODZjIiwidXNlcl9pZCI6MX0.3viiz2gssHrK9OV57yekc1Q5E7SNhF-Ru-N7nWFjRco`,
    },
    body: payload,
  });


  return response;
}

export const getPetListing = async (listingId) =>{
  const response = await fetch(`http://127.0.0.1:8000/shelters/petlistings/${listingId}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzQxMzYxLCJpYXQiOjE3MDE1ODEzNjEsImp0aSI6IjU4NGMxZGVjZGZlNjQ1MjY5Yzg4NDgzYjdjZmJjODZjIiwidXNlcl9pZCI6MX0.3viiz2gssHrK9OV57yekc1Q5E7SNhF-Ru-N7nWFjRco`,
    },
  });
  return response;
}


