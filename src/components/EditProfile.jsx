import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = React.useState(user.firstName || "");
  const [lastName, setLastName] = React.useState(user.lastName || "");
  const [age, setAge] = React.useState(user.age || 0);
  const [gender, setGender] = React.useState(user.gender || "male");
  const [about, setAbout] = React.useState(user.about || "");
  const [photoUrl, setPhotoUrl] = React.useState(user.photoUrl || "");
  const [error, setError] = React.useState("");
  const [toastVisible, setToastVisible] = React.useState(false);

  const handleSaveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      console.error("Error saving profile:", err);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-10 my-10">
        <div className="flex justify-center">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">FirstName</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">LastName</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input"
                  />
                </fieldset>
              </div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea"
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      {toastVisible && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
