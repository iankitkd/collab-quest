"use client"

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useForm } from "react-hook-form";

import { FaUser } from "react-icons/fa";
import { IoMdLock, IoMdMail, IoMdEye, IoMdEyeOff } from "react-icons/io";

const Signup = () => {
  const router = useRouter();
  const { signup, login, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: {errors},
    clearErrors
  } = useForm({defaultValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }});

  const {name, email, password, confirmPassword} = watch();

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      return "Passwords do not match";
    }
    return true;
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const userCredential = await signup(email, password);
      // add user data to Firestore
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      // toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (currentUser) {
        router.push("/dashboard");
      }
    }, [currentUser, router]);

  return (
    <div className='bg-background-primary w-full min-h-screen flex justify-center'>
    
        <div className='w-[350px] h-fit flex flex-col my-2 p-4 pb-8 bg-background-secondary rounded-2xl'>
          <h2 className='text-2xl text-center font-bold text-button p-1'>Sign Up</h2>
          <p className='text-center p-1'>Create Your Account</p>
    
          {/* form */}
          <form onSubmit={handleSubmit(handleSignup)}>
            
            <label htmlFor='name' className='relative flex flex-col'>
              <FaUser className='absolute top-[30px] left-1 text-xl'/>
              <input 
              type="text" 
              id='name'
              value={name}
              placeholder='Full Name'
              autoComplete='on'
              className='bg-background-fill h-12 mt-4 pl-7 pr-7 rounded-xl placeholder-text-muted outline-0 focus:outline-1 focus:outline-button'
              {...register("name", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Name is too short"
                }
              })}
              />
              {errors.name && (<span className='text-red-500 text-xs px-2'>{errors.name.message}</span>)}
            </label>

            <label htmlFor='email' className='relative flex flex-col'>
              <IoMdMail  className='absolute top-[30px] left-1 text-xl'/>
              <input 
              type="text" 
              id='email'
              value={email}
              placeholder='Email'
              autoComplete='on'
              className='bg-background-fill h-12 mt-4 pl-7 rounded-xl placeholder-text-muted outline-0 focus:outline-1 focus:outline-button'
              {...register("email", {
                required: "Email is required", 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format"
                }
              })}
              />
              {errors.email && (<span className='text-red-500 text-xs px-2'>{errors.email.message}</span>)}
            </label>
    
            <label htmlFor='password' className='flex flex-col relative'>
              <IoMdLock className='absolute top-[30px] left-1 text-xl'/>
              <div className='absolute top-[30px] right-1'
              onClick={() => setIsPasswordVisible(prev => !prev)}
              >
                { isPasswordVisible
                  ? <IoMdEyeOff className=' text-xl' />
                  : <IoMdEye className='text-xl'/>
                }
              </div>
              <input 
              type={isPasswordVisible ? "text" : "password"}
              id='password'
              value={password}
              placeholder='Password'
              autoComplete='on'
              className='bg-background-fill h-12 mt-4 pl-7 pr-7 rounded-xl placeholder-text-muted outline-0 focus:outline-1 focus:outline-button'
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#(){}.,])[A-Za-z\d@$!%*?&#(){}.,]+$/,
                  message: "Password must contain at least one letter, one number, and one special character"
                }
              })}
              />
              {errors.password && (<span className='text-red-500 text-xs px-2'>{errors.password.message}</span>)}
            </label>

            <label htmlFor='confirmPassword' className='flex flex-col relative'>
              <IoMdLock className='absolute top-[30px] left-1 text-xl'/>
              <div className='absolute top-[30px] right-1'
              onClick={() => setIsConfirmPasswordVisible(prev => !prev)}
              >
                { isConfirmPasswordVisible
                  ? <IoMdEyeOff className=' text-xl' />
                  : <IoMdEye className='text-xl'/>
                }
              </div>
              <input 
              type={isConfirmPasswordVisible ? "text" : "password"}
              id='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm Password'
              autoComplete='on'
              className='bg-background-fill h-12 mt-4 pl-7 pr-7 rounded-xl placeholder-text-muted outline-0 focus:outline-1 focus:outline-button'
              {...register("confirmPassword", {
                required: "Please confirm your password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#(){}.,])[A-Za-z\d@$!%*?&#(){}.,]+$/,
                  message: "Password must contain at least one letter, one number, and one special character"
                },
                validate: validateConfirmPassword
              })}
              />
              {errors.confirmPassword && (<span className='text-red-500 text-xs px-2'>{errors.confirmPassword.message}</span>)}
            </label>
    
            <button 
            className='w-full font-semibold text-button-text bg-button hover:bg-button-hover hover:cursor-pointer disabled:bg-button-muted h-10 mt-4 px-2 rounded-xl' 
            type='submit'
            disabled={loading}
            >
              Sign up
            </button>
    
          </form>
    
          <div className='flex gap-2 justify-center py-2'>
            <p>Already have a account?</p>
            <button 
            className='text-button font-semibold hover:cursor-pointer hover:underline'
            onClick={() => router.push("/login")}>
              Sign in
            </button>
          </div>
    
        </div>
      
    </div>
  )
}

export default Signup
