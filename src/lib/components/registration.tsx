"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SetUser } from "../hooks/globaluser";
import { Register } from "../hooks/registration";
import { IUser } from "../Models/User";
import Header from "./header";


export const Registration = () => {
    
    const [values, setValues] = useState<any>()

    const router = useRouter()

    let submitted = false


    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {

        const user: IUser = {...values, [event.target.name] : event.target.value}

        setValues(user);
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(submitted) return
        submitted = true

        const newUser = await Register(values);

        console.log(newUser)

        if(newUser == null){
            alert("Failed to Create or Update User!")
        } else {
            SetUser(newUser)
            router.push("/quote")
        }

        submitted = false
    };
    
    return (
        <div className="h-screen bg-gradient-to-r from-green-700 via-blue-800 to-green-300">
            <form onSubmit={onSubmit} className="flex flex-col w-1/3 md:w-8/12 text-xl pt-60 pr-80 pl-80 h-screen bg-gray-800">
            <input 
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Username"/>
            <input
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="text"
                placeholder="Password"/>
            <input
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                name="fullname"
                type="text"
                placeholder="First and Last Name"/>
            <input
            onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="address1"
                name="address1"
                type="text"
                placeholder="Address"/>
            <input 
            onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="address2"
                name="address2"
                type="text"
                placeholder="Continue Address (if needed)"/>
            <input 
            onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                name="city"
                type="text"
                placeholder="City"/>
            <input 
            onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                name="state"
                type="text"
                placeholder="State"/>
            <input 
            onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="zipcode"
                name="zipcode"
                type="text"
                placeholder="Zipcode"/>
            <div className="mx-auto flex">
                <button className= "p-3 mt-4 w-24 mx-auto rounded bg-blue-500 hover:bg-green-700 font-bold text-lg" type="submit">
                    Submit
                </button>
                <div className="mt-2 pl-64 ml-10">
                    <Header/>
                </div>
            </div>
            
            </form>
        </div>
    )
}