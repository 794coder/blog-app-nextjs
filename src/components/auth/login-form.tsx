"use client"
import {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, FormMessage
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {signIn} from "@/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


const loginSchema=z.object({
    email:z.string().email("Please enter a valid email"),
    password:z.string().min(6,"Password must be at least 6 characters"),
})
type loginFormValues=z.infer<typeof loginSchema>;
const LoginForm = () => {
    const router=useRouter();
    const [isLoading,setIsLoading]=useState(false)
    const form=useForm<loginFormValues>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password: ""
        }
    });
    const onSubmit=async(values:loginFormValues)=>{
        setIsLoading(true)
        try{
            const {error}=await signIn.email({
                email:values.email,
                password:values.password,
                rememberMe:true
            })
            if(error){
                toast("Sign In failed,Please try again later.")
                return;
            }
            toast("Signed In successfully.")
            router.push('/')
        }catch(err){
            console.log(err)
        }finally {
            setIsLoading(false)
        }

    }
    return (
        <Form {...form}>
            <form className={"space-y-4"} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder={"Enter your email"} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="password"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type={"password"} placeholder={"Enter your" +
                                    " password"} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className={"w-full"} disabled={isLoading}>
                    {isLoading?"Signing In...":"Sign In"}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;