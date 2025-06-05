import {PostContentProps} from "@/lib/types";

import {
    Card, CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {formatDate} from "@/lib/utils";
import {Pencil} from "lucide-react";
import DeletePostButton from "@/components/posts/delete-post-button";
const PostContent = ({post,isAuthor}:PostContentProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">{post.title}</CardTitle>
                 <CardDescription>By {post.author.name} - {formatDate(post.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className={"text-muted-foreground text-lg mb-6"}>{post.description}</p>
                <p className={"text-muted-foreground font-bold text-4xl mb-6"}>{post.content}</p>
            </CardContent>
            {
                isAuthor&&(
                    <CardFooter >
                        <div className="flex gap-2">
                            <Button asChild variant={"outline"} size={"sm"}>
                                <Link href={`/post/edit/${post.slug}`}>
                                    <Pencil className={"h-4 w-4 mr-2"}/>
                                    Edit text
                                </Link>
                            </Button>
                            <DeletePostButton postId={+post.id}/>
                        </div>
                    </CardFooter>
                )
            }
        </Card>
    );
};

export default PostContent;