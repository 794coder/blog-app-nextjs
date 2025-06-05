"use client"

import {
    ThemeProvider as NextThemeProvider,
    ThemeProviderProps
} from "next-themes";
import Header from "@/components/layout/header";
import {cn} from "@/lib/utils";
import React from "react";

interface ExtendedThemeProviderProps extends ThemeProviderProps {
    children: React.ReactNode;
    containerClassName?: string;
}
const ThemeProvider = ({children,containerClassName,...props}:ExtendedThemeProviderProps) => {
    return (
       <NextThemeProvider {...props}>
           <Header/>
           <main className={cn("container mx-auto p-4",containerClassName)}>
               {children}
           </main>
       </NextThemeProvider>
    );
};

export default ThemeProvider;