import React from 'react';

import UsersList from '../components/UsersList';

const Users =()=>{
  const USERS =[          //dummy data untill we connect to our backend
    {
    id:'u1',
    name: 'ozzzy',
    image:'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
    places:'3'
  }
];
return <UsersList items={USERS}/>;
};

export default Users;
