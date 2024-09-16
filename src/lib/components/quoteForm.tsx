"use client"

import { FormEvent, useEffect, useState } from "react";
import { GetUser, GetQuotes } from "../hooks/globaluser";
import { PricePerGallon, TotalPrice } from "../hooks/pricing";
import { SubmitQuote } from "../hooks/quoteSubmit";
import { IQuote } from "../Models/Quote";


export const QuoteForm = (getQuotes: () => Promise<void>) => {
    
    const [values, setValues] = useState<any>()

    const handleChange = (event? : React.ChangeEvent<HTMLInputElement>) => {
        const quote: IQuote = event ? {...values, [event.target.name] : event.target.value} : values

        const user = GetUser()
        const quotes = GetQuotes()

        if(user == null) return

        quote.suggestedpricepergallon = PricePerGallon(user, quotes, quote.gallonsrequested)
        quote.totalamountdue = TotalPrice(user, quotes, quote.gallonsrequested)

        setValues(quote);
    }


    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const ok = await SubmitQuote(values);

        if(!ok){
            alert("Failed to Create Quote!")
        } else {
            alert("Quote submitted successfully!")
            await getQuotes()
            handleChange()
        }
    };

    useEffect(() => {
        const user = GetUser()

        if(user == null) return

        setValues({ userid: user._id, deliveryaddress: user.address1 })
    }, [])
    
    return (
        <div className="">
            <form onSubmit={onSubmit} className="flex flex-col w-1/3 mt-2">
            <input 
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="gallonsrequested"
                name="gallonsrequested"
                type="number"
                placeholder="Gallons Requested"/>
            <div className="mt-4">Delivery Address: {values?.deliveryaddress}</div>
            <input
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="deliverydate"
                name="deliverydate"
                type="date"
                placeholder="Delivery Date"/>
            
            <div>{values?.suggestedpricepergallon}</div>
            <div>{values?.totalamountdue}</div>
            <button className="p-3 mt-4 w-24 mx-auto rounded bg-blue-500 hover:bg-green-700 font-bold text-lg" type="submit">Submit</button>
            </form>
        </div>
    )
}