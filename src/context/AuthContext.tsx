import { createContext, useContext, useState } from 'react';
const AuthContext = createContext<{authStatus:boolean;setAuthStatus:(status:boolean)=>void;user:any,setUser:(data:any)=>void}>({
    user:{},
    setUser:()=>{},
    authStatus:false,
    setAuthStatus:()=>{},
});

export const AuthProvider = AuthContext.Provider;

export default AuthContext;