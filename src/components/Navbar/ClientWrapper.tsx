"use client"

import { usePathname } from "next/navigation"
import React from "react"

const ClientWrapper = ({ children }: { children: React.ReactElement  } ) => {
   
    const pathName = usePathname()
    const bgNav = pathName === "/" || "/pricing" ? "bg-[#000f12]" : "bg-white/75 backdrop-blur-lg border-b"

    return (
        <nav className={`sticky inset-x-0 top-0 z-30 w-full ${bgNav} transition-all p-4`}>
            {children}
        </nav>
    )
    }
 export default ClientWrapper   