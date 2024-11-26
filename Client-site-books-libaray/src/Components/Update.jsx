import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Update = () => {
  const loadedUser = useLoaderData();
  const navigate = useNavigate();

  const handleUpdateFromSubmit = e => {
    console.log('Update data ');
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const book = form.book.value;

    const updateUserInfo = { name, email, book };
    // console.log(updateUserInfo);

    fetch(`http://localhost:3000/info/${loadedUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateUserInfo),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          navigate(-1);
        }
        // console.log(data);
      });
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
      <h4 className="text-2xl font-bold">
        Update user Info : {loadedUser.name}
      </h4>
      <form onSubmit={handleUpdateFromSubmit} className="flex flex-col gap-3">
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
  );
};

export default Update;
