const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt={`${firstName} ${lastName}`} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && <p>Age: {age}</p>}
          {gender && <p>Gender: {gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
