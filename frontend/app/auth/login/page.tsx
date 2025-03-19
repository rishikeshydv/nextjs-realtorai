"use client"

import React, { useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillYahoo } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa6";
import Image from "next/image";
import PasswordReset from "@/components/ResetThankYou";
import ResetEmail from "@/components/ResetEmail";
import { SignInData } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { onest } from "@/font/font";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [reset, setReset] = useState<boolean>(false);
  const [resetDone, setResetDone] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  
  const { register, handleSubmit,formState: { errors } } = useForm<SignInData>();

  const onSubmit:SubmitHandler<SignInData> = async (data) => {
    const { email, password } = data;

    try {
      if (email === "" || password === "") {
        setErrorMsg("Email and Password are required.");
        return;
      }
      const res = await axios.post("http://localhost:5002/api/v1/login", data,{
        withCredentials: true,
      });

      console.log(res.data);

      if (res.data.message === "User Successfully Logged In.") {
        //save the email in local storage
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", res.data.name);
        router.push(`/dashboard/${data.email}`);
        return;
      }
      setErrorMsg(res.data);

    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div className={onest.className}>
      <div className="flex">
        <div className={`bg-gray-800 h-screen w-1/2 hidden md:block`}>
          <img src="/imgs/loginFamily.jpg" alt="alt" className="md:w-full md:h-full lg:w-auto lg:h-auto"/>
        </div>
        {
          reset && <ResetEmail setReset={setReset} setResetDone={setResetDone}/>
        }
        {
          resetDone && <PasswordReset/>
        }

        <div className="h-screen w-1/2 flex flex-col items-center justify-center ml-20 md:ml-0">
        <Link href="/">
        <Image
            src="/logo/logo.png"
            alt="Speety Logo"
            width={150}
            height={90}
            className="mb-6"
          />
        </Link>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <button className="bg-[#437A45] rounded-xl w-72 h-10 mt-2 text-lg font-bold">
              <div className="flex flex-row items-center">
                <AiFillGoogleCircle className="w-8 h-8 ml-3 text-white" />
                <p className="ml-5 text-white">Continue with Google</p>
              </div>
            </button>
            <button className="bg-[#437A45] rounded-xl w-72 h-10 mt-2 text-lg font-bold">
              <div className="flex flex-row items-center">
                <AiFillYahoo className="w-8 h-8 ml-4 text-white" />
                <p className="ml-4 text-white">Continue with Yahoo</p>
              </div>
            </button>
            <button className="bg-[#437A45] rounded-xl w-72 h-10 mt-2 text-lg font-bold">
              <div className="flex flex-row items-center">
                <FaMicrosoft className="w-6 h-6 ml-4 text-white" />
                <p className="ml-5 text-white">Continue with Microsoft</p>
              </div>
            </button>
            <div className="flex flex-row gap-2 items-center">
              <hr className="mt-7 border-gray-400 border-1 flex-grow w-24" />
              <p className="text-gray-500 text-md mt-6 ">Or Continue with</p>
              <hr className="border-1 border-gray-400 mt-7 flex-grow w-24" />
            </div>
            <div className="flex flex-col">
              <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="text"
                required
                {...register("email")}
                className="rounded-md bg-gray-200 md:h-10 md:w-96 px-4 text-sm"
              />
              {errors.email && <p className="text-red-500">Email is required.</p>}
              <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                required
                {...register("password")}
                className="rounded-md bg-gray-200 md:h-10 md:w-96 px-4 text-sm"
              />

              {errors.password && <p className="text-red-500">Password is required.</p>}
              <h1 className="mt-1 text-[#437A45] text-sm font-bold" onClick={()=>setReset(true)}>
                Forgot Password?
              </h1>
              {errorMsg && <p className="text-red-500">{errorMsg}</p>}
              <p id="error_msg" className="text-md text-red-400 font-semibold"></p>
              <button
              type="submit"
                className="bg-[#437A45] text-white mt-2 rounded-md md:h-10 md:w-96 font-bold text-md"
              >
                Continue
              </button>
              <h3 className="mt-2 text-center text-md">
                Don&apos;t have an account yet?{" "}
                <a href="/auth/signup" className="text-[#437A45] font-bold tracking-tight underline">
                  Sign up!
                </a>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
