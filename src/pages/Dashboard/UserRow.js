import React from 'react';
import {toast} from 'react-toastify'

const UserRow = ({i,user,refetch}) => {
    const {email,role}=user;
    const makeAdmin=()=>{
        fetch(`https://doctors-portal-daisy-ui.herokuapp.com/user/admin/${email}`,{
            method:'PUT',
            headers:{
                "authorization":`Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>{
           if(res.status===403){
               toast.error("failed to make an admin")
           } 
          return  res.json()
        })
        .then(data=>{
            if(data){
                if(data.modifiedCount>0){

                    toast.success("make admin successfully")
                    refetch()
                    console.log(data)
                }
            }
        })
    }
    return (
        <tr key={i}>
              <th>{i+1}</th>
              <td>{user.email}</td>
              <td>{role !=='admin' && <button onClick={makeAdmin} className='btn btn-xs'>Make Admin</button>}</td>
              <td><button className='btn hover:bg-red-500 border-none btn-xs'>Remove User</button></td>
             
              </tr>
    );
};

export default UserRow;