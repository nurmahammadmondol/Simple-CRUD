import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const [UsersInfo, setUsersInfo] = useState([]);
  const handleFromSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const book = form.book.value;

    const Info = { name, email, book };

    fetch('http://localhost:3000/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Info),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          alert('User info save database successfully');
          navigate(0);
          form.reset();
        }
      });
  };

  const handleUpdateItem = ID => {
    console.log(ID);
  };

  const handleRemoveItem = ID => {
    console.log('remove success', ID);
    fetch(`http://localhost:3000/info/${ID}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert('User successfully removed from library.');
          navigate(0);
        }
      });
  };

  useEffect(() => {
    fetch('http://localhost:3000/info')
      .then(res => res.json())
      .then(data => setUsersInfo(data));
  }, []);

  return (
    <div>
      <h4 className="my-5 font-bold underline">
        Created library members: {UsersInfo.length}
      </h4>

      <div className="mb-16">
        <form onSubmit={handleFromSubmit} className="flex justify-center gap-4">
          <input
            type="text"
            placeholder="name"
            name="name"
            className="p-3 border"
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            className="p-3 border"
          />
          <input
            type="text"
            name="book"
            placeholder="book"
            className="p-3 border"
          />

          <button className="btn">Add User</button>
        </form>
      </div>

      <hr />
      <div className="mt-10">
        {UsersInfo.map(userInfo => (
          <div
            key={userInfo._id}
            className="flex gap-4 items-center justify-between border p-3 rounded-md my-2 "
          >
            <h4>
              {userInfo._id}.....
              {userInfo.name}, {userInfo.email}
            </h4>

            <div>
              <Link to={`/Update/${userInfo._id}`}>
                <button className="btn mr-2">update</button>
              </Link>
              <button
                onClick={() => handleRemoveItem(userInfo._id)}
                className="btn"
              >
                remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
