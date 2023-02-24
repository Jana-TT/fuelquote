"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SetUser } from "../hooks/globaluser";
import { Register } from "../hooks/registration";
import { IUser } from "../Models/User";


export const Login = () => {
    
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
        <div>
            <form onSubmit={onSubmit} className="flex flex-col w-1/3">
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
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}