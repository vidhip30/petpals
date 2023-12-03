export const createPetListing = async (payload) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzkxNjUxLCJpYXQiOjE3MDE2MzE2NTEsImp0aSI6IjcwZDIwZWY5YmYzNzQwYjI5NmI3NGQyMzIwMjQzODM3IiwidXNlcl9pZCI6MX0.1m_QV7blzDpOzgO8YP8WqJf1OxLkhK1eeiv35Yel0r4";

  const response = await fetch("http://127.0.0.1:8000/shelters/petlistings/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload,
  });

  return response;
};
