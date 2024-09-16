import { Login } from "@/lib/components/login";
import { Registration } from "@/lib/components/registration";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-r from-green-700 via-blue-800 to-green-300">

        <div className="md:w-8/12 text-xl pt-60 pr-80 pl-80 h-screen bg-gray-800">
          <h1 className="text-6xl">
            Fuel Predictor
          </h1>

          <Image className="ml-40" src={"/fuel.png"} alt={""} width={60} height={60}/>

          <main className="">
            <Login />
            <Link href="/registrationPage" className="m-10 pl-32">
              <button className= "p-3 mt-4 w-24 rounded bg-blue-500 hover:bg-green-700 font-bold text-lg">Register</button>
            </Link>
          </main>
          
        </div>
    </div>
  )
}
