import { useState } from "react";
import { AuthContext } from "./authContext";
import { userSchema } from "../schemas/auth";

const STORAGE_KEY = 'pixel-shop-user';

function loadUser(){
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if(!raw) return null;

        const result = userSchema.safeParse(JSON.parse(raw))
        return result.success ? result.data : null
    } catch {
        return null
    }
}
function AuthProvider ({children}){
    const [user, setUser] = useState(loadUser)
    
    function login(nextUser){
        setUser(nextUser)
        localStorage.getItem(STORAGE_KEY, JSON.stringify(nextUser))
    }
    function logout(){
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
    }
    return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}
export default AuthProvider