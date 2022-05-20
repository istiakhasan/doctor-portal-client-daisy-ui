
import React from 'react';
import {useQuery} from 'react-query'

import Loading from '../Shared/Loading'
import UserRow from './UserRow';

const Users = () => {
    const {data:users,isLoading,refetch}=useQuery('users',()=>
    fetch('https://doctors-portal-daisy-ui.herokuapp.com/user',{
        method:"GET",
        headers:{
            'authorization':`Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res=> res.json())
        )
      
    if(isLoading){
        return <Loading />
    }
    
    return (
        <div>
            <h2 className="text-2xl">All Users:{users.length}</h2>
            <table className="table w-full">
  
  <thead>
    <tr>
      <th></th>
      <th>Name</th>

    </tr>
  </thead>
  <tbody>
      {
          users?.map((user,i)=>(
              <UserRow refetch={refetch} user={user} key={user._id} i={i} />
          ))
      }
   
   
    
  
  </tbody>
</table>
        </div>
    );
};

export default Users;