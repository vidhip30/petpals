export const listReports = async (url) => {
  if (url === undefined) {
    url = "http://127.0.0.1:8000/reports/";
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
