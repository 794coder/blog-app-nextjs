"use client"

import {z} from "zod";
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTransition} from "react";
import {createPost,updatePost} from "@/actions/post-action";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const postFormSchema =z.object({
    title:z.string().min(3,"Title must be at least 3 characters")
        .max(255,"Title cannot be longer than 255 characters"),
    description:z.string().min(3,"Description must be at least 3 characters")
        .max(255,"Description cannot be longer than 255 characters"),
    content:z.string().min(10,"Content must be at least 10 characters"),
})
type PostFormValues=z.infer<typeof postFormSchema>

interface PostFormProps{
    isEditing?: boolean;
    post?:{
        id:number
        title:string
        description:string
        content:string
        slug:string
    }

}
const PostForm = ({isEditing,post}:PostFormProps) => {
    const [isPending,startTransition]=useTransition()
    const router=useRouter()
    const {register,handleSubmit,formState:{errors}}=useForm<PostFormValues>({
        resolver:zodResolver(postFormSchema),
        defaultValues:isEditing?{
            title:post?.title,
            description: post?.description,
            content: post?.content
        }:{
            title:"",
            description: "",
            content:""
        }
    });
    const onSubmit =async (values:PostFormValues)=>{
        startTransition(async () => {
            try{
                const formData=new FormData();
                formData.append("title",values.title);
                formData.append("description",values.description);
                formData.append("content",values.content);

                let res
                if(isEditing&&post){
                    res=await updatePost(formData,post.id);
                }
                else{
                    res=await createPost(formData);
                }
                console.log(res)
                if(res.success){
                    toast(isEditing?"Successfully Edited Post":"Successfully" +
                        " created post!");
                    router.refresh()
                    router.push('/')
                }else{
                    toast(res.message)
                }
            }catch(err){
                toast("Failed to create post!");
            }
        })
    }
    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <Label htmlFor={"title"}>Title</Label>
                <Input id={"title"} placeholder={"Enter post title"}
                       {...register('title')} disabled={isPending}/>
                {errors?.title&&<p className={"text-sm text-red-700"}>{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor={"description"}>Description</Label>
                <Input id={"description"} placeholder={"Enter post" +
                    " description"} {...register("description")} disabled={isPending}/>
                {errors?.description&&<p className={"text-sm text-red-700"}>{errors.description.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor={"content"}>Content</Label>
                <Textarea id={"content"} placeholder={"Enter post content"}
                          className="min-h-[350px] resize-none" {...register("content")}
                disabled={isPending}/>
                {errors?.content&&<p className={"text-sm text-red-700"}>{errors.content.message}</p>}
            </div>
            {
                <Button type={"submit"} className="mt-5 w-full" disabled={isPending}>
                {isPending?"Saving Post...":isEditing?"Update Post":"Create" +
                    " Post"}
                    </Button>
            }
        </form>
    );
};

export default PostForm;