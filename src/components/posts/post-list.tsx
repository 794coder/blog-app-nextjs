import {PostListProps} from "@/lib/types";
import PostCard from "./post-card";


const PostList = ({posts}:PostListProps) => {
    return (
        <div className={"grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3" +
            " gap-6"}>
            {
                posts.map(post=>(

                    <PostCard post={{
                        ...post,
                        id:String(post.id),
                        author:{
                            name: post.author.name,
                        }
                    }} key={post.id}/>
                ))
            }
        </div>
    );
};

export default PostList;