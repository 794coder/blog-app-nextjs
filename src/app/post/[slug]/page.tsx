import {getPostById} from "@/lib/db/queries";

import {notFound} from "next/navigation";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import PostContent from "@/components/posts/post-content";


const PostDetails = async({params}:{params:Promise<{slug:string}>}) => {
    const {slug}=await params;
    const post=await getPostById(slug)

    if(!post){
        notFound()
    }
    const session=await auth.api.getSession({
        headers:await headers()
    })
    //get author info
    const isAuthor=session?.user?.id===post.author.id;
    return (
        <main className="py-10">
            <div className="max-w-4xl mx-auto">
                <PostContent post={{
                    ...post,
                    id:String(post.id),
                    author:{
                        name:post.author.name,
                    }
                }} isAuthor={isAuthor}/>
            </div>
        </main>
    );
};

export default PostDetails;