/**
 * v0 by Vercel.
 * @see https://v0.dev/t/omFgxqpUK7e
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import poppins from "@/font/font";
import Footer from "@/components/Footer";
import { useParams } from 'next/navigation';
// import ListingCard from "@/services/agent/ListingCard";
import { Textarea } from "@/components/ui/textarea"
import { useState,useEffect, useRef } from "react"
//import moment from "moment"; //use moment.js to get time/date in a good format

// interface Property {
//   address: string;
//   apartment: string;
//   baths: string;
//   beds: string;
//   brokerId: string;
//   city: string;
//   houseType: string;
//   imageUrl: string[];
//   listedBy: string;
//   price: string;
//   state: string;
//   transactionType: string;
//   videoUrl: string[];
//   zip: string;
// }

export default function Component() {


const params = useParams();
  const paramsEmail = decodeURIComponent(params.email as string);
 //   console.log(paramsEmail);

 //state variables for user data
 const [address, setAddress] = useState("");
 const [name, setName] = useState("");
 const [brokerId, setBrokerId] = useState("");
 const [description, setDescription] = useState("");
 const [phone, setPhone] = useState("");
 const [profilePic, setProfilePic] = useState("");
 const [website, setWebsite] = useState("");
 const [role, setRole] = useState("");

 //state variables for change in buttons
 const [buttonText, setButtonText] = useState("Save");
 const [buttonColor, setButtonColor] = useState("bg-gray-400");

 async function getPresentListings() {
//get logic to get all listings
}

 
 async function getUserData(){
//logic to get user data
}

async function updateProfile(){
  //logic to update the profile
  setName(name);
  setAddress(address);
  setPhone(phone);
  setWebsite(website);
  setDescription(description);
  setBrokerId(brokerId);
  setProfilePic(profilePic);
  setRole(role);
}

  useEffect(() => {
    getUserData();
    getPresentListings();
  }
  ,[]);

  //dealing with profile picture change
  const [newProfilePic, setNewProfilePic] =  useState<File | null>(null);
  const [newProfilePicUrl, setNewProfilePicUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmText, setConfirmText] = useState("Confirm");
  const [confirmTextColor, setConfirmTextColor] = useState("bg-black");

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

    //to confirm the new profile pic
    useEffect(() => {
      if (!newProfilePic) {
        return;
      }

      // just to avoid errors
      setNewProfilePicUrl("")
      console.log(confirmTextColor)
  
    const confirmNewProfile = () => {    
      return new Promise((resolve, reject) => {
       //logic to upload the new profile pic
       console.log(resolve, reject);
      }
      ); 
    }
    confirmNewProfile();
      }, [newProfilePic]);

  async function ConfirmFunc() {
    setConfirmText("Confirmed!");
    setConfirmTextColor("bg-green-400");

    //update the profile pic in the database
    
  }

  return (
    <div className={`${poppins.className}`}>
        <div className="flex flex-col items-center bg-gray-200">
    <Card className="w-full max-w-7xl mt-8 mb-8 shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl">User Profile</CardTitle>
        <CardDescription className="text-xl">View and edit your profile</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
        <div className="flex items-center gap-6">
            <div className="relative w-20 h-20">
                <img
                    alt="Profile picture"
                    className="rounded-full object-cover"
                    height={80}
                    src={profilePic}
                    width={80}
                />
            </div>
            <div className="grid gap-1.5">
                <div className="font-bold text-lg md:text-2xl leading-none">{name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
            </div>
        </div>
        <div className="mt-2">
          <Button onClick={handleIconClick}>Change Profile</Button>
          {newProfilePicUrl && (
            <Button className={`confirmTextColor`} onClick={ConfirmFunc}>{confirmText}</Button>
            )}
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => {setNewProfilePic(e.target.files?.[0] || null);}}
      />
        </div>
        </div>
        <div>
          <form className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1.5">
              <Label className="text-xl" htmlFor="name">
                Name
              </Label>
              <Input value={name} readOnly id="name"  className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xl" htmlFor="email">
                Email
              </Label>
              <Input id="email" readOnly value={paramsEmail} type="email" className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="brokerId">
                Broker ID
              </Label>
              <Input id="brokerId" readOnly value={brokerId} placeholder="Broker ID" className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="">
                Address
              </Label>
              <Input id="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder="123 Test St..." className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="">
                Phone
              </Label>
              <Input id="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="">
                Website
              </Label>
              <Input id="website" value={website} onChange={(e)=>{setWebsite(e.target.value)}} className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="">
                My Description
              </Label>
              <Textarea id="description" value={description} onChange={(e)=>{setDescription(e.target.value)}}  className="text-lg"/>
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className={`text-lg ${buttonColor}`} onClick={()=>{
            updateProfile();
            setButtonText("Updated!");
            setButtonColor("bg-green-400");
            }}>{buttonText}</Button>
        </div>
      </CardContent>
      <h3 className="text-3xl font-semibold px-10 py-5">Listed Properties</h3>
      <div className="flex flex-wrap gap-6 p-9">
{/* 
        
        {presentListings && presentListings.map((property, index) => (
          <ListingCard
          key={index}
          propertyId={""}
          address={property.address}
          price={property.price}
          bedrooms={property.beds}
          bathrooms={property.baths}
          transactionType={property.transactionType}
          date={currentTime.format("MMMM DD, YYYY")}
          stars={3}
          review="Excellent service and expertise!"
          image={property.imageUrl[0]}
          />
        ))} */}

  </div>
    </Card>
    </div>
    <Footer />
    </div>
  )
}


