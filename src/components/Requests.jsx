import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="text-center text-bold text-3xl mt-10">
        <h2>No Requests Found</h2>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-center text-white text-bold text-3xl">Connections</h2>
      {requests?.map((request) => {
        const { firstName, lastName, photoUrl, about, age, gender, _id } =
          request.fromUserId;
        return (
          <div
            className="flex justify-between items-center gap-4 w-2/3 bg-base-300 p-4 m-4 rounded-lg mx-auto"
            key={_id}
          >
            <div>
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-start">
              <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
              {age && gender && <p>{`${age}, ${gender}`}</p>}
              <p>{about}</p>
            </div>
            <div className="flex gap-4">
              <button className="btn btn-primary">Reject</button>
              <button className="btn btn-secondary">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
