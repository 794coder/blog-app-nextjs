import {PostCardProps} from "@/lib/types";
import {
    Card, CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import {formatDate} from "@/lib/utils";


const PostCard = ({post}:PostCardProps) => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <Link href={`/post/${post.slug}`} passHref className={"text-2xl"}>
                    <CardTitle>{post.title}</CardTitle>
                </Link>
                <CardDescription>By {post.author.name} - {formatDate(post.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className={"text-muted-foreground"}>{post.description}</p>
            </CardContent>
        </Card>
    );
};

export default PostCard;