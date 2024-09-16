"use client"

import { useEffect, useState } from "react";
import { GetUser } from "../hooks/globaluser"
import { IUser } from "../Models/User";


export const UserDisplay = () => {
    
    const [user, setUser] = useState<IUser>()

    useEffect(() => {

        const newUser = GetUser()

        if(newUser == null){
            window.location.replace("/")
            return
        }

        setUser(newUser)

    }, [])

    if(user == null){
        return <h1>Not logged in</h1>
    }

    return(
        <div className="flex flex-col">
                <div>ID: {user._id}</div>
                <div>Username: {user.username}</div>
                <div>Password: {user.password}</div>
                <div>Address: {user.address1}</div>
                {user.address2 ? <div>Continued Address: {user.address2}</div> : <></>}
                <div>City: {user.city}</div>
                <div>State: {user.state}</div>
                <div>Zipcode: {user.zipcode}</div>
        </div>
    )
}