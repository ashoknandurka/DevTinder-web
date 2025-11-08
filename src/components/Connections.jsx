import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="text-center text-bold text-3xl mt-10">
        <h2>No Connections Found</h2>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-center text-white text-bold text-3xl">Connections</h2>
      {connections?.map((connection) => {
        const { firstName, lastName, photoUrl, about, age, gender, _id } =
          connection;
        return (
          <div
            className="flex gap-4 w-1/2 bg-base-300 p-4 m-4 rounded-lg mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
