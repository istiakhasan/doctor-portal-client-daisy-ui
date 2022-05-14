import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const location=useLocation();
  const navigate=useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const from=location?.state?.from?.pathname || '/'
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  useEffect(()=>{
    if(user || guser){
      navigate(from,{replace:true})
    }
  },[user,guser,from,navigate])
  if(loading || gloading){
  return <Loading />
  }
  let errorMessage;
  if(error || gerror){
  errorMessage=<p className="text-red-600 text-center font-semibold">{error?.message || gerror?.message}</p>
  }
 
  
 
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email,data.password);
   
    
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* daisy apa */}
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
            <input value="Login" className="btn w-full max-w-xs text-white" type="submit" />
          </form>
          <p className="text-center"><small>New to Doctors Portal?<Link className="text-secondary" to="/signup">Create New Account</Link></small></p>
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

export default Login;
