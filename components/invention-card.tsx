"use client"

import { ImageIcon, Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { auth } from "@clerk/nextjs/server";
import { usePathname } from "next/navigation";

interface InventionCardProps {
    id: string;
    name: string;
    imageUrl: string | null;
    category: string;
    isPublished: boolean;
    isValidated: boolean;
    authorId: string;
    authorFirstName: string;
    authorLastName: string;
};

export const InventionCard = ({
    id,
    name, 
    imageUrl,
    category,
    isPublished,
    isValidated,
    authorId,
    authorFirstName,
    authorLastName
}: InventionCardProps) => {
    const pathname = usePathname();

    const isHomePage  = pathname === "/";

    const isSearchPage  = pathname === "/search";

    const page = isHomePage ? "edit" : "view"

    return(
        <Link href={`/inventions/${id}/${page}`}>
            <div className="group shadow-md hover:bg-slate-100 transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    {!imageUrl ? (
                        <div className="flex items-center justify-center h-40 bg-slate-200 rounded-md">
                            <ImageIcon className="h-10 w-10 text-slate-500"/>
                        </div>
                    ):(
                        <>
                            <Image                         
                                fill
                                className="object-cover"
                                alt={name}
                                src={imageUrl}
                            />
                            {isValidated && (
                                <div className="absolute top-0 m-2 p-1 bg-yellow-300 rounded-md shadow-lg">
                                    <Crown className="h-5 w-5 text-yellow-700"/>
                                </div>
                            )}

                        </>
       

                    )}

                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {name}
                    </div>
                    <div className="flow-root">
                        <p className="float-left text-xs text-muted-foreground">
                            {category}
                        </p>
                        {!isPublished && (
                            <Badge className="float-right bg-slate-500">
                                Draft
                            </Badge>
                        )}
                        {isPublished && (
                            <p className="float-right text-xs italic">
                                By {authorFirstName} {authorLastName}
                            </p>
                        )}
                    </div>

                </div>
            </div>
            
        </Link>
    )
}