"use client"

import Link from "next/link"
import React from "react"
import { Home, Plus } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"

const MobileNav = () => {
  const pathname = usePathname()
  const { user } = useAuth()
  return (
    <div className="fixed bottom-0 left-0 p-3 w-full border-t border-neutral-300 bg-white dark:bg-neutral-900 shadow-md">
      <nav>
        <ul className="flex justify-around items-center">
          <li>
            <Link href="/">
              <Home
                className={
                  pathname === "/" ? "text-yellow-500" : "dark:text-gray-500"
                }
              />
            </Link>
          </li>
          <li>
            <Link href="/post">
              <Plus className="dark:text-gray-500" />
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <Image
                src={user?.photoURL || "/profile.png"}
                width={26}
                height={26}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default MobileNav
