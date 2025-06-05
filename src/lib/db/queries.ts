

//get all posts

import {db} from "@/lib/db/index";
import {desc, eq} from "drizzle-orm";
import {posts} from "@/lib/db/schema";

export async function getAllPosts(){
    try{
        const fetchAllPosts=await db.query.posts.findMany({
            orderBy:desc(posts.createdAt),
            with:{
                author:true
            }
        })
        return fetchAllPosts;
    }catch(err){
        console.error(err);
        return [];
    }
}

export async function getPostById(slug:string){
    try {
        const post=await db.query.posts.findFirst({
            where:eq(posts.slug,slug),
            with:{
                author:true
            }
        })
        return post;
    }
    catch(err){
        console.error(err);
        return ;
    }
}
