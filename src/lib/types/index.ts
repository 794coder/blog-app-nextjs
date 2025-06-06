

export interface PostListProps{
    posts:Array<{
        id: string;
        title: string;
        description: string;
        slug: string;
        createdAt:Date;

        author:{

        name: string;

        }
    }>
}

export interface PostCardProps{
    post:{
        id: string;
        title: string;
        description: string;
        slug: string;
        createdAt:Date;

        author:{

        name: string;

        }
    }
}

export interface PostContentProps {
    post:{
        id: string;
        title: string;
        description: string;
        content:string;
        slug: string;
        createdAt:Date;
        author:{
            name: string;
        }
    }
    isAuthor:boolean;
}

export interface DeletePostProps{
    postId:number;
}