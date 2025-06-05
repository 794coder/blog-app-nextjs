"use client"
import {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {User} from "better-auth";
import  Link  from "next/link";
import {LogOut, UserIcon} from "lucide-react";
import {signOut} from "@/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface UserMenuProps {
    user: User;
}
const UserMenu = ({user}:UserMenuProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const router=useRouter();
    function getInitials(name: string | undefined) {
        return name?.split(" ").map(i=>i[0]).join("").toUpperCase();
    }

    async function handleLogout() {
        setIsLoading(true)
        try{
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast("You have been logged out successfully!");
                        router.refresh()
                    }
                }
            })
        }catch(err){
            console.log(err);
            toast("Failed to log out!")
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative w-8 h-8  rounded-full">
                    <Avatar>
                        <AvatarFallback className={"w-8 h-8"}>
                            {getInitials(user?.name)||"User"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"} className="w-56" >
                <div className="flex items-center justify-start p-2 gap-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-bold">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild className={"cursor-pointer"}>
                    <Link href={`/profile`}>
                        <UserIcon className={"mr-2 w-4 h-4"}/>
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild className={"cursor-pointer"}>
                    <Link href={`/post/create`}>
                        <UserIcon className={"mr-2 w-4 h-4"}/>
                        <span>Create Post</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className={"cursor-pointer"} onClick={handleLogout} disabled={isLoading}>
                    <LogOut className={"mr-2 w-4 h-4"}/>
                    <span>{isLoading?"Logging out...":"Log out"}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;