import React from 'react';

import Card from '../../shared/components/UIElements/Card';

import './UsersList.css';
import UserItem from './UserItem';



const UsersList = props => {
  if (props.items.length === 0){
    return(

      <div className="center">
      <Card>
        <h2>No users found</h2>
          </Card>
      </div>
    );
  }
 return <ul className="users-list">
  {props.items.map(user=>{
    return <UserItem
      key={user.id}
      id={user.id}
      name={user.name}
      image={user.image}
      placeCount={user.places}

    />
  })}
  </ul>;
};
export default UsersList;
