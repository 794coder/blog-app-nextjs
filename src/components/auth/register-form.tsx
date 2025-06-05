"use client"
import {z} from "zod"
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signUp} from "@/lib/auth-client";
import {toast} from "sonner";

interface RegisterFormProps {
    onSuccess?: () => void;
}
const registerSchema=z.object({
    name:z.string().min(3,"Name must be at least 3 characters"),
    email:z.string().email("Please enter a valid email"),
    password:z.string().min(6,"Password must be at least 6 characters"),
    confirmPassword:z.string().min(6,"Password must be at least 6 characters"),
}).refine(data=>data.password===data.confirmPassword,{
    message:"Passwords don't match",
    path:["confirmPassword"]
})

type registerFormValues=z.infer<typeof registerSchema>;


const RegisterForm = ({onSuccess}:RegisterFormProps) => {
    const [isLoading,setIsLoading]=useState(false)
    const form=useForm<registerFormValues>({
        resolver:zodResolver(registerSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    })
    const onSubmit=async (values:registerFormValues)=>{
        setIsLoading(true)
        try{
            const {error}=await signUp.email({
                name:values.name,
                email:values.email,
                password:values.password,
            })
            if(error){
                toast("Failed to create account,Please try again.")
                return
            }
            toast("Your account has been created. Please signIn.")
            if(onSuccess){
                onSuccess()
            }
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
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type={""} placeholder={"Enter your" +
                                    " name"} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                 />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type={"email"} placeholder={"Enter" +
                                    " your" +
                                    " email"} {...field}/>
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type={"password"} placeholder={"Confirm" +
                                    " your" +
                                    " password"} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                 />
                <Button type="submit" className={"w-full"} disabled={isLoading}>
                    {isLoading?"Creating Account...":"Create Account"}
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;