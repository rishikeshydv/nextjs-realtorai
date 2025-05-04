"use client";
import { useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillYahoo } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa6";
import Image from "next/image";
import axios from "axios";
import { SignupUser } from "@/types/user";
import { onest } from "@/font/font";
import Link from "next/link";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupUser>();

  const [errorMsg, setErrorMsg] = useState<string>("");


  const onSubmit: SubmitHandler<SignupUser> =  async (data) => {
    try {
     const res = await axios.post("http://localhost:5002/api/v1/signup", {
        email: data.email,
        name: data.name,
        password: data.password,
        confirm_password: data.confirm_password,
      })
      setErrorMsg(res.data);
    } catch (error:unknown) {
      setErrorMsg(String(error));
    }

}

  return (

<div className={`${onest.className} relative h-screen flex justify-center items-center`}>
  <Link href="/">
    <div className="bg-gray-100 text-gray-700 rounded-r-md absolute left-4 top-4 px-4 py-2 text-sm md:text-md shadow-md hover:bg-gray-200 transition-colors cursor-pointer">
      Return to home
    </div>
  </Link>

  <div className="bg-gray-100/80 shadow-md rounded-2xl py-8 px-6 md:py-12 md:px-16 w-full max-w-md lg:max-w-lg flex flex-col items-center">
    <Link href={"/"} className="mb-6">
      <Image
        src="/logo/logo.png"
        alt="Speety Logo"
        width={140}
        height={100}
      />
    </Link>

    <div className="w-full flex flex-col items-stretch gap-2 md:gap-3 mb-4">
      <button className="bg-[#437A45] rounded-xl h-10 text-lg font-bold text-white flex items-center justify-center">
        <AiFillGoogleCircle className="w-6 h-6 mr-3" />
        Continue with Google
      </button>
      <button className="bg-[#437A45] rounded-xl h-10 text-lg font-bold text-white flex items-center justify-center">
        <AiFillYahoo className="w-6 h-6 mr-3" />
        Continue with Yahoo
      </button>
      <button className="bg-[#437A45] rounded-xl h-10 text-lg font-bold text-white flex items-center justify-center">
        <FaMicrosoft className="w-5 h-5 mr-3" />
        Continue with Microsoft
      </button>
    </div>

    <div className="flex items-center w-full my-4">
      <hr className="border-gray-400 border-t flex-grow" />
      <p className="text-gray-500 text-sm mx-3">Or</p>
      <hr className="border-gray-400 border-t flex-grow" />
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-stretch w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800 mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            required
            {...register("email")}
            className="rounded-md bg-gray-200 h-10 text-md px-4 w-full"
            id="email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">Email is required.</p>}
        </div>

        <div className="flex flex-col">
          <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800 mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            required
            {...register("name")}
            className="rounded-md bg-gray-200 h-10 text-md px-4 w-full"
            id="name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">Name is required.</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800 mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            required
            {...register("password")}
            className="rounded-md bg-gray-200 h-10 text-md px-4 w-full"
            id="password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">Password is required.</p>}
        </div>

        <div className="flex flex-col">
          <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800 mb-1" htmlFor="confirm_password">
            Confirm Password
          </label>
          <input
            type="password"
            required
            {...register("confirm_password")}
            className="rounded-md bg-gray-200 h-10 text-md px-4 w-full"
            id="confirm_password"
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-xs mt-1">Please confirm your password.</p>
          )}
        </div>
      </div>
      <p className="px-1 py-2 text-sm text-center text-red-500">{errorMsg}</p>
      <button
        type="submit"
        id="signupButton"
        className="bg-[#437A45] text-white rounded-md h-10 font-bold text-md mt-2"
      >
        Get Started
      </button>
    </form>

    <h3 className="mt-4 text-center text-sm">
      Already have an account?{" "}
      <Link href="/auth/login" className="text-[#437A45] font-bold">
        Login!
      </Link>
    </h3>
  </div>
</div>

  );
}
