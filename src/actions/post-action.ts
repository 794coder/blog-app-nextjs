
"use server"

import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {slugify} from "@/lib/utils";
import {db} from "@/lib/db"
import {eq,and,ne} from "drizzle-orm";
import {posts} from "@/lib/db/schema";
import {revalidatePath} from "next/cache";

export async function createPost(formData:FormData) {
    try{
        //get the current user
        const session=await auth.api.getSession({
            headers: await headers()
        })
        if(!session||!session.user){
            return {
                success:false,
                message:"You must be logged in to create a post."
            }
        }
        //get form data
        const title=formData.get("title") as string;
        const description=formData.get("description") as string;
        const content=formData.get("content") as string;

        //create the slug from post title
        const slug=slugify(title)
        //check if the slug already exists
        const existingPost=await db.query.posts.findFirst({where:eq(posts.slug,slug)})
        if(existingPost){
            return {
                success:false,
                message:"A post with same title already exists"
            }
        }
        const [newPost]=await db.insert(posts).values({
            title,
            description,
            content,
            slug,
            authorId:session.user.id
        }).returning()
        //revalidate the home page to get the latest posts
        revalidatePath('/')
        revalidatePath(`/posts/${slug}`)
        revalidatePath(`/profile`)

        return {
            success:true,
            message:"Post created successfully",
            slug
        }
    }catch(e:unknown){
        return {
            success:false,
            message:"Something went wrong",
            error:e
        }
    }
}


export async function updatePost(formData:FormData,postId:number) {
    try {
         //get the current user
        const session=await auth.api.getSession({
            headers: await headers()
        })
        if(!session||!session.user){
            return {
                success:false,
                message:"You must be logged in to edit a post."
            }
        }
         //get form data
        const title=formData.get("title") as string;
        const description=formData.get("description") as string;
        const content=formData.get("content") as string;

         //create the slug from post title
        const slug=slugify(title)
        //check if the slug already exists
        const existingPost=await db.query.posts.findFirst({where:and(eq(posts.slug,slug),ne(posts.id,postId))})
        if(existingPost){
            return {
                success:false,
                message:"A post with this title already exists"
            }
        }

        const post=await db.query.posts.findFirst({where:eq(posts.id,postId),})

        if(post?.authorId!==session.user.id){
            return {
                success:false,
                message:"You must be the author to update this post."
            }
        }
        await db.update(posts).set({
            title,
            description,
            content,
            slug,
            updatedAt:new Date(),
        }).where(eq(posts.id,postId))

        revalidatePath('/')
        revalidatePath(`/posts/${slug}`)
        revalidatePath(`/profile`)

        return{
            success:true,
            message:"Post updated successfully",
            slug
        }
    }
    catch(e:unknown){
         return {
            success:false,
            message:"Something went wrong",
            error:e
        }
    }
}


export async function deletePost(postId:number) {
    try{
         //get the current user
        const session=await auth.api.getSession({
            headers: await headers()
        })
        if(!session||!session.user){
            return {
                success:false,
                message:"You must be logged in to delete a post."
            }
        }
        const postToDelete=await db.query.posts.findFirst({where:eq(posts.id,postId)})

        if(!postToDelete){
            return {
                success:false,
                message:"Post not found",
            }
        }

         if(postToDelete?.authorId!==session.user.id){
            return {
                success:false,
                message:"You must be the author to delete this post."
            }
        }

         await db.delete(posts).where(eq(posts.id,postId))
        revalidatePath('/')
        revalidatePath(`/profile`)

        return {
             success:true,
            message:"Post deleted successfully",
        }
    }
    catch(e:unknown){
        return {
            success:false,
            message:"Something went wrong",
            error:e
        }
    }
}