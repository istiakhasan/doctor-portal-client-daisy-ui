import React from "react";


const DoctorRow = ({ doctor, i ,refetch,setDeleteingDoctor}) => {

  return (
    <tr key={i}>
      <th>{i + 1}</th>
      <td>
        <div class="avatar">
          <div class="w-8 rounded">
            <img src={doctor.img} alt="Tailwind-CSS-Avatar-component" />
          </div>
        </div>
      </td>
      <td>{doctor.name}</td>
      <td>{doctor.specialty}</td>
      <td>
       <label
       onClick={()=>setDeleteingDoctor(doctor)}
       for="deletemodal" class="btn btn-xs btn-error">open modal</label>
      
      </td>
    </tr>
  );
};

export default DoctorRow;
