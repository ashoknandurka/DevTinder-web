import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return <div>{user && <EditProfile />}</div>;
};

export default Profile;
