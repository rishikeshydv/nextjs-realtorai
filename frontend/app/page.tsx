"use client";

import Section1 from '@/components/homepage/Section1';

export default function Home() {
  

  // async function fetchUser() {
  // try {
  //   const response = await fetch("/api/checkcookie");
  //   console.log("Response: ",response);
  //   if (!response.ok) throw new Error("Not authenticated");

  //   const data = await response.json();
  //   setUserEmail(data.username);
  // } catch {
  //   // Redirect to login if not authenticated
  //   // window.location.href = "/auth/login";
  //   console.log("Not authenticated");
  // }
  // }
  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <div>
    <h1>
      </h1> 
      <Section1 />
    </div>
  );
}
