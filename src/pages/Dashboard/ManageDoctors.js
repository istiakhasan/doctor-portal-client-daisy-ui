import React,{useState} from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DoctorRow from './DoctorRow';
import DeleteConfirmModal from '../Dashboard/DeleteConfirmModal'

const ManageDoctors = () => {
  const [deleteingDoctor,setDeleteingDoctor]=useState(null)
    const {data:doctors,isLoading,refetch}=useQuery('doctors',()=>fetch('http://localhost:4000/doctor',{
      headers:{
        'authorization':`Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res=>res.json()))
    if(isLoading){
      return <Loading />
    }
    return (
      <>
        <div>
           <h2 className='text-2xl'>Manage Doctors{doctors.length}</h2>
           <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
             <DoctorRow
             refetch={refetch}
             setDeleteingDoctor={setDeleteingDoctor}
             key={doctor._id}
             doctor={doctor} i={i} />
            ))}
          </tbody>
         {deleteingDoctor && <DeleteConfirmModal
         
         refetch={refetch}
         deleteingDoctor={deleteingDoctor}
         setDeleteingDoctor={setDeleteingDoctor}
         />}
        </table>
        </div>
         </>
    );
};

export default ManageDoctors;