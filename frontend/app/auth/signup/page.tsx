"use client";
import { useEffect, useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import poppins from "@/font/font";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillYahoo } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa6";
import Image from "next/image";



interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>();

  const [errorMsg, setErrorMsg] = useState<string>("");

  //just to avoid errors
  useEffect(() => {
    console.log(errorMsg)
  }, []);

  const onSubmit: SubmitHandler<SignupData> =  async (data) => {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
      } = data;


      if (password !== confirmPassword) {
        // show message to user that passwords do not match
        setErrorMsg("Passwords do not match");
        return;
      }

      console.log(name,email)

    } catch (error) {
      console.log(error);

      setErrorMsg("Something went wrong. Please try again later.");
    }

}

  return (
    <div className={poppins.className}>
      <img src="/adobe/6.jpeg" alt="img" className="w-screen h-screen hidden md:block"/>
      <div
        className={`md:fixed md:bottom-14 md:top-14 md:left-10 md:right-10 lg:bottom-14 lg:top-14 lg:left-1/4 lg:right-1/4 flex flex-col items-center justify-center bg-gray-200 bg-opacity-60 shadow-sm rounded-2xl py-4`}
      >
        {/* This div is for the right side of the page */}
        <Image
          src="/speety_logo.png"
          alt="Speety Logo"
          width={160}
          height={100}
          className="py-2"
        />
        {/* <h1 className="text-xl text-gray-400"><Typist> Begin the journey with us ...</Typist></h1> */}
        <button className="bg-[#397367] rounded-xl w-72 h-10 mt-2 text-lg font-bold">
              <div className="flex flex-row items-center">
                <AiFillGoogleCircle className="w-8 h-8 ml-3 text-white" />
                <p className="ml-5 py-2 text-white">Continue with Google</p>
              </div>
            </button>
            <button className="bg-[#397367] rounded-xl w-72 h-10 mt-2 text-lg font-bold">
              <div className="flex flex-row items-center">
                <AiFillYahoo className="w-8 h-8 ml-4 text-white" />
                <p className="ml-4 py-2 text-white">Continue with Yahoo</p>
              </div>
            </button>
            <button className="bg-[#397367] rounded-xl w-72 h-10 mt-2 text-lg font-bold">
              <div className="flex flex-row items-center">
                <FaMicrosoft className="w-6 h-6 ml-4 text-white" />
                <p className="ml-5 py-2 text-white">Continue with Microsoft</p>
              </div>
            </button>
        <div className="flex flex-row gap-2 items-center">
          {/* This is for the horizontal line */}
          <hr className="mt-3 border-gray-400 border-1 flex-grow w-44" />
          <p className="text-gray-500 text-lg mt-3 ">Or</p>
          <hr className="border-1 border-gray-400 mt-3 flex-grow w-44" />
        </div>
        <div className="flex flex-col items-center justify-center ml-20">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col md:flex-row mt-1 gap-8">
              <div>
                <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  type="text"
                  required
                  {...register("email")}
                  className="rounded-md bg-gray-200 h-10 w-72 text-md px-4"
                />
                {errors.email && (
                  <p className="text-red-500">Email is required.</p>
                )}
              </div>

              <div>
                <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  required
                  {...register("name")}
                  className="rounded-md bg-gray-200 h-10 w-72 text-md px-4"
                />
                {errors.name && (
                  <p className="text-red-500">Name is required.</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row mt-4 gap-8">
              <div>
                <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  required
                  {...register("password")}
                  className="rounded-md bg-gray-200 h-10 w-72 text-md px-4"
                />
                {errors.password && (
                  <p className="text-red-500">Password is required.</p>
                )}
              </div>

              <div>
                <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  {...register("confirmPassword")}
                  className="rounded-md bg-gray-200 h-10 w-72 text-md px-4"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">Please confirm your password.</p>
                )}
              </div>
            </div>
            <p className="px-1 py-2 text-sm"> • Password must be atleast 6 characters.</p>
            <div className="flex items-center justify-center mr-20">
            <button
              type="submit"
              id="signupButton"
              className="bg-[#397367] text-white rounded-md h-10 w-60 font-bold text-md"
            >
              Get Started
            </button>
            </div>

          </form>
          <h3 className="mt-2 text-center text-sm mr-20">
            Already have an account?{" "}
            <a href="/auth/login" className="text-[#397367] font-bold">
              Login!
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}
