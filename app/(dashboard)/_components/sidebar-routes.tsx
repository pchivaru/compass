"use client";

import { Cross, Flame, Shield, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";



export const SidebarRoutes = () => {
 
    return(
        <div className="flex flex-col">
            <Button size="sm" variant="default" className="m-2 h-16">
                    <Cross className="h-6 w-6"/>
            </Button>
            <Button size="sm" variant="default" className="m-2 h-16">
                    <Flame className="h-6 w-6"/>
            </Button>   
            <Button size="sm" variant="default" className="m-2 h-16">
                    <Shield className="h-6 w-6"/>
            </Button>
            <Button size="sm" variant="default" className="m-2 h-16">
                    <Plane className="h-6 w-6"/>
            </Button>        
        </div>
    )
}
