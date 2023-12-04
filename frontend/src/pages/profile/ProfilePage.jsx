import { useContext } from "react";
import { Context } from "../../App";
import { ProfilePageShelter } from "./ProfilePageShelter";
import { ProfilePageUser } from "./ProfilePageUser";

export const ProfilePage = () => {
  const { userType } = useContext(Context);

  if (userType === "shelter") {
    return <ProfilePageShelter />;
  } else if (userType === "seeker") {
    return <ProfilePageUser />;
  } else {
    return <></>;
  }
};
