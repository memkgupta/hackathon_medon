'use client'
import Navbar from "@/components/Navbar";
import { BASE_URL } from "@/constants";
import { AuthProvider } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [cookies] = useCookies(['token']);
    const [user,setUser] = useState({});
    const[loading,setLoading]=useState(true);
    const [authStatus,setAuthStatus]=useState(false);
    useEffect(()=>{
        if(cookies?.token){
  
            axios.get(`${BASE_URL}/user/me`,{headers:{Authorization:`Bearer ${cookies.token}`}}).then((res)=>{
          setAuthStatus(true);
          setUser(res.data.data);
          
            }).catch((error:AxiosError)=>{
          toast.error(error.message);
            })
            .finally(()=>{
          setLoading(false);
            })
          }
          else{
            setLoading(false);
          }
    },[])
  return (

<>
{
    !loading?
    (
        <AuthProvider value={{user:user,authStatus:authStatus,setAuthStatus:setAuthStatus,setUser:setUser}}>
        <Navbar/>
   {children}
</AuthProvider>
    ):"Loading"
}
</>

  );
}
