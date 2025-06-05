import {getAllPosts} from "@/lib/db/queries";
import {Metadata} from "next";
import PostList from "@/components/posts/post-list";

export const metadata:Metadata={
    title: "Blog App",
    description: "Blog App with Next js",
}
const Home = async() => {
    const posts=await getAllPosts()
    return (
        <main className="py-10">
          <div className={"max-w-7xl mx-auto px-4"}>
              <h1 className={"text-4xl font-bold mb-2"}>Welcome to the Blog</h1>
              {
                  posts.length===0?
                      <div className={"text-center py-10"}>
                          <h2 className={"text-xl font-medium"}>
                              No posts yet
                          </h2>
                      </div>:<PostList posts={posts} />
              }
          </div>
        </main>
    );
};

export default Home;