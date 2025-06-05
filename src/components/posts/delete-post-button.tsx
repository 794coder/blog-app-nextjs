"use client"
import {DeletePostProps} from "@/lib/types";

import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner"
import {deletePost} from "@/actions/post-action";
import {useRouter} from "next/navigation";

const DeletePostButton = ({postId}:DeletePostProps) => {
    const [isDeleting, setIsDeleting] =useState(false);
    const router=useRouter()
    const handleDelete=async()=>{
        try{
            const res=await deletePost(postId);
            if(res.success){
                toast(res.message)
                router.push("/")
                router.refresh()
            }else{
                toast(res.message)
            }
        }catch(e){
            toast("Error while deleting the post");
        }finally{
            setIsDeleting(false);
        }
    }
    return (
        <Button  variant={"destructive"} size={"sm"} onClick={handleDelete} disabled={isDeleting} className={"cursor-pointer"}>
            <Trash2 className={"mr-2 h-4 w-4"}/>
            {isDeleting?"Deleting...":"Delete"}
        </Button>
    );
};

export default DeletePostButton;