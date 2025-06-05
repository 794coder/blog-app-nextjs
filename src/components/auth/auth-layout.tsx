"use client"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useState} from "react";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";

const AuthLayout = () => {
    const [activeTab,setActiveTab]=useState("login")
    return <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md  p-5 bg-card rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome!</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4 w-full">
                    <TabsTrigger value='login'>Login</TabsTrigger>
                    <TabsTrigger value='register'>Register</TabsTrigger>
                </TabsList>
                <TabsContent value={"login"}>
                    <LoginForm />
                </TabsContent>
                <TabsContent value={"register"}>
                    <RegisterForm onSuccess={()=>setActiveTab('login')} />
                </TabsContent>
            </Tabs>
        </div>
    </div>
};

export default AuthLayout;