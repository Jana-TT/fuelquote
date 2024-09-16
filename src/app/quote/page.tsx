"use client"

import { QuoteForm } from "@/lib/components/quoteForm";
import { QuotesDisplay } from "@/lib/components/quotesDisplay";
import { UserDisplay } from "@/lib/components/userDisplay";
import { GetQuotes } from "@/lib/hooks/getQuotes";
import { SetQuotes } from "@/lib/hooks/globaluser";
import { IQuote } from "@/lib/Models/Quote";
import { useEffect, useState } from "react";
import Header from "@/lib/components/header";

export default function QuotePage() {
    
    const [quotes, setQuotes] = useState<IQuote[]>([])

    const getQuotes = async () => {
        const newquotes = await GetQuotes()
        SetQuotes(newquotes.length)
        setQuotes(newquotes)
    }

    useEffect(() => {
        getQuotes()
    }, [])

    return (
      <div className="h-screen flex pl-6 mt-4">
        <div className="w-1/2">
            <div className="mb-6"><Header/></div>
            <UserDisplay/>
            <div className="mt-6">
                {QuoteForm(getQuotes)}
            </div>
            
        </div>

        <div className="w-1/2">
            {QuotesDisplay(quotes)}
        </div>

      </div>
    )
}