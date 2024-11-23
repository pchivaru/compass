"use client"

import { Badge } from "./ui/badge";
import { FcRating } from "react-icons/fc";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

import { User } from "@prisma/client";

interface MissionCardProps {
    id: string;
    description: string;
    reward: number;
    usersCompleted: User[];
    usersValidated: User[];
    userId: string;
};

export const MissionCard = ({
    id,
    description,
    reward,
    usersCompleted,
    usersValidated,
    userId
}: MissionCardProps) => {

    const isCompleted = usersCompleted.some(e => e.id === userId);
    const isValidated = usersValidated.some(e => e.id === userId);

    return(
            <div className="group shadow-md hover:bg-slate-100  border rounded-lg p-3 ">
                <div className="flow-root">
                    <div className="flex float-left">
                        {description}

                        <div className="ml-5">
                            <Badge className={cn(
                                "bg-slate-500",
                                isCompleted && "bg-green-400"
                            )}>
                                {isCompleted ? "Completed" : "Uncompleted"}
                            </Badge>
                        </div>
                        <div className="ml-5">
                            <Badge className={cn(
                                "bg-slate-500",
                                isValidated && "bg-yellow-500"
                            )}>
                                {isValidated ? "Validated" : "Not Validated"}
                            </Badge>
                        </div>
                    </div>
                    
                    <div className="float-right gap-x-2">
                        <div className="flex gap-x-2 mr-3">
                            {reward}
                            
                            <FcRating size={20}/>  
                        </div>
                         
                    </div>
                </div>
            </div>

        

    )
}