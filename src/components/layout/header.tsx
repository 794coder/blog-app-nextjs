"use client"
import React from 'react';
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useSession} from "@/lib/auth-client";
import UserMenu from "@/components/auth/user-menu";
import ThemeToggle from "@/components/theme/theme-toggle";

const Header = () => {
    const {data:session,isPending}=useSession()
    const navItems=[
        {label:"Home",link:"/"},
        {label:"Create",link:"/post/create"},
    ]
    const router = useRouter();
    return (
        <header className="border-b bg-background min-h-20 top-10 z-10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-xl">
                        Next js 15 blog
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item,index) => (
                            <Link href={item.link} key={index}
                            className={cn("text-sm font-medium" +
                                " transition-colors hover:text-primary")}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className=" flex items-center gap-4">
                    <div className="hidden md:block">

                    </div>
                    <ThemeToggle/>
                    <div className="flex items-center gap-2">
                        {isPending?null:session?.user ?(
                            <UserMenu user={session.user}/>
                        ):(
                            <Button onClick={()=>router.push("/auth")} className="cursor-pointer bg-black text-white hover:bg-black">
                            Login
                        </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;