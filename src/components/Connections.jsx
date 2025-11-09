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
          <div className="card bg-base-300 w-96 shadow-sm mx-auto my-10" key={_id}>
            <figure>
              <img src={photoUrl} alt={`${firstName} ${lastName}`} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
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
