import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";

const AddDoctor = () => {
    /* 
    3ways to store images
    1.third party storage //free open public storage is okk for practice project
    2.your own storage in your own server(file system)
    3.database:Mongodb
    
    image validate
    yup: to validate file:search yup file validation for react hook form
    */
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const { data: services, isLoading } = useQuery("services", () =>
    fetch("http://localhost:4000/service").then((res) => res.json())
  );
  const imageStoreageKey='f7888621f8cab2adfc76adb7ffde620b'
  const onSubmit = async (data) => {
    const image=data.image[0];
    const formData=new FormData();
    formData.append('image',image)
    const url=`https://api.imgbb.com/1/upload?key=${imageStoreageKey}`
    fetch(url,{
        method:'POST',
        body:formData
    })
    .then(res=>res.json())
    .then(result=>{
        
        if(result.success){
            const img=result?.data?.url
            const doctor={
                name:data.name,
                email:data.email,
                specialty:data.specialty,
                img:img
            }
            
            fetch('http://localhost:4000/doctor', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        "authorization":`Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
            .then(res=>res.json())
            .then(inserted=>{
               if(inserted.insertedId){
                   toast.success('Doctor added successfully')
                   reset()
               }else{
                 toast.error("failed")
               }
            })

            
         

            //send to your database 

        }
        
    })
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-2xl">Add a new Doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* daisy apa */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required",
              },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt">{errors.name.message}</span>
            )}
            {/* {errors.email?.type==='pattern'&& <span  className="label-text-alt">{errors.email.message}</span>} */}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full max-w-xs"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Providede a valid email",
              },
            })}
          />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="label-text-alt">{errors.email.message}</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt">{errors.email.message}</span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Specialization</span>
          </label>
          <select {...register('specialty')} class="select input input-bordered w-full max-w-xs">
           {
               services.map(service=><option key={service._id} value={service.name}>{service.name}</option>)
           }
          
          </select>
       
          <label className="label">
            {errors.password?.type === "required" && (
              <span className="label-text-alt">{errors.password.message}</span>
            )}
          </label>
        </div>


        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="file"
            
            className="input input-bordered w-full max-w-xs"
            {...register("image", {
              required: {
                value: true,
                message: "Name is Required",
              },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt">{errors.name.message}</span>
            )}
            {/* {errors.email?.type==='pattern'&& <span  className="label-text-alt">{errors.email.message}</span>} */}
          </label>
        </div>
        {/* daisy apa */}

        <input
          value="Add"
          className="btn w-full max-w-xs text-white"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
