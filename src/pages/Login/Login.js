import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center h-screen">
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

      

            <input value="Login" className="btn w-full max-w-xs text-white" type="submit" />
          </form>
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
