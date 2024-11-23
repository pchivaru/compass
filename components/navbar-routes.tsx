"use client";

import { usePathname} from "next/navigation";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { FcRating } from "react-icons/fc";
import { Badge } from "./ui/badge";
import Image from "next/image";


interface NavbarRoutesProps {
}

export const NavbarRoutes = ({

}: NavbarRoutesProps) => {

    return (
        <div className="space-x-5 flex">  
            <div className="space-x-1 flex">
                <b>
                    Aerial units:
                </b>
                <p>
                    0
                </p>
            </div>
            <div className="space-x-1 flex">
                <b>
                    Terrestrial units:
                </b>
                <p>
                    0
                </p>
            </div>
        </div>
    )
}