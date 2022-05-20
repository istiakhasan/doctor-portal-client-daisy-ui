import React from 'react';
import {toast} from 'react-toastify'

const DeleteConfirmModal = ({deleteingDoctor,refetch,setDeleteingDoctor}) => {
    const handleDelete=(email)=>{
        fetch(`http://localhost:4000/doctor/${email}`,{
            method:'DELETE',
            headers:{
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount){
                toast.success(`Doctor: ${deleteingDoctor.name} is deleted`)
                refetch()
                setDeleteingDoctor(null)
            }
        })
       }
    return (
        <>
    
        <input type="checkbox" id="deletemodal" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Are you sure you want to delete {deleteingDoctor.name}</h3>
            <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <div class="modal-action">
            <button
        onClick={()=>handleDelete(deleteingDoctor.email)}
        className="btn btn-xs btn-error text-white">Delete</button>
              <label for="deletemodal" class="btn btn-xs">Cancel</label>
            </div>
          </div>
        </div>
        </>
    );
};

export default DeleteConfirmModal;