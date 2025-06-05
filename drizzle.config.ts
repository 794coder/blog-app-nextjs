import type {Config} from "drizzle-kit"

export default {
    schema:"./src/lib/db/schema.ts",
    out:"./drizzle",
    dialect:"postgresql",
    dbCredentials:{
        url:process.env.DATABASE_URL||'postgresql://postgres:hamza123@localhost:5432/nextjs-blog',
    },
    verbose:true,
    strict:true,
}satisfies  Config