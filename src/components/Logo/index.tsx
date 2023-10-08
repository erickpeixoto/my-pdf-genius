"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import Image from 'next/image'


const Logo = () => {
   
    const pathName = usePathname()
    const colorText = pathName === "/" || "/pricing" ? "text-white" : "text-black"
    console.log(colorText)

    return (

        <Link
            href='/'
            className='flex z-40 font-semibold'>
            <div className={`flex ${colorText} flex-row items-center gap-2`}>
               <Image src="/ico.png" alt="logo" width={50} height={53} />
              My PDF Genius
            </div>

          </Link>

    )
    }
 export default Logo   