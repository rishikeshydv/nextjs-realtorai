import { Button } from "@/components/ui/button"
import React from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
        <div className=" bg-black-grid-with-gradient bg-no-repeat bg-cover">
        <div className="h-[10vh] xl:h-[12vh] 2xl:h-[8vh] min-w-[100vw] overflow-hidden">
    </div>
    <section className="w-full py-12 md:py-24 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About Us
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  We&apos;re on a mission to revolutionize the industry with innovative solutions and exceptional service.
                </p>
              </div>
            </div>
          </div>
        </section>
        </div>

      <div className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Company Overview
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Our Story 
                </h2>
                <p className="text-gray-500 md:text-lg/relaxed dark:text-gray-400">
                Farming Simulator Clips was founded in late November of 2023 with a simple mission: to provide the best Farming Simulator content on the web. Since then, we have grown into a global community of players and enthusiasts who share passion for the game. 

                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Mission & Values
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Our Guiding Principles 
                </h2>
                <ul className="grid gap-4 text-gray-500 md:text-lg/relaxed dark:text-gray-400">
                  <li>
                    <strong className='text-black'>Innovation:&nbsp; &nbsp;</strong> 
                    We are committed to pushing the boundaries of what is possible and creating new opportunities for our
                    community.
                  </li>
                  <li>
                    <strong className='text-black'>Customer Focus:&nbsp; &nbsp;</strong> Our clients are at the heart of everything we do, and we strive to
                    exceed their expectations.
                  </li>
                  <li>
                    <strong className='text-black'>Integrity:&nbsp; &nbsp;</strong> We uphold the highest standards of ethical conduct and transparency in
                    all our business practices.
                  </li>
                  <li>
                    <strong className='text-black'>Collaboration:&nbsp; &nbsp;</strong> We believe in fostering a culture of teamwork, open communication,
                    and mutual respect.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-300 px-3 py-1 text-sm dark:bg-gray-800">Our Team</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet the Experts</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our team of dedicated professionals is committed to delivering exceptional results and ensuring your
                  success.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-center justify-center max-w-4xl gap-10 py-12 sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-2">
              <div className="grid gap-1 bg-gray-200 p-6 rounded-2xl">
                <div className="flex items-center justify-center">
                  <Avatar className='w-16 h-16'>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>ANO..</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-lg font-bold">Anonymous</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Business Owner</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                The owner, who at this time prefers to stay anonymous is the founder and CEO of FS CLIPS. He is passionate about gaming and is dedicated to providing the best content for our community.
                </p>
              </div>
              <div className="grid gap-1 bg-gray-200 p-6 rounded-2xl">
                <div className="flex items-center justify-center">
                  <Avatar className='w-16 h-16'>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>MB</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-lg font-bold">Rishikesh Yadav</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Rishi is a talented software engineer with a passion for gaming. He is responsible for developing and
                  maintaining our website. In addition, he works on various projects to improve the user experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Team</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We&apos;re always looking for talented individuals to join our growing team. Check out our open positions and
                  apply today!
                </p>
              </div>
              <Button className="inline-flex h-10 items-center justify-center rounded-md bg-[#0874de] px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                View Open Positions
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
