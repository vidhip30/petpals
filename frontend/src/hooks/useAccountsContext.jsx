export const useAccountsContext = () => {
  const authenticated = !!localStorage.getItem("accessToken");
  const userID = localStorage.getItem("userID");
  const username = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");
  const isAdmin = localStorage.getItem("isAdmin");

  let profilePicURL = localStorage.getItem("profile_pic_url");

  if (profilePicURL === "null") {
    profilePicURL = "/images/default-profile-pic.jpg";
  }

  return { authenticated, userID, username, profilePicURL, userType, isAdmin };
};
