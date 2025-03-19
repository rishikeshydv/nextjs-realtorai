"use client"
import Sec7 from "@/components/Footer";
import Section1 from "@/components/homepage/Section1";

import { onest } from "@/font/font";


export default function Home() {
  return (
    <div className={onest.className}>
      <Section1 />
      <Sec7 />
    </div>
  );
}
