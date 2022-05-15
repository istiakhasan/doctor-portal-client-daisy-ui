import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyAppointments = () => {
    const [appointments,setAppoinements]=useState([]);
    const [user]=useAuthState(auth)
    useEffect(()=>{
     if(user){
        fetch(`http://localhost:4000/booking?patient=${user?.email}`)
        .then(res=>res.json())
        .then(data=>setAppoinements(data))
     }
    },[user])
    return (
        <div>
            <h2>My Appointment:{appointments.length}</h2>
            <div class="overflow-x-auto">
  <table class="table w-full">
  
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Date</th>
        <th>Time</th>
        <th>Treatment</th>
      </tr>
    </thead>
    <tbody>
        {
            appointments.map((appointment,i)=>(
                <tr key={i}>
                <th>{i+1}</th>
                <td>{appointment.patientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.treatment}</td>
              </tr>
            ))
        }
     
     
      
    
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyAppointments;