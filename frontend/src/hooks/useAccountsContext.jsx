export const useAccountsContext = () => {
  const authenticated = !!localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const profile_pic_url =
    localStorage.getItem("profile_pic_url") ||
    "/images/default-profile-pic.jpg";

  return { authenticated, username, profile_pic_url };
};
