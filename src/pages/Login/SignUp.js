import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useNavigate } from "react-router-dom";
import useToken from '../../hooks/useToken';


const SignUp = () => {
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate=useNavigate()
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();
    const [
      createUserWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [token]=useToken(user || guser)
    if(loading || gloading || updating){
    return <Loading />
    }
    let errorMessage;
    if(error || gerror || updateError){
    errorMessage=<p className="text-red-600 text-center font-semibold">{error?.message || gerror?.message || updateError?.message}</p>
    }
   
    const onSubmit = async(data) => {
      await createUserWithEmailAndPassword(data.email,data.password)
      await updateProfile({displayName:data.name})
      console.log('Update successfully')
      // navigate('/appointment')
    };
    if(guser || user){
        console.log(guser || user)
    }
    if(token){
      console.log(token)
      navigate('/appointment')
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>
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
                      required:{
                       value:true,
                       message:'Name is Required'
  
                      },
                   
                    })}
                />
                <label className="label">
                    {errors.name?.type==='required'&& <span className="label-text-alt">{errors.name.message}</span>}
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
                      required:{
                       value:true,
                       message:'Email is Required'
  
                      },
                      pattern:{
                          value:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                          message:'Providede a valid email'
                      } 
                    })}
                />
                <label className="label">
                    {errors.email?.type==='required'&& <span className="label-text-alt">{errors.email.message}</span>}
                    {errors.email?.type==='pattern'&& <span  className="label-text-alt">{errors.email.message}</span>}
                  
                 
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                  
                </label>
                <input
                  type="password"
                  placeholder="Your password"
                  className="input input-bordered w-full max-w-xs"
                  {...register("password", {
                      required:{
                       value:true,
                       message:'Password is Required'
  
                      },
                      minLength:{
                          value:6,
                          message:'Password must be 6 charachter'
                      } 
                    })}
                />
                <label className="label">
                    {errors.password?.type==='required'&& <span className="label-text-alt">{errors.password.message}</span>}
                    {errors.password?.type==='minLength'&& <span className="label-text-alt">{errors.password.message}</span>}
                  
                 
                </label>
              </div>
              {/* daisy apa */}
  
        
            {errorMessage}
              <input value="Sign Up" className="btn w-full max-w-xs text-white" type="submit" />
            </form>
            <p className="text-center"><small>Already Have an Account?<Link className="text-secondary" to="/login">Please Login</Link></small></p>
            <div className="divider">OR</div>
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline"
            >
              Continue With Google
            </button>
          </div>
        </div>
      </div>
    );
};

export default SignUp;